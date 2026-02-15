import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import axios from "axios";
import { PrismaClient } from "./prisma/generated/client/index.js";
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

const { Pool } = pgPkg;

if (!process.env.DATABASE_URL) {
  console.error("FATAL: DATABASE_URL is not defined in environment variables!");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10 // Recommended for serverless to avoid connection exhaustion
});

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
    const user = await prisma.user.upsert({
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

    // --- AUTO SYNC LATEST ACTIVITY ---
    try {
      console.log("[DEBUG] Auto-syncing latest activity...");
      await syncStravaActivity(tokens.access_token, user);
      console.log("[DEBUG] Auto-sync complete.");
    } catch (syncErr) {
      console.error("[WARN] Auto-sync filed during callback:", syncErr.message);
      // Don't fail the login if sync fails, just log it
    }

    const userData = {
      id: user.id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      profile: user.profile
    };

    // Redirect to frontend with user data
    // In a real app, you'd use a secure cookie or a token. 
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendUrl}/?user=${encodeURIComponent(JSON.stringify(userData))}&token=${tokens.access_token}`;
    res.redirect(redirectUrl);

  } catch (error) {
    const errorData = error.response?.data || error.message;
    console.error("[ERROR] Strava Callback Failed:", JSON.stringify(errorData));
    res.status(500).json({
      error: "Strava auth failed",
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

    // 3) Sync Activity via Helper
    const result = await syncStravaActivity(accessToken, user);

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.json({
      message: "Latest activity synced successfully",
      rule: result.rule,
      tiles: result.tiles,
      activity: result.activity
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
        stravaAthleteId: true, // 👈 CRITICAL: missing this was causing 500 error
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
        stravaAthleteId: u.stravaAthleteId ? u.stravaAthleteId.toString() : null,
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


// GET /me/tiles - Uses x-user-id header
app.get("/me/tiles", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { history } = req.query;

    if (!userId) return res.status(400).json({ error: "Missing x-user-id header" });

    // Ensure user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // current tiles
    const current = await prisma.tileOwnership.findMany({
      where: { userId: user.id },
      select: { tileId: true }
    });

    // optional history
    let historyList = [];
    if (history === "true") {
      historyList = await prisma.tileHistory.findMany({
        where: { newUser: user.id },
        orderBy: { createdAt: "desc" },
        take: 200,
        select: { tileId: true, previousUser: true, createdAt: true, activityId: true }
      });
    }

    res.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      },
      tiles: current.map(t => t.tileId),
      history: historyList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "me/tiles failed" });
  }
});

// GET /users/:id/tiles - Public profile view
app.get("/users/:id/tiles", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { history } = req.query;

    if (isNaN(userId)) return res.status(400).json({ error: "Invalid user id" });

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const current = await prisma.tileOwnership.findMany({
      where: { userId: user.id },
      select: { tileId: true }
    });

    let historyList = [];
    if (history === "true") {
      historyList = await prisma.tileHistory.findMany({
        where: { newUser: user.id },
        orderBy: { createdAt: "desc" },
        take: 200,
        select: { tileId: true, previousUser: true, createdAt: true, activityId: true }
      });
    }

    res.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      },
      tiles: current.map(t => t.tileId),
      history: historyList
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "users/tiles failed" });
  }
});

// GET current tiles + optional history (Legacy support for now, or just remove if fully migrating)
app.get("/tiles/my", async (req, res) => {
  try {
    const { athleteId, history } = req.query;
    if (!athleteId) return res.status(400).json({ error: "Missing athleteId" });

    const user = await prisma.user.findUnique({
      where: { stravaAthleteId: BigInt(athleteId) }
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    // current tiles
    const current = await prisma.tileOwnership.findMany({
      where: { userId: user.id },
      select: { tileId: true }
    });

    // optional history -> return latest N history tile captures by this user
    let historyList = [];
    if (history === "true") {
      historyList = await prisma.tileHistory.findMany({
        where: { newUser: user.id },
        orderBy: { createdAt: "desc" },
        take: 200, // limit size for now
        select: { tileId: true, previousUser: true, createdAt: true, activityId: true }
      });
    }

    res.json({
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      },
      tiles: current.map(t => t.tileId),
      history: historyList
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "tiles/my failed" });
  }
});

app.get("/tiles/history", async (req, res) => {
  const { athleteId } = req.query;
  if (!athleteId) return res.status(400).json({ error: "Missing athleteId" });

  try {
    const user = await prisma.user.findUnique({ where: { stravaAthleteId: BigInt(athleteId) } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const history = await prisma.tileHistory.findMany({
      where: {
        OR: [
          { newUser: user.id },
          { previousUser: user.id }
        ]
      },
      orderBy: { createdAt: 'desc' },
      include: {
        userNew: { select: { firstname: true, lastname: true } },
        userPrev: { select: { firstname: true, lastname: true } }
      }
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET /me/routes - Uses x-user-id header
app.get("/me/routes", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) return res.status(400).json({ error: "Missing x-user-id header" });

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            distanceM: true,
            polyline: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      routes: user.activities.map(a => ({
        activityId: a.id,
        name: a.name,
        distance: a.distanceM,
        date: a.createdAt,
        polyline: a.polyline
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "me/routes failed" });
  }
});

// GET /users/:id/routes - Public profile view
app.get("/users/:id/routes", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) return res.status(400).json({ error: "Invalid user id" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            distanceM: true,
            polyline: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      routes: user.activities.map(a => ({
        activityId: a.id,
        name: a.name,
        distance: a.distanceM,
        date: a.createdAt,
        polyline: a.polyline
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "users/routes failed" });
  }
});

app.get("/routes/my", async (req, res) => {
  const { athleteId } = req.query;

  if (!athleteId) {
    return res.status(400).json({ error: "Missing athleteId" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { stravaAthleteId: BigInt(athleteId) },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            name: true,
            distanceM: true,
            polyline: true,
            startLat: true,
            startLng: true,
            endLat: true,
            endLng: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      routes: user.activities.map(a => ({
        activityId: a.id,
        name: a.name,
        distance: a.distanceM,
        date: a.createdAt,
        polyline: a.polyline
      }))
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
});

// ========== HELPER FUNCTIONS ==========

function interpolate(a, b, t) {
  return a + (b - a) * t;
}

// Generates a route as an array of lat/lng points between two coordinates
function generateRoutePoints(start, end, pointsCount = 80, wiggle = 0.0015) {
  const pts = [];
  for (let i = 0; i < pointsCount; i++) {
    const t = i / (pointsCount - 1);

    let lat = interpolate(start.lat, end.lat, t);
    let lng = interpolate(start.lng, end.lng, t);

    // add "run-like" zig-zag wiggle
    lat += (Math.sin(t * Math.PI * 6) * wiggle) + (Math.random() - 0.5) * wiggle;
    lng += (Math.cos(t * Math.PI * 6) * wiggle) + (Math.random() - 0.5) * wiggle;

    pts.push({ lat, lng });
  }
  return pts;
}

// ========== SHARED SYNC HELPER ==========
async function syncStravaActivity(accessToken, user) {
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
    console.log("[DEBUG] No activities found for user", user.id);
    return { error: "No activities found" };
  }

  console.log(`[DEBUG] Syncing activity: "${act.name}" (ID: ${act.id})`);

  // 4) Calculate capture status (start/end distance <= 200m)
  const start = act.start_latlng;
  const end = act.end_latlng;

  // We need start/end to calculate closure. 
  // If undefined, we can't capture, but we should still save it? 
  // For now return error if missing coords as per original logic
  if (!start || !end) {
    return { error: "Activity missing start or end coordinates" };
  }

  const startPoint = turf.point([start[1], start[0]]); // [lng, lat]
  const endPoint = turf.point([end[1], end[0]]);

  const distanceKm = turf.distance(startPoint, endPoint, { units: "kilometers" });
  const distanceM = distanceKm * 1000;
  const isClosedRun = distanceM <= 200;

  const RESOLUTION = 10;
  let capturedTiles = [];

  if (isClosedRun) {
    const encoded = act.map?.summary_polyline;

    if (encoded) {
      // decode polyline -> array of [lat, lng]
      const points = polyline.decode(encoded);

      const tileSet = new Set();
      for (const [lat, lng] of points) {
        const tileId = latLngToCell(lat, lng, RESOLUTION);
        tileSet.add(tileId);
      }
      capturedTiles = [...tileSet];
    }
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

  // 6) Save ownership & Record History:
  if (isClosedRun && capturedTiles.length > 0) {
    for (const tileId of capturedTiles) {
      // check current owner
      const existing = await prisma.tileOwnership.findUnique({
        where: { tileId },
        select: { id: true, userId: true }
      });

      if (existing) {
        if (existing.userId !== user.id) {
          // owner changed -> update owner and add history about the change
          await prisma.tileOwnership.update({
            where: { id: existing.id },
            data: { userId: user.id }
          });

          // record history of ownership change
          await prisma.tileHistory.create({
            data: {
              tileId,
              previousUser: existing.userId,
              newUser: user.id,
              activityId: savedActivity.id
            }
          });
        }
      } else {
        // new tile: create ownership + history (previousUser null)
        await prisma.tileOwnership.create({
          data: { tileId, userId: user.id }
        });

        await prisma.tileHistory.create({
          data: {
            tileId,
            previousUser: null,
            newUser: user.id,
            activityId: savedActivity.id
          }
        });
      }
    }
  }

  return {
    rule: {
      distance_start_end_m: Math.round(distanceM),
      captured: isClosedRun,
      max_allowed_m: 200
    },
    tiles: {
      resolution: RESOLUTION,
      captured_count: capturedTiles.length,
      sample: capturedTiles.slice(0, 10)
    },
    activity: savedActivity
  };
}

// ========== DEV ROUTES ==========

// DEV RESET Endpoint
app.post("/dev/reset", async (req, res) => {
  if (process.env.DEV_MODE !== "true") {
    return res.status(403).json({ error: "DEV_MODE disabled" });
  }

  try {
    await prisma.tileHistory.deleteMany();
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
    const RES = 10;
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

app.post("/dev/seed-routes", async (req, res) => {
  if (process.env.DEV_MODE !== "true") {
    return res.status(403).json({ error: "DEV_MODE disabled" });
  }

  try {
    const RES = 10;

    // Pune center
    const baseLat = 18.5204;
    const baseLng = 73.8567;

    // Create users if not exist (same ids as before)
    const dummyUsers = [
      { athleteId: 9000000000, firstname: "Amit", lastname: "Runner", username: "amit_run" },
      { athleteId: 9000000001, firstname: "Neha", lastname: "Walker", username: "neha_walk" },
      { athleteId: 9000000002, firstname: "Ravi", lastname: "Sprinter", username: "ravi_sprint" },
      { athleteId: 9000000003, firstname: "Sara", lastname: "Jogger", username: "sara_jog" },
      { athleteId: 9000000004, firstname: "Karan", lastname: "Hiker", username: "karan_hike" },
      { athleteId: 9000000005, firstname: "Pooja", lastname: "Strider", username: "pooja_stride" }
    ];

    const users = [];

    for (const u of dummyUsers) {
      const user = await prisma.user.upsert({
        where: { stravaAthleteId: BigInt(u.athleteId) },
        update: {
          firstname: u.firstname,
          lastname: u.lastname,
          username: u.username
        },
        create: {
          stravaAthleteId: BigInt(u.athleteId),
          firstname: u.firstname,
          lastname: u.lastname,
          username: u.username
        }
      });

      users.push(user);
    }

    // Generate routes for each user
    let totalActivities = 0;
    let totalTiles = 0;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      // Each user gets 2 routes
      const routeCount = 2;

      for (let r = 0; r < routeCount; r++) {
        // start/end points (spread out more to avoid overlap)
        // Each user gets a different area based on their index
        const offsetLat = ((i % 3) - 1) * 0.04; // -0.04, 0, +0.04
        const offsetLng = (Math.floor(i / 3) - 1) * 0.04;

        const start = {
          lat: baseLat + offsetLat + (Math.random() - 0.5) * 0.02,
          lng: baseLng + offsetLng + (Math.random() - 0.5) * 0.02
        };

        // End near start (closed run simulation)
        const end = {
          lat: start.lat + (Math.random() - 0.5) * 0.002, // within ~200m
          lng: start.lng + (Math.random() - 0.5) * 0.002
        };

        const points = generateRoutePoints(start, end, 200, 0.00015);

        const tileSet = new Set();

        for (const p of points) {
          const tileId = latLngToCell(p.lat, p.lng, RES);
          tileSet.add(tileId);
        }

        const tileIds = [...tileSet];

        // Store tiles & Record History
        for (const tileId of tileIds) {
          try {
            const existing = await prisma.tileOwnership.findUnique({
              where: { tileId },
              select: { id: true, userId: true }
            });

            if (existing) {
              if (existing.userId !== user.id) {
                await prisma.tileOwnership.update({
                  where: { id: existing.id },
                  data: { userId: user.id }
                });

                await prisma.tileHistory.create({
                  data: {
                    tileId,
                    previousUser: existing.userId,
                    newUser: user.id
                  }
                });
              }
            } else {
              await prisma.tileOwnership.create({
                data: { tileId, userId: user.id }
              });

              await prisma.tileHistory.create({
                data: {
                  tileId,
                  previousUser: null,
                  newUser: user.id
                }
              });
            }
          } catch (tileErr) {
            console.error(`[ERROR] Failed processing tile ${tileId}:`, tileErr);
            // continue to next tile
          }
        }

        // distance estimate (fake): based on tile count
        const km = Math.max(1.5, tileIds.length * 0.12);

        // Encode points to polyline format for map display
        const polylineCoords = points.map(p => [p.lat, p.lng]);
        const encodedPolyline = polyline.encode(polylineCoords);

        // Fake activity
        await prisma.activity.create({
          data: {
            stravaId: BigInt(8100000000 + i * 10 + r), // unique
            userId: user.id,
            name: `Seed Route ${r + 1} - ${user.firstname}`,
            distanceM: km * 1000,
            movingTimeS: Math.round(km * 420), // 7min/km approx
            startLat: start.lat,
            startLng: start.lng,
            endLat: end.lat,
            endLng: end.lng,
            polyline: encodedPolyline,
            captured: true
          }
        });

        totalActivities++;
        totalTiles += tileIds.length;
      }
    }

    res.json({
      message: "Realistic route seeding done ✅",
      users: users.length,
      activities_created: totalActivities,
      tiles_generated: totalTiles,
      resolution: RES
    });
  } catch (err) {
    console.error("[ERROR] Seed Routes Failed:", err);
    res.status(500).json({
      error: "Seed routes failed",
      message: err.message,
      stack: err.stack
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
