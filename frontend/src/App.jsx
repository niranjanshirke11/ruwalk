import { useEffect, useState, useRef } from "react";
import TerritoryMap from "./components/TerritoryMap";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [currentTiles, setCurrentTiles] = useState([]);
  const [historyTiles, setHistoryTiles] = useState([]); // array of tileIds (historical captures)
  const [routes, setRoutes] = useState([]); // array of decoded polylines or geojson lines
  const [loading, setLoading] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);

  // Provide a ref to allow child map component to notify readiness
  const mapReadyRef = useRef({ setIsMapReady });

  // Called by TerritoryMap when map 'load' fired
  function handleMapReady() {
    setIsMapReady(true);
  }

  // main loader for a user (by athleteId)
  async function loadUserTerritory(athleteId) {
    if (!athleteId) return;

    setLoading(true);
    setCurrentTiles([]);
    setHistoryTiles([]);
    setRoutes([]);

    try {
      // fetch tiles (including history) and routes in parallel
      const tilesPromise = fetch(
        `http://localhost:4000/tiles/my?athleteId=${athleteId}&history=true`
      ).then((r) => r.json());

      // assume you have an endpoint that returns saved polylines for this user
      const routesPromise = fetch(
        `http://localhost:4000/routes/my?athleteId=${athleteId}`
      ).then((r) => r.json());

      const [tilesResp, routesResp] = await Promise.all([
        tilesPromise,
        routesPromise,
      ]);

      // tilesResp: { tiles: [...], history: [{tileId, createdAt, previousUser, activityId}] }
      setCurrentTiles(tilesResp.tiles || []);

      // history tiles: we map to tileId array (you could keep full objects)
      setHistoryTiles((tilesResp.history || []).map((h) => h.tileId));

      // routesResp expected to contain encoded polylines or geojson lines.
      // Convert if necessary on client. Example: routesResp.routes = [{polyline: '...'}, ...]
      setRoutes(routesResp.routes || []);

      // if the map is ready, TerritoryMap will redraw automatically via props
      // if not ready, when mapReady is set true, the map will draw using updated props
    } catch (err) {
      console.error("Failed loading territory", err);
      alert("Failed to load territory. See console.");
    } finally {
      setLoading(false);
    }
  }

  // expose a helper so leaderboard list can call loadUserTerritory by athleteId
  // you might pass loadUserTerritory to Leaderboard component as prop
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold font-sans">Ruwalk</h1>
            <p className="text-gray-600">Post-run territory capture</p>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="athleteIdInput"
              placeholder="Enter athleteId"
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <button
              onClick={() => {
                const id = document
                  .getElementById("athleteIdInput")
                  .value.trim();
                loadUserTerritory(id);
              }}
              className="px-6 py-2 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors"
            >
              {loading ? "Loading..." : "Load Territory"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TerritoryMap
              currentTiles={currentTiles}
              historyTiles={historyTiles}
              routes={routes}
              onMapReady={handleMapReady}
            />
            <div className="mt-4 flex gap-4 text-sm font-medium">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                Current: <b>{currentTiles.length}</b>
              </span>
              <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full">
                Historical: <b>{historyTiles.length}</b>
              </span>
            </div>
          </div>

          <div>
            {/* pass loadUserTerritory into leaderboard so clicking a row loads that user */}
            <Leaderboard
              onSelectUser={(athleteId) => loadUserTerritory(athleteId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
