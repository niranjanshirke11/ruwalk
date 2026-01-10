import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import axios from "axios";
import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pgPkg from "pg";

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

    // 4) Save activity (avoid duplicates using unique stravaId)
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
        polyline: act.map?.summary_polyline ?? null
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
        polyline: act.map?.summary_polyline ?? null
      }
    });

    res.json({
      message: "Latest activity synced successfully",
      user,
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

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
