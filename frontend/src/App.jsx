import { useState } from "react";
import TerritoryMap from "./components/TerritoryMap";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadMyTiles() {
    const athleteId = prompt("Enter your Strava athleteId:");

    if (!athleteId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:4000/tiles/my?athleteId=${athleteId}`
      );
      const data = await res.json();
      setTiles(data.tiles || []);
    } catch {
      alert("Failed to load tiles");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Ruwalk</h1>
            <p className="text-gray-600">
              Post-run territory capture using Strava
            </p>
          </div>

          <button
            onClick={loadMyTiles}
            className="px-5 py-3 rounded-xl bg-black text-white"
          >
            {loading ? "Loading..." : "Load Territory"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TerritoryMap tiles={tiles} />
            <div className="mt-4 text-sm text-gray-700">
              Tiles loaded: <b>{tiles.length}</b>
            </div>
          </div>

          <div>
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
