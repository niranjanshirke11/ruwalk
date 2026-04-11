import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

const RANK_STYLES = [
  { bg: "rgba(251,191,36,0.15)", color: "#d97706", icon: "🥇" },
  { bg: "rgba(156,163,175,0.15)", color: "#6b7280", icon: "🥈" },
  { bg: "rgba(251,146,60,0.15)", color: "#ea580c", icon: "🥉" },
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
    <div className="glass" style={{ padding: "20px", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: 800, color: "var(--txt)", letterSpacing: "-0.01em" }}>
            🏆 Rankings
          </h2>
          <p style={{ fontSize: "11px", color: "var(--txt3)", marginTop: "2px" }}>Top territory capturers</p>
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
      <div style={{ flex: 1, overflow: "hidden", overflowY: "auto" }}>
        {loading && data.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                height: "60px", borderRadius: "var(--r-md)",
                background: "var(--surface2)",
                animation: "pulse-dot 1.4s ease infinite",
                animationDelay: `${i * 0.1}s`,
              }} />
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
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {data.map((user, index) => {
              const isMe = String(user.id) === String(currentUserId);
              const rank = RANK_STYLES[index] || null;
              const name = `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Anonymous";
              const tiles = user.tiles ?? 0;
              const km = user.totalKm ?? 0;

              return (
                <button
                  key={user.id}
                  id={`leaderboard-user-${user.id}`}
                  onClick={() => onSelectUser && onSelectUser(user.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 12px", borderRadius: "var(--r-md)",
                    background: isMe ? "var(--indigo-light)" : "transparent",
                    border: isMe ? "1px solid rgba(99,102,241,0.25)" : "1px solid transparent",
                    cursor: "pointer", transition: "all var(--t)",
                    fontFamily: "var(--font)", textAlign: "left", width: "100%",
                  }}
                  onMouseEnter={e => { if (!isMe) e.currentTarget.style.background = "var(--surface2)"; }}
                  onMouseLeave={e => { if (!isMe) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    {/* Rank badge */}
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: rank ? "18px" : "13px", fontWeight: 800,
                      background: rank ? rank.bg : "var(--surface2)",
                      color: rank ? rank.color : "var(--txt3)",
                    }}>
                      {rank ? rank.icon : index + 1}
                    </div>

                    {/* User info */}
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--txt)", lineHeight: 1.2 }}>
                        {name} {isMe && <span style={{ fontSize: "10px", color: "var(--indigo)", fontWeight: 800 }}>(you)</span>}
                      </p>
                      <p style={{ fontSize: "11px", color: "var(--txt3)", marginTop: "1px" }}>
                        @{user.username || "runner"} {user.isGuest ? "• guest" : ""}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontSize: "15px", fontWeight: 900, color: "var(--txt)", lineHeight: 1.1 }}>
                      {tiles}
                      <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--txt3)", marginLeft: "3px" }}>tiles</span>
                    </p>
                    <p style={{ fontSize: "10px", color: "var(--txt3)", marginTop: "1px" }}>{km} km</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer tip */}
      <div className="divider" />
      <p style={{ fontSize: "11px", color: "var(--txt3)", textAlign: "center" }}>
        Click a player to see their territory
      </p>
    </div>
  );
}
