import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/leaderboard");
      const json = await res.json();
      setData(json || []);
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
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🌍 Worldwide Leaderboard</h2>

        <button
          onClick={fetchLeaderboard}
          className="px-4 py-2 rounded-xl bg-black text-white text-sm"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading leaderboard...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm">No leaderboard data found.</p>
      ) : (
        <div className="space-y-3">
          {data.map((user, index) => {
            const tiles = user?._count?.tiles ?? 0;
            const name = (user.firstname || "") + " " + (user.lastname || "");
            const username = user.username ? `@${user.username}` : "";

            return (
              <div
                key={user.id}
                className="flex items-center justify-between border border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-bold">
                    #{index + 1}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {name.trim() || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500">{username}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">{tiles}</p>
                  <p className="text-xs text-gray-500">tiles</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
