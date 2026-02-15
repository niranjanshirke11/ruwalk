import { useEffect, useState, useRef } from "react";
import TerritoryMap from "./components/TerritoryMap";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTiles, setCurrentTiles] = useState([]);
  const [historyTiles, setHistoryTiles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapReadyRef = useRef({ setIsMapReady });

  function handleMapReady() {
    setIsMapReady(true);
  }

  // Check for login on mount
  useEffect(() => {
    // 1. Check URL for user data (redirect from backend)
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    const tokenParam = params.get("token");

    if (userParam) {
      try {
        const user = JSON.parse(userParam);
        localStorage.setItem("currentUser", JSON.stringify(user));
        if (tokenParam) localStorage.setItem("strava_token", tokenParam);
        setCurrentUser(user);

        // Clear URL
        window.history.replaceState({}, document.title, "/");
      } catch (err) {
        console.error("Failed to parse user param", err);
      }
    } else {
      // 2. Check localStorage
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    }
  }, []);

  // UseEffect to load my data when logged in
  useEffect(() => {
    if (currentUser) {
      loadTerritory("me");
    }
  }, [currentUser]);

  // Unified loader: 'me' or userId
  async function loadTerritory(target) {
    setLoading(true);
    setCurrentTiles([]);
    setHistoryTiles([]);
    setRoutes([]);

    try {
      let tilesUrl, routesUrl;
      const headers = {};

      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

      if (target === "me") {
        if (!currentUser) return;
        tilesUrl = `${API_URL}/me/tiles?history=true`;
        routesUrl = `${API_URL}/me/routes`;
        headers["x-user-id"] = currentUser.id;
      } else {
        // Public view
        tilesUrl = `${API_URL}/users/${target}/tiles?history=true`;
        routesUrl = `${API_URL}/users/${target}/routes`;
      }

      const [tilesResp, routesResp] = await Promise.all([
        fetch(tilesUrl, { headers }).then((r) => r.json()),
        fetch(routesUrl, { headers }).then((r) => r.json()),
      ]);

      if (tilesResp.error) throw new Error(tilesResp.error);

      setCurrentTiles(tilesResp.tiles || []);
      setHistoryTiles((tilesResp.history || []).map((h) => h.tileId));
      setRoutes(routesResp.routes || []);
    } catch (err) {
      console.error("Failed loading territory", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSync() {
    const token = localStorage.getItem("strava_token");
    if (!token) return alert("Please log in again to sync.");

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const resp = await fetch(`${API_URL}/strava/sync-latest?token=${token}`);

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("Sync server error:", errorText);
        return alert(`Server Error (${resp.status}): The sync took too long or failed. Check Vercel logs.`);
      }

      const data = await resp.json();

      if (data.error) {
        alert(`Sync Error: ${data.error}`);
      } else {
        alert(`Success! Captured ${data.tiles?.captured_count || 0} tiles.`);
        loadTerritory("me"); // Refresh map
      }
    } catch (err) {
      console.error("Sync request failed", err);
      alert(`Network Error: Could not reach the backend. Make sure VITE_API_URL is correct.`);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("strava_token");
    setCurrentUser(null);
    setCurrentTiles([]);
    setHistoryTiles([]);
    setRoutes([]);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <img src="/favicon.png" alt="Ruwalk Logo" className="w-12 h-12 rounded-xl shadow-sm" />
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">
                Ruwalk
              </h1>
              <p className="text-gray-500 font-medium">
                Capture the world, one run at a time.
              </p>
            </div>
          </div>

          <div>
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-bold text-gray-900">
                    {currentUser.firstname} {currentUser.lastname}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    @{currentUser.username}
                  </p>
                </div>
                {currentUser.profile && (
                  <img
                    src={currentUser.profile}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-100"
                  />
                )}
                <button
                  onClick={handleSync}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${loading
                    ? "bg-gray-50 text-gray-400"
                    : "bg-orange-50 text-orange-600 hover:bg-orange-100"
                    }`}
                >
                  {loading ? "Syncing..." : "Sync Latest"}
                </button>
                <button
                  onClick={() => loadTerritory("me")}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors"
                >
                  My Map
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <a
                href={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/strava/login`}
                className="flex items-center gap-2 px-6 py-3 bg-[#FC4C02] text-white font-bold rounded-xl hover:bg-[#e34402] transition-colors shadow-lg shadow-orange-500/20"
              >
                Connect Strava
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-black"></div>
                </div>
              )}
              <div className="aspect-[4/3] w-full">
                <TerritoryMap
                  currentTiles={currentTiles}
                  historyTiles={historyTiles}
                  routes={routes}
                  onMapReady={handleMapReady}
                />
              </div>
            </div>

            <div className="flex gap-4 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm font-bold text-gray-600">
                  {currentTiles.length} Current Tiles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span className="text-sm font-bold text-gray-600">
                  {historyTiles.length} History
                </span>
              </div>
            </div>
          </div>

          <div>
            <Leaderboard onSelectUser={(userId) => loadTerritory(userId)} />
          </div>
        </div>
      </div>
    </div>
  );
}
