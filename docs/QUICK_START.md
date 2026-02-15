# 🎯 RUWALK PROJECT - QUICK START

**Last Updated:** February 11, 2026

---

## ✅ WHAT'S WORKING

- ✅ Node.js v25.6.0
- ✅ npm v11.8.0  
- ✅ Git v2.53.0
- ✅ All project files present
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ Environment variables configured

---

## ❌ WHAT'S MISSING

### **PostgreSQL Database** - REQUIRED!

This is the **ONLY** thing you need to install to run your project.

**Download:** https://www.postgresql.org/download/windows/

**Installation Settings:**
- Port: `5432`
- Password: `ruwalk@1234` ⚠️ **IMPORTANT: Must be exactly this!**
- Username: `postgres`
- Install all components

---

## 🚀 AFTER INSTALLING POSTGRESQL

### Step 1: Create Database
```powershell
psql -U postgres -c "CREATE DATABASE ruwalk_db;"
```
(Password: ruwalk@1234)

### Step 2: Setup Database Tables
```powershell
cd d:\ruwalk\backend
npx prisma migrate deploy
npx prisma generate
```

### Step 3: Start Backend (Terminal 1)
```powershell
cd d:\ruwalk\backend
npm start
```

### Step 4: Start Frontend (Terminal 2)
```powershell
cd d:\ruwalk\frontend
npm run dev
```

### Step 5: Open Browser
```
http://localhost:5173
```

---

## 📖 WHAT IS RUWALK?

**Ruwalk** is a territory capture game that turns your real-world runs and walks into virtual territory ownership!

### How it works:
1. **Connect Strava** - Link your Strava account
2. **Go for a run** - Any run or walk with GPS tracking
3. **Sync activity** - Import your run into Ruwalk
4. **Capture tiles** - Every hexagonal tile you run through becomes yours!
5. **Compete** - Steal tiles from other players by running through their territory

### Tech Stack:
- **Backend:** Node.js + Express + PostgreSQL + Prisma
- **Frontend:** React + Vite + Tailwind CSS + MapLibre GL
- **Spatial:** H3 Hexagonal Grid (Resolution 10 = ~66m tiles)
- **Integration:** Strava OAuth2 API

---

## 📊 PROJECT STATS

- **Database Tables:** 4 (User, Activity, TileOwnership, TileHistory)
- **API Endpoints:** 6+ REST endpoints
- **Map Resolution:** H3 Resolution 10 (~66 meter hexagons)
- **Status:** Stable MVP - Fully functional!

---

## 📚 DOCUMENTATION

All docs are in `d:\ruwalk\docs\`:

- **SETUP_GUIDE.md** - Complete setup instructions
- **CURRENT_STATUS.md** - Detailed status report
- **PROJECT_DOCUMENTATION.md** - Technical architecture
- **PROJECT_STATUS.md** - Feature overview
- **BUG_HISTORY.md** - All bugs and solutions
- **TESTING_GUIDE.md** - How to test the app

---

## 🔧 HELPFUL COMMANDS

### Verify Setup
```powershell
powershell -ExecutionPolicy Bypass -File "d:\ruwalk\verify-setup.ps1"
```

### View Database
```powershell
cd d:\ruwalk\backend
npx prisma studio
```
Opens GUI at http://localhost:5555

### Check PostgreSQL Service
```powershell
Get-Service -Name postgresql*
```

### Start PostgreSQL (if stopped)
```powershell
Start-Service postgresql-x64-15
```

---

## ⚡ TROUBLESHOOTING

### "Cannot connect to database"
1. Check PostgreSQL is running: `Get-Service -Name postgresql*`
2. Start if needed: `Start-Service postgresql-x64-15`
3. Verify password is correct: `ruwalk@1234`

### "Port already in use"
```powershell
# Find process on port 4000
netstat -ano | findstr :4000
# Kill it
taskkill /PID <PID> /F
```

### "Module not found"
```powershell
cd d:\ruwalk\backend
npm install

cd d:\ruwalk\frontend
npm install
```

---

## 🎮 USING THE APP

1. Open http://localhost:5173
2. Click "Connect with Strava"
3. Authorize the app
4. Your latest run syncs automatically
5. See your captured tiles on the map!
6. Check the leaderboard to see rankings
7. Go for more runs to capture more territory!

---

## 📞 NEED HELP?

1. Read **SETUP_GUIDE.md** for detailed instructions
2. Check **BUG_HISTORY.md** for common issues
3. Review backend logs: `d:\ruwalk\backend\error.log`
4. Use Prisma Studio to inspect database

---

**🎯 BOTTOM LINE:**

Install PostgreSQL → Create database → Run migrations → Start servers → Play!

**Total time: ~20 minutes** ⏱️
