import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import axios from "axios";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pgPkg from "pg";
import * as turf from "@turf/turf";
import polyline from "@mapbox/polyline";
import { latLngToCell } from "h3-js";



dotenv.config();



// Fix for BigInt serialization in JSON
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { PrismaClient } = pkg;
const { Pool } = pgPkg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ruwalk Backend Running');
});

app.get('/api/status', (req, res) => {
  res.json({
    app: "Ruwalk Backend",
    status: "OK",
    version: "0.1"
  });
});

app.get("/strava/login", (req, res) => {
  const url =
    `https://www.strava.com/oauth/authorize?` +
    `client_id=${process.env.STRAVA_CLIENT_ID}` +
    `&response_type=code` +
    `&redirect_uri=${process.env.STRAVA_REDIRECT_URI}` +
    `&approval_prompt=force` +
    `&scope=read,activity:read_all`;

  res.redirect(url);
});

app.get("/strava/callback", async (req, res) => {
  const { code } = req.query;
  console.log(`[DEBUG] Callback received with code: ${code?.substring(0, 5)}...`);

  try {
    console.log("[DEBUG] Exchanging code for tokens...");
    const response = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code"
      }
    );

    const tokens = response.data;
    const { athlete } = tokens;
    console.log(`[DEBUG] Received tokens for athlete: ${athlete.firstname}`);

    // Save or update user in the database
    console.log("[DEBUG] Upserting user into database...");
    await prisma.user.upsert({
      where: { stravaAthleteId: BigInt(athlete.id) },
      update: {
        username: athlete.username,
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        profile: athlete.profile,
      },
      create: {
        stravaAthleteId: BigInt(athlete.id),
        username: athlete.username,
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        profile: athlete.profile,
      },
    });
    console.log("[DEBUG] Database sync complete.");

    res.json({
      message: "Strava connected successfully",
      athlete: tokens.athlete,
      access_token: tokens.access_token
    });

  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error("[ERROR] Strava Callback Failed:", JSON.stringify(errorData));
    res.status(500).json({ 
      error: "Strava authhhh failed",
      details: errorData 
    });
  }
});

app.get("/strava/latest-activity", async (req, res) => {
  const accessToken = req.query.token;

  if (!accessToken) {
    return res.status(400).json({ error: "Missing access token" });
  }

  try {
    const response = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          per_page: 1
        }
      }
    );

    const activity = response.data[0];

    res.json({
      id: activity.id,
      name: activity.name,
      distance_m: activity.distance,
      moving_time_s: activity.moving_time,
      start_latlng: activity.start_latlng,
      end_latlng: activity.end_latlng,
      polyline: activity.map.summary_polyline
    });

  } catch (err) {
    res.status(500).json({ error: "Unable to fetch activity" });
  }
});
app.get("/strava/sync-latest", async (req, res) => {
  const accessToken = req.query.token;

  if (!accessToken) {
    return res.status(400).json({ error: "Missing access token" });
  }

  try {
    // 1) Get Athlete Profile
    const athleteRes = await axios.get("https://www.strava.com/api/v3/athlete", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const athlete = athleteRes.data;

    // 2) Find or Create User
    const user = await prisma.user.upsert({
      where: { stravaAthleteId: BigInt(athlete.id) },
      update: {
        username: athlete.username,
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        profile: athlete.profile
      },
      create: {
        stravaAthleteId: BigInt(athlete.id),
        username: athlete.username,
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        profile: athlete.profile
      }
    });

    // 3) Fetch latest activity
    const activitiesRes = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { per_page: 1 }
      }
    );

    const act = activitiesRes.data[0];

    if (!act) {
      return res.status(404).json({ error: "No activities found" });
    }

    // 4) Calculate capture status (start/end distance <= 200m)
    const start = act.start_latlng;
    const end = act.end_latlng;

    if (!start || !end) {
      return res.status(400).json({
        error: "Activity missing start or end coordinates"
      });
    }

    const startPoint = turf.point([start[1], start[0]]); // [lng, lat]
    const endPoint = turf.point([end[1], end[0]]);

    const distanceKm = turf.distance(startPoint, endPoint, { units: "kilometers" });
    const distanceM = distanceKm * 1000;
    const isClosedRun = distanceM <= 200;

    let capturedTiles = [];

    if (isClosedRun) {
      const encoded = act.map?.summary_polyline;

      if (!encoded) {
        return res.status(400).json({ error: "No polyline found in activity" });
      }

      // decode polyline -> array of [lat, lng]
      const points = polyline.decode(encoded);

      // Choose tile resolution:
      // 7 = city-level (good MVP)
      // 8 = more detailed
      const RESOLUTION = 7;

      const tileSet = new Set();

      for (const [lat, lng] of points) {
        const tileId = latLngToCell(lat, lng, RESOLUTION);
        tileSet.add(tileId);
      }

      capturedTiles = [...tileSet];
    }

    // 5) Save activity (avoid duplicates using unique stravaId)
    const savedActivity = await prisma.activity.upsert({
      where: { stravaId: BigInt(act.id) },
      update: {
        name: act.name,
        distanceM: act.distance,
        movingTimeS: act.moving_time,
        startLat: act.start_latlng?.[0] ?? null,
        startLng: act.start_latlng?.[1] ?? null,
        endLat: act.end_latlng?.[0] ?? null,
        endLng: act.end_latlng?.[1] ?? null,
        polyline: act.map?.summary_polyline ?? null,
        captured: isClosedRun
      },
      create: {
        stravaId: BigInt(act.id),
        userId: user.id,
        name: act.name,
        distanceM: act.distance,
        movingTimeS: act.moving_time,
        startLat: act.start_latlng?.[0] ?? null,
        startLng: act.start_latlng?.[1] ?? null,
        endLat: act.end_latlng?.[0] ?? null,
        endLng: act.end_latlng?.[1] ?? null,
        polyline: act.map?.summary_polyline ?? null,
        captured: isClosedRun
      }
    });

    // 6) Save ownership:
    if (isClosedRun && capturedTiles.length > 0) {
      for (const tileId of capturedTiles) {
        await prisma.tileOwnership.upsert({
          where: { tileId },
          update: { userId: user.id },   // 👈 overwrite owner
          create: {
            tileId,
            userId: user.id
          }
        });
      }
    }


    res.json({
      message: "Latest activity synced successfully",
      rule: {
        distance_start_end_m: Math.round(distanceM),
        captured: isClosedRun,
        max_allowed_m: 200
      },
      tiles: {
        resolution: 7,
        captured_count: capturedTiles.length,
        sample: capturedTiles.slice(0, 10)
      },
      activity: savedActivity
    });
  } catch (err) {
    const errorData = err.response?.data || err.message;
    console.error("[ERROR] Sync Failed:", JSON.stringify(errorData));
    res.status(500).json({ 
      error: "Sync failed", 
      details: errorData 
    });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true,
        profile: true,
        tiles: {
          select: { tileId: true }
        },
        activities: {
          where: { captured: true },
          select: { distanceM: true }
        }
      }
    });

    const leaderboard = users.map((u) => {
      const tileCount = u.tiles.length;

      const totalDistanceM = u.activities.reduce((sum, a) => {
        return sum + (a.distanceM || 0);
      }, 0);

      const totalKm = totalDistanceM / 1000;

      return {
        id: u.id,
        firstname: u.firstname,
        lastname: u.lastname,
        username: u.username,
        profile: u.profile,
        tiles: tileCount,
        totalKm: Number(totalKm.toFixed(2))
      };
    });

    // Sort by tiles desc first, then totalKm desc
    leaderboard.sort((a, b) => {
      if (b.tiles !== a.tiles) return b.tiles - a.tiles;
      return b.totalKm - a.totalKm;
    });

    res.json(leaderboard.slice(0, 50));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Leaderboard failed" });
  }
});


app.get("/tiles/my", async (req, res) => {
  const { athleteId } = req.query;

  if (!athleteId) {
    return res.status(400).json({ error: "Missing athleteId" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { stravaAthleteId: BigInt(athleteId) },
      include: { tiles: true }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      tiles: user.tiles.map(t => t.tileId)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tiles" });
  }
});

// DEV RESET Endpoint
app.post("/dev/reset", async (req, res) => {
  if (process.env.DEV_MODE !== "true") {
    return res.status(403).json({ error: "DEV_MODE disabled" });
  }

  try {
    await prisma.tileOwnership.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.user.deleteMany();

    res.json({ message: "Database reset successful ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Reset failed" });
  }
});

// DEV SEED Endpoint
app.post("/dev/seed", async (req, res) => {
  if (process.env.DEV_MODE !== "true") {
    return res.status(403).json({ error: "DEV_MODE disabled" });
  }

  try {
    // 1) Create dummy users
    const dummyUsers = [
      { firstname: "Amit", lastname: "Runner", username: "amit_run" },
      { firstname: "Neha", lastname: "Walker", username: "neha_walk" },
      { firstname: "Ravi", lastname: "Sprinter", username: "ravi_sprint" },
      { firstname: "Sara", lastname: "Jogger", username: "sara_jog" },
      { firstname: "Karan", lastname: "Hiker", username: "karan_hike" },
      { firstname: "Pooja", lastname: "Strider", username: "pooja_stride" }
    ];

    const createdUsers = [];

    for (let i = 0; i < dummyUsers.length; i++) {
      const u = dummyUsers[i];

      const user = await prisma.user.create({
        data: {
          // fake athlete ids (must be unique BigInt)
          stravaAthleteId: BigInt(9000000000 + i),
          firstname: u.firstname,
          lastname: u.lastname,
          username: u.username,
          profile: null
        }
      });

      createdUsers.push(user);
    }

    // 2) Seed tiles around Pune (H3 resolution 7)
    // Pune center: 18.5204, 73.8567
    const RES = 7;
    const baseLat = 18.5204;
    const baseLng = 73.8567;

    // Helper: create random tile positions around Pune
    function randomLatLng(radius = 0.03) {
      const lat = baseLat + (Math.random() - 0.5) * radius;
      const lng = baseLng + (Math.random() - 0.5) * radius;
      return { lat, lng };
    }

    let tileInsertCount = 0;

    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i];

      // each user gets different amount of tiles
      const tileCount = 25 + i * 10; // 25,35,45,55,65,75

      for (let t = 0; t < tileCount; t++) {
        const { lat, lng } = randomLatLng();

        const tileId = latLngToCell(lat, lng, RES);

        await prisma.tileOwnership.upsert({
          where: { tileId },
          update: { userId: user.id }, // overwrite owner to create stealing overlaps
          create: {
            tileId,
            userId: user.id
          }
        });

        tileInsertCount++;
      }

      // 3) Create fake captured activities (distance affects leaderboard)
      const km = 2 + i * 1.7; // increasing distance
      await prisma.activity.create({
        data: {
          stravaId: BigInt(8000000000 + i),
          userId: user.id,
          name: `Dummy Run ${i + 1}`,
          distanceM: km * 1000,
          movingTimeS: 800 + i * 200,
          startLat: baseLat,
          startLng: baseLng,
          endLat: baseLat,
          endLng: baseLng,
          polyline: null,
          captured: true
        }
      });
    }

    res.json({
      message: "Dummy users + territory seeded ✅",
      users: createdUsers.length,
      tiles_attempted: tileInsertCount,
      note: "Tiles may overlap causing ownership stealing (intended)"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Seed failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
