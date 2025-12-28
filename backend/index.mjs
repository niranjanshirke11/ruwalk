import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

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

  try {
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

    res.json({
      message: "Strava connected successfully",
      athlete: tokens.athlete.firstname,
      access_token: tokens.access_token
    });

  } catch (error) {
    res.status(500).json({ error: "Strava auth failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
