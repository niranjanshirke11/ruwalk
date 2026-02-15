# Ruwalk Deployment Plan

This guide will walk you through deploying your **Ruwalk** application step-by-step using **Vercel** (for Frontend & Backend) and **Neon** (for the Database).

## Phase 1: Database Setup (Neon)

Since your application needs a place to store data that is accessible from anywhere, we will use Neon (a serverless PostgreSQL provider).

1.  **Create an Account**: Go to [https://neon.tech](https://neon.tech) and sign up.
2.  **Create a Project**:
    *   Name: `ruwalk-db` (or similar).
    *   Region: Choose one close to you (e.g., Singapore for Asia, or US East).
    *   Version: PostgreSQL 16 (default is fine).
3.  **Get Connection String**:
    *   On your Neon Dashboard, look for the **Connection String**.
    *   It will look like: `postgres://neondb_owner:.......@ep-cool-....neon.tech/neondb?sslmode=require`
    *   **Copy this string**.

## Phase 2: Backend Configuration (Local)

We need to prepare your backend to run on Vercel's serverless infrastructure.

1.  **Create `vercel.json`**: We will add a configuration file to tell Vercel how to handle your API.
2.  **Update `package.json`**: Ensure scripts are ready for deployment.
3.  **Test Locally**: Verify everything works before pushing.

## Phase 3: Push to GitHub

Vercel deploys directly from your GitHub repository.

1.  Commit all your changes.
2.  Push your code to your GitHub repository.

## Phase 4: Backend Deployment (Vercel)

1.  **Log in to Vercel**: Go to [https://vercel.com](https://vercel.com) and sign up/login with GitHub.
2.  **Add New Project**:
    *   Import your `ruwalk` repository.
    *   **Root Directory**: specific to `backend`. (We will deploy frontend and backend as separate Vercel projects from the same repo).
    *   **Project Name**: `ruwalk-api` (or similar).
3.  **Configure Environment Variables**:
    *   Copy all values from your local `backend/.env` file.
    *   **CRITICAL**: Update `DATABASE_URL` to your **Neon Connection String**.
    *   Update `FRONTEND_URL` to your future frontend URL (we might need to update this later).
    *   Strava Client ID and Secret must be added here too.
4.  **Deploy**: Click "Deploy".

## Phase 5: Database Migration

Once the backend is connected to the real database, we need to create the tables.

1.  From your **local terminal**, run the migration command pointing to the **Neon Database URL**:
    ```bash
    # Windows PowerShell
    $env:DATABASE_URL="your_neon_connection_string_here"
    npx prisma migrate deploy
    ```
    *(We will help you run this step specifically).*

## Phase 6: Frontend Deployment (Vercel)

1.  **Add New Project** (again) in Vercel Dashboard.
2.  **Import the same repository**.
3.  **Root Directory**: Select `frontend`.
4.  **Project Name**: `ruwalk-web`.
5.  **Environment Variables**:
    *   `VITE_API_URL`: Set this to the URL of your deployed Backend (e.g., `https://ruwalk-api.vercel.app`).
6.  **Deploy**.

## Phase 7: Final Wiring (Strava)

1.  Get your new **Frontend URL** (e.g., `https://ruwalk-web.vercel.app`).
2.  Go to your **Strava Developer Settings**.
3.  Update the **Authorization Callback Domain** to `ruwalk-api.vercel.app`.
4.  Update your `STRAVA_REDIRECT_URI` environment variable in the **Backend Vercel Project** to match (e.g., `https://ruwalk-api.vercel.app/strava/callback`).
5.  Redeploy Backend (Vercel usually handles this on variable change, or you manually trigger it).

---

**Ready to start? Let's tackle Phase 2 (Backend Configuration) right now!**
