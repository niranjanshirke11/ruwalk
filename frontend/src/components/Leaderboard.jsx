import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

const RANK_STYLES = [
  { bg: "rgba(251,191,36,0.15)", color: "#d97706", icon: "🥇", glow: "rgba(251,191,36,0.3)" },
  { bg: "rgba(156,163,175,0.15)", color: "#6b7280", icon: "🥈", glow: "rgba(156,163,175,0.3)" },
  { bg: "rgba(251,146,60,0.15)", color: "#ea580c", icon: "🥉", glow: "rgba(251,146,60,0.3)" },
];

export default function Leaderboard({ currentUserId, onSelectUser }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchLeaderboard() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/leaderboard`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchLeaderboard(); }, []);

  return (
    <div className="glass leaderboard-container">
      {/* Header */}
      <div className="leaderboard-header">
        <div>
          <h2 className="leaderboard-title">🏆 Rankings</h2>
          <p className="leaderboard-subtitle">Top territory capturers</p>
        </div>
        <button
          id="leaderboard-refresh-btn"
          onClick={fetchLeaderboard}
          disabled={loading}
          className="btn btn-ghost btn-icon btn-sm"
          title="Refresh"
          style={{ opacity: loading ? 0.5 : 1 }}
        >
          {loading ? <span className="spinner" style={{ width: "14px", height: "14px" }} /> : <RefreshIcon />}
        </button>
      </div>

      {/* Leaderboard list */}
      <div className="leaderboard-list">
        {loading && data.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="skeleton-row" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state" style={{ padding: "32px 12px" }}>
            <div className="empty-icon">🏜️</div>
            <p className="empty-title" style={{ fontSize: "15px" }}>No data yet</p>
            <p className="empty-desc" style={{ fontSize: "12px" }}>
              Be the first to capture some territory!
            </p>
          </div>
        ) : (
          <div className="leaderboard-items">
            {data.map((user, index) => {
              const isMe = String(user.id) === String(currentUserId);
              const rank = RANK_STYLES[index] || null;
              const displayName = user.username || "Anonymous";
              const emoji = user.emoji || "🏃";
              const tiles = user.tiles ?? 0;
              const km = user.totalKm ?? 0;

              return (
                <button
                  key={user.id}
                  id={`leaderboard-user-${user.id}`}
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                  className={`leaderboard-row ${isMe ? "leaderboard-row-me" : ""}`}
                >
                  <div className="leaderboard-row-left">
                    {/* Rank badge */}
                    <div className="leaderboard-rank" style={{
                      background: rank ? rank.bg : "var(--surface2)",
                      color: rank ? rank.color : "var(--txt3)",
                      boxShadow: rank ? `0 0 12px ${rank.glow}` : "none",
                    }}>
                      {rank ? rank.icon : index + 1}
                    </div>

                    {/* User emoji + info */}
                    <div className="leaderboard-user-avatar">{emoji}</div>
                    <div className="leaderboard-user-info">
                      <p className="leaderboard-user-name">
                        {displayName}
                        {isMe && <span className="leaderboard-you-tag">(you)</span>}
                      </p>
                      <p className="leaderboard-user-handle">
                        @{user.username || "runner"}
                        {user.isGuest ? " • guest" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="leaderboard-row-right">
                    <p className="leaderboard-tiles">
                      {tiles}
                      <span className="leaderboard-tiles-label">tiles</span>
                    </p>
                    <p className="leaderboard-km">{km} km</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div className="divider" />
      <p className="leaderboard-footer">
        Click a player to see their territory
      </p>
    </div>
  );
}
