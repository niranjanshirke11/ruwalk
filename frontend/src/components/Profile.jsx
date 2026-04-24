/**
 * Profile.jsx — User profile page
 * Shows XP/Level, missions, stats, and run history.
 */
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function Profile({ currentUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?.id) return;
    setLoading(true);
    fetch(`${API_URL}/live/profile`, {
      headers: { "x-user-id": String(currentUser.id) },
    })
      .then(r => r.json())
      .then(data => { if (!data.error) setProfile(data); })
      .catch(err => console.error("[PROFILE]", err))
      .finally(() => setLoading(false));
  }, [currentUser]);

  if (loading) {
    return (
      <div className="glass profile-loading">
        <span className="spinner spinner-lg" />
        <p style={{ color: "var(--txt2)", fontWeight: 700 }}>Loading profile…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="glass" style={{ padding: 32 }}>
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <p className="empty-title">No Profile Data</p>
          <p className="empty-desc">Start a live run to see your stats here!</p>
        </div>
      </div>
    );
  }

  const { user, stats, xp, level, missions, history } = profile;
  const xpProgress = level.nextLevelXp
    ? ((xp - (level.xp || 0)) / (level.nextLevelXp - (level.xp || 0))) * 100
    : 100;

  // Use the level's own xp threshold, not the total xp stored in level.xp
  const currentLevelXp = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000][level.level - 1] || 0;
  const progress = level.nextLevelXp
    ? ((xp - currentLevelXp) / (level.nextLevelXp - currentLevelXp)) * 100
    : 100;

  return (
    <div className="profile-container animate-fade-slide">

      {/* ── Profile Header Card ── */}
      <div className="glass profile-header-card">
        <div className="profile-avatar-ring">
          <span className="profile-emoji">{user.emoji}</span>
        </div>
        <h2 className="profile-username">@{user.username}</h2>
        <div className="profile-level-badge">
          <span className="profile-level-icon">⭐</span>
          <span>Lv.{level.level}</span>
          <span className="profile-level-title">{level.title}</span>
        </div>

        {/* XP Bar */}
        <div className="xp-bar-container">
          <div className="xp-bar-track">
            <div className="xp-bar-fill" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
          <div className="xp-bar-labels">
            <span>{xp} XP</span>
            <span>{level.nextLevelXp ? `${level.nextLevelXp} XP` : "MAX"}</span>
          </div>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <span className="profile-stat-icon">🗺️</span>
          <span className="profile-stat-value">{stats.totalTiles}</span>
          <span className="profile-stat-label">Tiles</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-icon">🏃</span>
          <span className="profile-stat-value">{stats.totalKm}</span>
          <span className="profile-stat-label">Km</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-icon">⚔️</span>
          <span className="profile-stat-value">{stats.tilesStolen}</span>
          <span className="profile-stat-label">Stolen</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-icon">📊</span>
          <span className="profile-stat-value">#{stats.rank || "—"}</span>
          <span className="profile-stat-label">Rank</span>
        </div>
      </div>

      {/* ── Missions ── */}
      <div className="glass profile-section">
        <h3 className="profile-section-title">🎯 Missions</h3>
        <div className="missions-list">
          {missions.map(m => (
            <div key={m.id} className={`mission-card ${m.completed ? "mission-done" : ""}`}>
              <div className="mission-icon">{m.icon}</div>
              <div className="mission-info">
                <div className="mission-header">
                  <span className="mission-title">{m.title}</span>
                  <span className={`mission-xp ${m.completed ? "mission-xp-done" : ""}`}>
                    {m.completed ? "✅" : ""} +{m.xpReward} XP
                  </span>
                </div>
                <p className="mission-desc">{m.desc}</p>
                {!m.completed && (
                  <div className="mission-progress-track">
                    <div className="mission-progress-fill" style={{ width: `${m.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Run History ── */}
      <div className="glass profile-section">
        <h3 className="profile-section-title">📋 Run History</h3>
        {history.length === 0 ? (
          <p style={{ color: "var(--txt3)", fontSize: 13, textAlign: "center", padding: "20px 0" }}>
            No runs yet. Start your first run!
          </p>
        ) : (
          <div className="history-list">
            {history.map(h => (
              <div key={h.id} className="history-item">
                <div className="history-left">
                  <span className="history-icon">{h.source === "live" ? "📍" : "🔶"}</span>
                  <div>
                    <p className="history-name">{h.name || "Untitled Run"}</p>
                    <p className="history-date">
                      {new Date(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="history-right">
                  <span className="history-distance">
                    {h.distanceM >= 1000 ? `${(h.distanceM / 1000).toFixed(1)} km` : `${h.distanceM} m`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
