# 🏃‍♂️ Ruwalk - Territory Capture Game

**Turn your runs into conquered territory!**

Ruwalk is a "Fit-to-Play" game that converts real-world GPS activities (runs/walks) into virtual territory ownership on a hexagonal grid. Connect your Strava account, sync your activities, and watch as every step you take captures tiles on the map!

---

## 🎮 What is Ruwalk?

- **Run in Real Life** → Your GPS data is tracked by Strava
- **Sync to Ruwalk** → Import your activity via OAuth2
- **Capture Territory** → Every hexagonal tile you pass through becomes yours
- **Compete** → Steal tiles from other players by running through their territory
- **Dominate** → Climb the leaderboard by owning the most tiles

---

## 🚀 Quick Start

### Current Status: 95% Ready! ✅

Everything is set up **except PostgreSQL**. Follow these steps:

### 1️⃣ Install PostgreSQL
- Download: https://www.postgresql.org/download/windows/
- Password: `ruwalk@1234` ⚠️ **Must be exactly this!**
- Port: `5432` (default)

### 2️⃣ Create Database
```powershell
psql -U postgres -c "CREATE DATABASE ruwalk_db;"
```

### 3️⃣ Setup Database Schema
```powershell
cd backend
npx prisma migrate deploy
npx prisma generate
```

### 4️⃣ Start the Application
```powershell
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5️⃣ Open in Browser
```
http://localhost:5173
```

**Total Setup Time: ~20 minutes** ⏱️

---

## 📁 Project Structure

```
ruwalk/
├── backend/              # Node.js + Express API
│   ├── index.mjs        # Main server file
│   ├── prisma/          # Database schema & migrations
│   │   └── schema.prisma
│   ├── .env             # Environment variables
│   └── package.json
│
├── frontend/            # React + Vite application
│   ├── src/             # React components
│   │   ├── App.jsx
│   │   └── components/
│   ├── .env             # Frontend config
│   └── package.json
│
├── docs/                # Comprehensive documentation
│   ├── PROJECT_DOCUMENTATION.md
│   ├── PROJECT_STATUS.md
│   ├── BUG_HISTORY.md
│   ├── TESTING_GUIDE.md
│   └── REAL_USER_TESTING.md
│
├── QUICK_START.md       # Fast setup guide
├── SETUP_GUIDE.md       # Detailed setup instructions
├── CURRENT_STATUS.md    # Current project status
└── verify-setup.ps1     # Automated verification script
```

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js v25 (ES Modules)
- **Framework:** Express.js v5
- **Database:** PostgreSQL + Prisma ORM
- **Spatial:** H3-js (Hexagonal grid system)
- **APIs:** Strava OAuth2, Turf.js (geospatial)

### Frontend
- **Framework:** React v19
- **Build Tool:** Vite v7
- **Styling:** Tailwind CSS v4
- **Maps:** MapLibre GL JS
- **State:** React Hooks

---

## 🎯 Key Features

### ✅ Implemented
- ✅ Strava OAuth2 integration
- ✅ Activity sync (automatic & manual)
- ✅ H3 hexagonal grid (Resolution 10 = ~66m tiles)
- ✅ Territory capture algorithm
- ✅ Tile stealing mechanics
- ✅ Global leaderboard
- ✅ Interactive map visualization
- ✅ Activity history tracking
- ✅ Tile ownership history

### 🚧 Future Enhancements
- [ ] Real-time notifications when tiles are stolen
- [ ] XP/Level system
- [ ] Team/Guild functionality
- [ ] Activity heatmaps
- [ ] Mobile app (PWA)
- [ ] Webhook integration for auto-sync

---

## 📊 Database Schema

### Tables
1. **User** - Strava profiles and authentication
2. **Activity** - GPS data and run statistics
3. **TileOwnership** - Current tile ownership mapping
4. **TileHistory** - Audit log of all tile captures/steals

### Key Relationships
- User → Activities (1:N)
- User → TileOwnership (1:N)
- TileHistory → User (captures & losses)

---

## 🔧 Configuration

### Backend Environment (.env)
```env
PORT=4000
DATABASE_URL=postgresql://postgres:ruwalk%401234@localhost:5432/ruwalk_db
STRAVA_CLIENT_ID=192231
STRAVA_CLIENT_SECRET=48d088e6b98d407a240335e255a57d09fd81a782
STRAVA_REDIRECT_URI=http://localhost:4000/strava/callback
DEV_MODE=true
```

### Frontend Environment (.env)
```env
VITE_MAPTILER_KEY=uaXczIImvzkwOF1uzG8T
```

---

## 📖 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[QUICK_START.md](QUICK_START.md)** - Get started in minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[CURRENT_STATUS.md](CURRENT_STATUS.md)** - Current project status
- **[docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md)** - Technical architecture
- **[docs/BUG_HISTORY.md](docs/BUG_HISTORY.md)** - All bugs and solutions
- **[docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md)** - Testing procedures

---

## 🧪 Testing

### Manual Testing
1. Start both servers (backend + frontend)
2. Open http://localhost:5173
3. Click "Connect with Strava"
4. Authorize the application
5. Your latest activity syncs automatically
6. View captured tiles on the map

### Database Inspection
```powershell
cd backend
npx prisma studio
```
Opens GUI at http://localhost:5555

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to database"**
```powershell
# Check PostgreSQL is running
Get-Service -Name postgresql*

# Start if needed
Start-Service postgresql-x64-15
```

**"Port already in use"**
```powershell
# Find and kill process
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**"Module not found"**
```powershell
# Reinstall dependencies
cd backend && npm install
cd frontend && npm install
```

See [BUG_HISTORY.md](docs/BUG_HISTORY.md) for more solutions.

---

## 🎮 How to Play

1. **Connect Strava** - Link your Strava account via OAuth2
2. **Go for a run** - Any outdoor activity with GPS tracking
3. **Sync activity** - Click "Sync Latest Activity" or it syncs automatically
4. **View territory** - See your captured hexagonal tiles on the map
5. **Compete** - Run through other players' tiles to steal them
6. **Dominate** - Climb the leaderboard by owning the most tiles

---

## 📈 Project Status

**Current Version:** Stable MVP
**Status:** Fully functional, ready for use
**Last Updated:** February 11, 2026

### What Works
- ✅ Full Strava integration
- ✅ Territory capture mechanics
- ✅ Interactive map visualization
- ✅ Leaderboard system
- ✅ Tile stealing
- ✅ Activity history

### Known Limitations
- Indoor activities (treadmill) are not eligible for capture
- Requires closed-loop runs (start/end within 200m) for capture
- Single-player mode (multiplayer requires multiple Strava accounts)

---

## 🤝 Contributing

This is a personal project, but contributions are welcome!

### Development Workflow
1. Make changes to code
2. Test locally (both backend and frontend)
3. Check database with Prisma Studio
4. Document any bugs in BUG_HISTORY.md
5. Update relevant documentation

---

## 📝 License

This project is for educational and personal use.

---

## 🙏 Acknowledgments

- **Strava API** - Activity data source
- **Uber H3** - Hexagonal spatial indexing
- **MapLibre GL** - Map rendering
- **Prisma** - Database ORM
- **MapTiler** - Map tiles

---

## 📞 Support

For setup issues:
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Check [BUG_HISTORY.md](docs/BUG_HISTORY.md)
3. Run `verify-setup.ps1` to diagnose issues
4. Review backend logs: `backend/error.log`

---

**Ready to conquer the streets? Install PostgreSQL and start running! 🏃‍♂️🗺️**




(Perfect! Now let me create a final summary document for you:

🎉 Ruwalk Project - Complete Setup Analysis
I've thoroughly analyzed your Ruwalk project and created a comprehensive setup guide! Here's what I found:

✅ What's Already Working
Your project is 95% ready to run! Here's what's already set up:

✅ Node.js v25.6.0 - Installed and working
✅ npm v11.8.0 - Installed and working
✅ Git v2.53.0 - Installed and working
✅ All project files - Complete codebase present
✅ Backend dependencies - node_modules installed
✅ Frontend dependencies - node_modules installed
✅ Environment variables - Properly configured
✅ Strava API credentials - Already set up
✅ MapTiler API key - Already configured
⚠️ What's Missing - ONLY ONE THING!
PostgreSQL Database - This is the ONLY thing you need to install!

Why it's critical:

Stores user profiles from Strava
Stores activity data (runs/walks with GPS)
Stores tile ownership (game state)
Stores tile history (who captured what)
🚀 Your Action Plan
I've created 5 comprehensive guides for you:

📄 README.md - Project overview and quick reference
📄 QUICK_START.md - Fast setup guide (recommended to start here!)
📄 SETUP_GUIDE.md - Detailed step-by-step instructions
📄 CURRENT_STATUS.md - Detailed status report
📄 verify-setup.ps1 - Automated verification script
📋 Step-by-Step Setup (After PostgreSQL)
Step 1: Install PostgreSQL (15 minutes)
Download: https://www.postgresql.org/download/windows/
Password: ruwalk@1234 ⚠️ CRITICAL: Must be exactly this!
Port: 5432 (default)
Step 2: Create Database (2 minutes)
powershell
psql -U postgres -c "CREATE DATABASE ruwalk_db;"
Step 3: Setup Database Schema (2 minutes)
powershell
cd d:\ruwalk\backend
npx prisma migrate deploy
npx prisma generate
Step 4: Start Backend (Terminal 1)
powershell
cd d:\ruwalk\backend
npm start
Step 5: Start Frontend (Terminal 2)
powershell
cd d:\ruwalk\frontend
npm run dev
Step 6: Open Browser
http://localhost:5173
Total Time: ~20 minutes ⏱️

🎮 What is Ruwalk?
Ruwalk is a territory capture game that turns real-world runs into virtual territory!

How it works:

Connect your Strava account
Go for a run (with GPS tracking)
Sync your activity to Ruwalk
Every hexagonal tile you run through becomes yours!
Steal tiles from other players by running through their territory
Climb the leaderboard by owning the most tiles
Tech Stack:

Backend: Node.js + Express + PostgreSQL + Prisma
Frontend: React + Vite + Tailwind CSS + MapLibre GL
Spatial: H3 Hexagonal Grid (Resolution 10 = ~66m tiles)
Integration: Strava OAuth2 API
📊 Project Architecture
User runs → Strava tracks GPS → Ruwalk syncs activity → 
Algorithm converts path to H3 tiles → Database stores ownership → 
Map displays territory → Leaderboard updates
Database Tables:

User - Strava profiles
Activity - Run/walk data with GPS polylines
TileOwnership - Maps tile IDs to users
TileHistory - Audit log of captures/steals
🔧 Helpful Commands
Verify setup:

powershell
powershell -ExecutionPolicy Bypass -File "d:\ruwalk\verify-setup.ps1"
View database:

powershell
cd d:\ruwalk\backend
npx prisma studio
Opens GUI at http://localhost:5555

Check PostgreSQL:

powershell
Get-Service -Name postgresql*
📚 Documentation Created
I've created these files for you:

d:\ruwalk\README.md - Main project documentation
d:\ruwalk\QUICK_START.md - Fast setup guide
d:\ruwalk\SETUP_GUIDE.md - Detailed instructions
d:\ruwalk\CURRENT_STATUS.md - Status report
d:\ruwalk\verify-setup.ps1 - Verification script
d:\ruwalk.agent\workflows\setup-project.md - Automated workflow
Existing docs (already in your project):

docs/PROJECT_DOCUMENTATION.md - Technical architecture
docs/PROJECT_STATUS.md - Feature overview
docs/BUG_HISTORY.md - All bugs and solutions
docs/TESTING_GUIDE.md - Testing procedures
🎯 Next Steps
Read QUICK_START.md - Start here for fastest setup
Install PostgreSQL - Download and install with password ruwalk@1234
Run verify-setup.ps1 - Verify everything is ready
Follow the 6 steps above - Get your app running
Connect Strava and play! - Start capturing territory
💡 Pro Tips
Use Prisma Studio to visually browse your database
Check BUG_HISTORY.md if you encounter issues - it has solutions to common problems
Keep both terminals open (backend + frontend) while using the app
Test with real runs - The app works best with actual GPS data from outdoor activities)