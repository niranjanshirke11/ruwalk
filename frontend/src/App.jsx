import { useState } from "react";
import TerritoryMap from "./components/TerritoryMap";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [tiles, setTiles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadMyTiles() {
    const athleteId = prompt("Enter your Strava athleteId:");
    if (!athleteId) return;

    setLoading(true);
    try {
      // Fetch both in parallel for speed and consistency
      const [tilesRes, routesRes] = await Promise.all([
        fetch(`http://localhost:4000/tiles/my?athleteId=${athleteId}`),
        fetch(`http://localhost:4000/routes/my?athleteId=${athleteId}`),
      ]);

      if (!tilesRes.ok || !routesRes.ok) throw new Error("Server error");

      const [tilesData, routesData] = await Promise.all([
        tilesRes.json(),
        routesRes.json(),
      ]);

      setTiles(tilesData.tiles || []);
      setRoutes(routesData.routes || []);

      console.log("✅ Sync Complete:", {
        tiles: tilesData.tiles?.length,
        routes: routesData.routes?.length,
      });
    } catch (err) {
      console.error("❌ Load error:", err);
      alert("Failed to load data. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Ruwalk
            </h1>
            <p className="text-gray-500 mt-1 text-lg">
              Conquer your city, one run at a time.
            </p>
          </div>

          <button
            onClick={loadMyTiles}
            disabled={loading}
            className={`px-8 py-4 rounded-2xl font-bold text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Syncing...
              </span>
            ) : (
              "Capture Recent Activity"
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <TerritoryMap tiles={tiles} routes={routes} />

            <div className="flex gap-4">
              <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                  Tiles Owned
                </p>
                <p className="text-3xl font-black text-blue-600">
                  {tiles.length}
                </p>
              </div>
              <div className="flex-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
                  Activities
                </p>
                <p className="text-3xl font-black text-red-500">
                  {routes.length}
                </p>
              </div>
            </div>
          </div>

          <aside>
            <Leaderboard />
          </aside>
        </div>
      </div>
    </div>
  );
}
