export default function Leaderboard() {
  // Hardcoded leaderboard data
  const leaderboardData = [
    {
      id: 1,
      firstname: "Niranjan",
      lastname: "Shirke",
      username: "niranjan_run",
      profile: null,
      tiles: 245,
      totalKm: 42.5,
    },
    {
      id: 2,
      firstname: "Amit",
      lastname: "Runner",
      username: "amit_run",
      profile: null,
      tiles: 189,
      totalKm: 38.2,
    },
    {
      id: 3,
      firstname: "Neha",
      lastname: "Walker",
      username: "neha_walk",
      profile: null,
      tiles: 156,
      totalKm: 31.8,
    },
    {
      id: 4,
      firstname: "Ravi",
      lastname: "Sprinter",
      username: "ravi_sprint",
      profile: null,
      tiles: 134,
      totalKm: 28.4,
    },
    {
      id: 5,
      firstname: "Sara",
      lastname: "Jogger",
      username: "sara_jog",
      profile: null,
      tiles: 98,
      totalKm: 22.1,
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-black text-gray-900 mb-4">🏆 Leaderboard</h2>
      <div className="space-y-3">
        {leaderboardData.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900 truncate">
                {user.firstname} {user.lastname}
              </p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">{user.tiles} tiles</p>
              <p className="text-xs text-gray-500">{user.totalKm} km</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
