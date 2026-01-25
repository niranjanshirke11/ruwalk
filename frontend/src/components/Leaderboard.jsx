import { useEffect, useState } from "react";

export default function Leaderboard({ onSelectUser }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/leaderboard");
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black text-gray-900">Rankings</h2>

        <button
          onClick={fetchLeaderboard}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Refresh Leaderboard"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-50 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm">No leaderboard data found.</p>
      ) : (
        <div className="space-y-3">
          {data.map((user, index) => {
            const tiles = user.tiles ?? 0;
            const totalKm = user.totalKm ?? 0;
            const name = (user.firstname || "") + " " + (user.lastname || "");

            return (
              <button
                key={user.id}
                onClick={() =>
                  onSelectUser &&
                  onSelectUser(
                    user.stravaAthleteId
                      ? String(user.stravaAthleteId)
                      : user.id
                  )
                }
                className="w-full flex items-center justify-between hover:bg-gray-50 transition-all rounded-2xl p-4 text-left group border border-transparent hover:border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                      index === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : index === 1
                        ? "bg-gray-100 text-gray-700"
                        : index === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {name.trim() || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      @{user.username || "runner"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-black text-lg text-gray-900">{tiles}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-gray-400 font-bold">
                    {totalKm} km
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
