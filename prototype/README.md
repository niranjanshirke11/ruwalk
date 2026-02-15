# Ruwalk Prototype

This is a **standalone frontend prototype** of the Ruwalk application. It demonstrates the UI and map visualization without requiring a backend server.

## 🎯 Purpose

This prototype is designed for:

- **Demonstrations** - Show the app's look and feel without setting up the full stack
- **UI Testing** - Test frontend changes in isolation
- **Presentations** - Quick showcase of the application

## 🚀 Quick Start

1. **Install dependencies** (if not already done):

   ```bash
   npm install
   ```

2. **Start the dev server**:

   ```bash
   npm run dev
   ```

3. **Open in browser**:
   - The app will be available at `http://localhost:5174/` (or another port if 5174 is in use)

## 📊 What's Included

### Hardcoded Data

- **User Profile**: Sample user "Niranjan Shirke"
- **Territory Tiles**: 10 current tiles + 5 history tiles (H3 hexagons around Pune)
- **Routes**: 2 sample running routes with polylines
- **Leaderboard**: 5 sample users with stats

### Features Demonstrated

- ✅ Interactive map with MapLibre GL
- ✅ Territory visualization (H3 hexagonal tiles)
- ✅ Route polylines with click popups
- ✅ Leaderboard display
- ✅ Responsive layout
- ✅ Tailwind CSS styling

## 🔧 Configuration

The prototype uses the same MapTiler API key as the main project. If you need to change it:

1. Edit `.env` file:
   ```
   VITE_MAPTILER_KEY=your_key_here
   ```

## 📝 Customizing Data

To modify the hardcoded data, edit `src/App.jsx`:

- **User info**: Update the `currentUser` object
- **Tiles**: Modify `currentTiles` and `historyTiles` arrays (use H3 indexes)
- **Routes**: Update the `routes` array (requires polyline encoding)

## ⚠️ Limitations

This is a **frontend-only** prototype:

- ❌ No authentication
- ❌ No database
- ❌ No Strava integration
- ❌ No real-time data updates
- ❌ No backend API calls

For the full application with all features, use the main project in the `ruwalk` folder.

## 🗂️ Project Structure

```
prototype/
├── src/
│   ├── components/
│   │   ├── TerritoryMap.jsx    # Map component
│   │   └── Leaderboard.jsx     # Leaderboard component
│   ├── App.jsx                 # Main app with hardcoded data
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS
├── .env                        # Environment variables
└── package.json                # Dependencies
```

## 🔗 Related

- Main Application: `../ruwalk/`
- Documentation: `../PROJECT_DOCUMENTATION.md`
- Project Status: `../PROJECT_STATUS.md`
