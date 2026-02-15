import { useState } from "react";
import TerritoryMap from "./components/TerritoryMap";
import Leaderboard from "./components/Leaderboard";
import "./index.css";

export default function App() {
  const [isMapReady, setIsMapReady] = useState(false);

  // Hardcoded user data
  const currentUser = {
    id: "1",
    firstname: "Niranjan",
    lastname: "Shirke",
    username: "niranjan_run",
    profile: null,
  };

  // Hardcoded tiles (H3 indexes around Pune area)
  const currentTiles = [
    "8a2db4a4c927fff",
    "8a2db4a4c92ffff",
    "8a2db4a4c937fff",
    "8a2db4a4c93ffff",
    "8a2db4a4c947fff",
    "8a2db4a4c94ffff",
    "8a2db4a4c957fff",
    "8a2db4a4c95ffff",
    "8a2db4a4c967fff",
    "8a2db4a4c96ffff",
  ];

  const historyTiles = [
    "8a2db4a4c977fff",
    "8a2db4a4c97ffff",
    "8a2db4a4c987fff",
    "8a2db4a4c98ffff",
    "8a2db4a4c997fff",
  ];

  // Hardcoded route (encoded polyline for a route in Pune)
  // This is a sample route - you can replace with actual Strava polyline
  const routes = [
    {
      activityId: 1,
      name: "Morning Run - Koregaon Park",
      distance: 5200, // meters
      date: new Date("2026-01-28"),
      polyline: "ypqlCwxquMaBkAqBmAuBqAyBsA}BuAwCwA{CyA}C{AaDcBaEgBcEiBgEkB",
    },
    {
      activityId: 2,
      name: "Evening Walk - FC Road",
      distance: 3400,
      date: new Date("2026-01-27"),
      polyline: "qpqlCsxquMkBaAoBcAsBgAuBiAwBkA{BmA}BoA_CqAaCsAcCuA",
    },
  ];

  function handleMapReady() {
    setIsMapReady(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              Ruwalk
            </h1>
            <p className="text-gray-500 font-medium">
              Capture the world, one run at a time.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-gray-900">
                  {currentUser.firstname} {currentUser.lastname}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  @{currentUser.username}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-gray-100 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold">
                {currentUser.firstname[0]}
              </div>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors">
                My Map
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 relative">
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
            <Leaderboard />
          </div>
        </div>

        {/* Demo Notice */}
        <div className="mt-8 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl">
          <p className="text-sm font-bold text-yellow-900 text-center">
            🎨 PROTOTYPE MODE - This is a demo with hardcoded data
          </p>
        </div>
      </div>
    </div>
  );
}
