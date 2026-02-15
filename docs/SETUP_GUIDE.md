# 🚀 Ruwalk - Complete Setup Guide

This guide will help you set up and run the Ruwalk project from scratch after a fresh laptop format.

---

## 📋 Prerequisites Checklist

### Required Software

- [x] **Node.js** (v25.6.0 installed) ✅
- [x] **npm** (v11.8.0 installed) ✅
- [ ] **PostgreSQL** (Database) - **NEEDS INSTALLATION** ⚠️
- [ ] **Git** (Version Control) - Check if installed

---

## 🗄️ Step 1: Install PostgreSQL

### Option A: Using Official Installer (Recommended)

1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run the installer and follow these settings:
   - **Version**: PostgreSQL 15 or later
   - **Port**: 5432 (default)
   - **Password**: Set to `ruwalk@1234` (as configured in your .env)
   - **Username**: postgres (default)
3. During installation, make sure to install:
   - PostgreSQL Server
   - pgAdmin 4 (GUI tool)
   - Command Line Tools

### Option B: Using Chocolatey (If you have it)

```powershell
choco install postgresql
```

### Verify Installation

```powershell
psql --version
```

---

## 🗃️ Step 2: Create Database

After PostgreSQL is installed, create the database:

### Using Command Line

```powershell
# Connect to PostgreSQL (will prompt for password: ruwalk@1234)
psql -U postgres

# Inside psql, run:
CREATE DATABASE ruwalk_db;

# Verify database was created
\l

# Exit psql
\q
```

### Using pgAdmin 4 (GUI Alternative)

1. Open pgAdmin 4
2. Connect to your local server (password: `ruwalk@1234`)
3. Right-click "Databases" → Create → Database
4. Name: `ruwalk_db`
5. Click Save

---

## 📦 Step 3: Install Project Dependencies

### Backend Dependencies

```powershell
cd d:\ruwalk\backend
npm install
```

This will install:
- Express.js (Web framework)
- Prisma (Database ORM)
- H3-js (Hexagonal spatial indexing)
- Strava API dependencies
- And more...

### Frontend Dependencies

```powershell
cd d:\ruwalk\frontend
npm install
```

This will install:
- React 19
- Vite (Build tool)
- Tailwind CSS
- MapLibre GL (Map rendering)
- And more...

---

## 🔧 Step 4: Configure Environment Variables

Your `.env` files are already configured, but verify them:

### Backend `.env` (d:\ruwalk\backend\.env)

```env
STRAVA_CLIENT_ID=192231
STRAVA_CLIENT_SECRET=48d088e6b98d407a240335e255a57d09fd81a782
STRAVA_REDIRECT_URI=http://localhost:4000/strava/callback
PORT=4000
DEV_MODE=true
DATABASE_URL="postgresql://postgres:ruwalk%401234@localhost:5432/ruwalk_db?schema=public"
```

### Frontend `.env` (d:\ruwalk\frontend\.env)

```env
VITE_MAPTILER_KEY=uaXczIImvzkwOF1uzG8T
```

---

## 🗄️ Step 5: Initialize Database Schema with Prisma

Run Prisma migrations to create all database tables:

```powershell
cd d:\ruwalk\backend
npx prisma migrate deploy
```

This will create the following tables:
- `User` - Stores Strava user profiles
- `Activity` - Stores run/walk data
- `TileOwnership` - Maps tiles to users
- `TileHistory` - Audit log of tile captures

### Generate Prisma Client

```powershell
npx prisma generate
```

### Verify Database Setup (Optional)

```powershell
# Open Prisma Studio to view your database
npx prisma studio
```

This opens a GUI at http://localhost:5555 to browse your database.

---

## 🚀 Step 6: Start the Application

### Terminal 1: Start Backend Server

```powershell
cd d:\ruwalk\backend
npm start
```

**Expected Output:**
```
🚀 Server running on http://localhost:4000
✅ Database connected successfully
```

### Terminal 2: Start Frontend Development Server

```powershell
cd d:\ruwalk\frontend
npm run dev
```

**Expected Output:**
```
VITE v7.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

## 🧪 Step 7: Test the Application

1. **Open Browser**: Navigate to http://localhost:5173
2. **Connect Strava**: Click "Connect with Strava" button
3. **Authorize**: You'll be redirected to Strava to authorize the app
4. **Sync Activity**: After authorization, your latest run will be synced
5. **View Map**: You should see your captured tiles on the map

---

## 🔍 Troubleshooting

### Issue: "Cannot connect to database"

**Solution:**
1. Verify PostgreSQL is running:
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service -Name postgresql*
   ```
2. If not running, start it:
   ```powershell
   Start-Service postgresql-x64-15  # Adjust version number
   ```

### Issue: "Port 4000 already in use"

**Solution:**
```powershell
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: "Module not found" errors

**Solution:**
```powershell
# Clean install dependencies
cd d:\ruwalk\backend
rm -r node_modules
rm package-lock.json
npm install

# Repeat for frontend
cd d:\ruwalk\frontend
rm -r node_modules
rm package-lock.json
npm install
```

### Issue: Prisma migration errors

**Solution:**
```powershell
# Reset database (WARNING: This deletes all data)
cd d:\ruwalk\backend
npx prisma migrate reset

# Or manually drop and recreate database
psql -U postgres
DROP DATABASE ruwalk_db;
CREATE DATABASE ruwalk_db;
\q

# Then run migrations again
npx prisma migrate deploy
npx prisma generate
```

---

## 📊 Project Structure

```
d:\ruwalk\
├── backend/              # Node.js + Express API
│   ├── index.mjs        # Main server file
│   ├── prisma/          # Database schema & migrations
│   ├── .env             # Backend environment variables
│   └── package.json     # Backend dependencies
├── frontend/            # React + Vite application
│   ├── src/             # React components
│   ├── .env             # Frontend environment variables
│   └── package.json     # Frontend dependencies
└── docs/                # Project documentation
    ├── PROJECT_STATUS.md
    ├── PROJECT_DOCUMENTATION.md
    ├── BUG_HISTORY.md
    └── TESTING_GUIDE.md
```

---

## 🎯 Quick Start Commands (After Initial Setup)

```powershell
# Start backend (Terminal 1)
cd d:\ruwalk\backend && npm start

# Start frontend (Terminal 2)
cd d:\ruwalk\frontend && npm run dev
```

---

## 🔐 Important Notes

1. **Database Password**: The database password is `ruwalk@1234` (URL-encoded as `ruwalk%401234` in DATABASE_URL)
2. **Strava API**: Your Strava credentials are already configured in `.env`
3. **Ports**: 
   - Backend: http://localhost:4000
   - Frontend: http://localhost:5173
   - Prisma Studio: http://localhost:5555

---

## 📚 Additional Resources

- **Project Documentation**: `d:\ruwalk\docs\PROJECT_DOCUMENTATION.md`
- **Bug History**: `d:\ruwalk\docs\BUG_HISTORY.md`
- **Testing Guide**: `d:\ruwalk\docs\TESTING_GUIDE.md`
- **Strava API Docs**: https://developers.strava.com/

---

## ✅ Setup Complete!

Once all steps are completed, you should have:
- ✅ PostgreSQL installed and running
- ✅ Database `ruwalk_db` created
- ✅ All tables created via Prisma migrations
- ✅ Backend running on port 4000
- ✅ Frontend running on port 5173
- ✅ Able to connect with Strava and sync activities

**Happy Running! 🏃‍♂️🗺️**
