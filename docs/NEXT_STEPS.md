# Immediate Next Steps

I have configured your project files for Vercel deployment. Now you need to perform the following steps to get it live.

## 1. Push your code to GitHub
Open your terminal in VS Code and run:
```powershell
git push origin main
```
This sends all my latest configuration changes to your repository.

## 2. Set up your Database (Neon)
1.  Go to [Neon.tech](https://neon.tech) and create a project.
2.  Copy the **Connection String** (it starts with `postgres://`).
3.  **Run the migration command locally** to set up the tables in the cloud database:
    *(Replace the URL below with your actual Neon connection string)*
    ```powershell
    $env:DATABASE_URL="postgres://neondb_owner:YOUR_PASSWORD@ep-cool-123456.region.neon.tech/neondb?sslmode=require"
    npx prisma migrate deploy
    ```
    *Note: Run this inside the `backend` folder.*

## 3. Deploy Backend to Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard/new).
2.  Import your GitHub repository.
3.  **Select Root Directory**: Click "Edit" and choose `backend`.
4.  **Environment Variables**: expand the section and add:
    *   `DATABASE_URL`: (Your Neon connection string)
    *   `STRAVA_CLIENT_ID`: (From your local .env)
    *   `STRAVA_CLIENT_SECRET`: (From your local .env)
    *   `STRAVA_REDIRECT_URI`: `https://[YOUR_PROJECT_NAME].vercel.app/strava/callback`
    *   `FRONTEND_URL`: `https://[YOUR_FRONTEND_PROJECT].vercel.app` (You can update this later after deploying frontend).
5.  Click **Deploy**.

## 4. Deploy Frontend to Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard/new) again.
2.  Import the **same** GitHub repository.
3.  **Select Root Directory**: Click "Edit" and choose `frontend`.
4.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of the backend you just deployed (e.g., `https://ruwalk-api.vercel.app`).
5.  Click **Deploy**.

## 5. Final Connection
1.  Copy your new **Frontend URL** (e.g., `https://ruwalk-web.vercel.app`).
2.  Go to your Backend project on Vercel -> Settings -> Environment Variables.
3.  Update `FRONTEND_URL` to this new address.
4.  Go to **Strava Developer Settings** and update "Authorization Callback Domain" to `ruwalk-api.vercel.app`.
