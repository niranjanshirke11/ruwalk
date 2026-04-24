import { useEffect, useState, useCallback } from "react";
import TerritoryMap from "./components/TerritoryMap";
import LiveTrackingMap from "./components/LiveTrackingMap";
import Leaderboard from "./components/Leaderboard";
import Profile from "./components/Profile";
import BottomNav from "./components/BottomNav";
import UsernameSetup from "./components/UsernameSetup";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ─── Icons ────────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const StravaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L8.42 0 1 13.828h4.172" />
  </svg>
);
const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
  </svg>
);

export default function App() {
  // ─── Theme ─────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState(() => localStorage.getItem("rw_theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("rw_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  // ─── Navigation ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("capture"); // "capture" | "leaderboard" | "profile"
  const [stravaMode, setStravaMode] = useState(false); // sub-mode inside capture tab

  // ─── Guest User (for Live Capture — no auth required) ──────────────────────
  const [guestUser, setGuestUser] = useState(null);
  const [guestLoading, setGuestLoading] = useState(false);
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    let stored = localStorage.getItem("rw_guest_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setGuestUser(parsed);
      // Detect old users who never set a username (auto-generated "runner_xxx" or "Anonymous")
      const isOldUser = !parsed.username
        || parsed.username.startsWith("runner_")
        || parsed.firstname === "Anonymous"
        || parsed.needsSetup === true;
      if (isOldUser && parsed.needsSetup !== false) {
        setShowSetup(true);
      }
      return;
    }
    // Auto-register as guest
    setGuestLoading(true);
    let guestId = localStorage.getItem("rw_guest_id");
    if (!guestId) {
      guestId = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
      localStorage.setItem("rw_guest_id", guestId);
    }
    fetch(`${API_URL}/live/guest-register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId }),
    })
      .then(r => r.json())
      .then(user => {
        if (!user.error) {
          localStorage.setItem("rw_guest_user", JSON.stringify(user));
          setGuestUser(user);
          if (user.needsSetup) setShowSetup(true);
        }
      })
      .catch(err => console.warn("[GUEST] registration failed:", err))
      .finally(() => setGuestLoading(false));
  }, []);

  function handleSetupComplete(updatedUser) {
    const merged = { ...guestUser, ...updatedUser, needsSetup: false };
    localStorage.setItem("rw_guest_user", JSON.stringify(merged));
    setGuestUser(merged);
    setShowSetup(false);
  }

  // ─── Strava User (only for Strava Sync) ────────────────────────────────────
  const [stravaUser, setStravaUser] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get("user");
    const tokenParam = params.get("token");

    if (userParam) {
      try {
        const user = JSON.parse(userParam);
        localStorage.setItem("rw_strava_user", JSON.stringify(user));
        if (tokenParam) localStorage.setItem("rw_strava_token", tokenParam);
        setStravaUser(user);
        window.history.replaceState({}, document.title, "/");
        setStravaMode(true);
      } catch (err) {
        console.error("Failed to parse strava user param", err);
      }
    } else {
      const stored = localStorage.getItem("rw_strava_user");
      if (stored) setStravaUser(JSON.parse(stored));
    }
  }, []);

  // ─── Strava: Territory / Tiles ─────────────────────────────────────────────
  const [currentTiles, setCurrentTiles] = useState([]);
  const [historyTiles, setHistoryTiles] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loadingTerritory, setLoadingTerritory] = useState(false);

  const loadTerritory = useCallback(async (target) => {
    setLoadingTerritory(true);
    setCurrentTiles([]);
    setHistoryTiles([]);
    setRoutes([]);

    try {
      const headers = {};
      let tilesUrl, routesUrl;

      if (target === "me") {
        if (!stravaUser) return;
        tilesUrl = `${API_URL}/me/tiles?history=true`;
        routesUrl = `${API_URL}/me/routes`;
        headers["x-user-id"] = stravaUser.id;
      } else {
        tilesUrl = `${API_URL}/users/${target}/tiles?history=true`;
        routesUrl = `${API_URL}/users/${target}/routes`;
      }

      const [tilesResp, routesResp] = await Promise.all([
        fetch(tilesUrl, { headers }).then(r => r.json()),
        fetch(routesUrl, { headers }).then(r => r.json()),
      ]);

      if (tilesResp.error) throw new Error(tilesResp.error);
      setCurrentTiles(tilesResp.tiles || []);
      setHistoryTiles((tilesResp.history || []).map(h => h.tileId));
      setRoutes(routesResp.routes || []);
    } catch (err) {
      console.error("Failed loading territory", err);
    } finally {
      setLoadingTerritory(false);
    }
  }, [stravaUser]);

  useEffect(() => {
    if (stravaUser && stravaMode) loadTerritory("me");
  }, [stravaUser, stravaMode]);

  // ─── Strava Sync ───────────────────────────────────────────────────────────
  const [syncing, setSyncing] = useState(false);

  async function handleSync() {
    const token = localStorage.getItem("rw_strava_token");
    if (!token) return alert("Please connect Strava to sync.");

    setSyncing(true);
    try {
      const resp = await fetch(`${API_URL}/strava/sync-latest?token=${token}`);
      if (!resp.ok) {
        const errorText = await resp.text();
        return alert(`Sync Error (${resp.status}): ${errorText}`);
      }
      const data = await resp.json();
      if (data.error) {
        alert(`Sync Error: ${data.error}`);
      } else {
        alert(`✅ Synced! Captured ${data.tiles?.captured_count ?? 0} tiles.`);
        loadTerritory("me");
      }
    } catch (err) {
      alert("Network error — cannot reach backend.");
    } finally {
      setSyncing(false);
    }
  }

  function handleStravaLogout() {
    localStorage.removeItem("rw_strava_user");
    localStorage.removeItem("rw_strava_token");
    setStravaUser(null);
    setCurrentTiles([]);
    setHistoryTiles([]);
    setRoutes([]);
    setStravaMode(false);
  }

  function handleRunEnd(summary) {
    console.log("[APP] Live run ended:", summary);
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app-shell">

      {/* ── USERNAME SETUP MODAL ── */}
      {showSetup && guestUser && (
        <UsernameSetup guestUser={guestUser} onComplete={handleSetupComplete} />
      )}

      {/* ── HEADER ── */}
      <header className="app-header glass">
        <div className="header-left">
          <div className="header-logo">🏃</div>
          <div>
            <h1 className="header-title">Ruwalk</h1>
            <p className="header-subtitle">Capture the world, one run at a time</p>
          </div>
        </div>

        <div className="header-right">
          {/* Theme Toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="btn btn-ghost btn-icon"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Guest badge (only on capture tab) */}
          {guestUser && activeTab === "capture" && !stravaMode && (
            <span className="badge badge-guest hide-small">
              {guestUser.emoji || "🏃"} {guestUser.username}
            </span>
          )}

          {/* Strava user info + logout */}
          {stravaUser && stravaMode ? (
            <div className="header-strava-info">
              {stravaUser.profile && (
                <img src={stravaUser.profile} alt="Profile" className="header-avatar" />
              )}
              <div className="hide-small" style={{ textAlign: "right" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "var(--txt)" }}>
                  {stravaUser.firstname} {stravaUser.lastname}
                </p>
                <p style={{ fontSize: "11px", color: "var(--txt3)" }}>Strava Connected</p>
              </div>
              <button onClick={handleStravaLogout} className="btn btn-ghost btn-sm" style={{ gap: "6px" }}>
                <LogoutIcon /> <span className="hide-small">Disconnect</span>
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="app-main">
        <div className="app-content">

          {/* ═══ CAPTURE TAB ═══ */}
          {activeTab === "capture" && (
            <div className="animate-fade-slide">
              {/* Mode switcher (Live / Strava) */}
              <div className="mode-switcher">
                <div className="tabs">
                  <button
                    id="tab-live"
                    className={`tab ${!stravaMode ? "active-live" : ""}`}
                    onClick={() => setStravaMode(false)}
                  >
                    📍 Live Capture
                  </button>
                  <button
                    id="tab-strava"
                    className={`tab ${stravaMode ? "active-strava" : ""}`}
                    onClick={() => setStravaMode(true)}
                  >
                    <StravaIcon /> Strava
                  </button>
                </div>

                {/* Strava mode actions */}
                {stravaMode && stravaUser && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      id="sync-btn"
                      onClick={handleSync}
                      disabled={syncing}
                      className="btn btn-orange btn-sm"
                    >
                      {syncing ? <><span className="spinner" style={{ width: "14px", height: "14px", borderTopColor: "white" }} /> Syncing…</> : <><RefreshIcon /> Sync</>}
                    </button>
                    <button
                      id="my-map-btn"
                      onClick={() => loadTerritory("me")}
                      disabled={loadingTerritory}
                      className="btn btn-ghost btn-sm"
                    >
                      My Map
                    </button>
                  </div>
                )}
              </div>

              {/* ── LIVE CAPTURE MODE ── */}
              {!stravaMode && (
                <div className="glass capture-card">
                  <div className="capture-header">
                    <div>
                      <h2 className="capture-title">Live Territory Capture</h2>
                      <p className="capture-desc">
                        Walk or run to capture H3 hexagons in real-time
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span className="badge badge-live">
                        <span className="dot" /> LIVE
                      </span>
                      {guestLoading && <span className="spinner" />}
                    </div>
                  </div>
                  <LiveTrackingMap
                    currentUser={guestUser}
                    onRunEnd={handleRunEnd}
                  />
                </div>
              )}

              {/* ── STRAVA SYNC MODE ── */}
              {stravaMode && (
                <div className="animate-fade-slide">
                  {!stravaUser ? (
                    <div className="glass">
                      <div className="empty-state">
                        <div className="empty-icon">🔗</div>
                        <p className="empty-title">Connect Strava to View Your Territory</p>
                        <p className="empty-desc">
                          Sync your past Strava runs to see which H3 tiles you own across the world map.
                        </p>
                        <a href={`${API_URL}/strava/login`} className="btn btn-orange btn-lg" id="strava-login-main">
                          <StravaIcon /> Connect with Strava
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="glass" style={{ overflow: "hidden", position: "relative" }}>
                      {loadingTerritory && (
                        <div className="map-loading-overlay">
                          <span className="spinner spinner-lg" />
                        </div>
                      )}
                      <TerritoryMap
                        currentTiles={currentTiles}
                        historyTiles={historyTiles}
                        routes={routes}
                      />
                      <div className="tile-stats-row">
                        <div className="tile-stat">
                          <div className="tile-stat-dot" style={{ background: "var(--indigo)" }} />
                          <span>{currentTiles.length} Owned Tiles</span>
                        </div>
                        <div className="tile-stat">
                          <div className="tile-stat-dot" style={{ background: "var(--txt3)" }} />
                          <span>{historyTiles.length} Historical</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ═══ LEADERBOARD TAB ═══ */}
          {activeTab === "leaderboard" && (
            <div className="animate-fade-slide">
              <Leaderboard
                currentUserId={stravaUser?.id || guestUser?.id}
                onSelectUser={(userId) => {
                  setStravaMode(true);
                  setActiveTab("capture");
                  loadTerritory(userId);
                }}
              />
            </div>
          )}

          {/* ═══ PROFILE TAB ═══ */}
          {activeTab === "profile" && (
            <div className="animate-fade-slide">
              <Profile currentUser={guestUser} />
            </div>
          )}

        </div>
      </main>

      {/* ── BOTTOM NAV ── */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
