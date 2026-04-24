/**
 * LiveTrackingMap.jsx — v4
 * ✅ No auth required — works with guest users auto-registered on mount
 * ✅ GPS starts immediately when map loads (no waiting for Start button)
 * ✅ Dark/light mode aware via CSS vars
 * ✅ Premium UI matching new design system
 */

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { latLngToCell, cellToBoundary } from "h3-js";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const H3_RES = 10;

// ─── Stable color per user ────────────────────────────────────────────────────
const PALETTE = [
  "#6366F1", "#EF4444", "#10B981", "#F59E0B",
  "#8B5CF6", "#EC4899", "#14B8A6", "#F97316", "#84CC16",
];
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function colorForUser(userId, myId) {
  if (String(userId) === String(myId)) return "#6366F1"; // YOU = indigo
  return PALETTE[hashStr(String(userId)) % PALETTE.length];
}

// =============================================================================
export default function LiveTrackingMap({ currentUser, onRunEnd }) {

  // ── DOM / map refs ──────────────────────────────────────────────────────────
  const containerRef = useRef(null);
  const mapRef       = useRef(null);
  const watchIdRef   = useRef(null);
  const wakeLockRef  = useRef(null);
  const pollRef      = useRef(null);

  // ── Mutable run-state (NO re-renders) ─────────────────────────────────────
  const rs = useRef({
    isRunning:   false,
    runId:       null,
    prevLat:     null,
    prevLng:     null,
    prevTime:    null,
    lastTileId:  null,
    capturedSet: new Set(),
    userMarker:  null,
    hasCentered: false,
  });

  // Keep refs to latest values so GPS callbacks never have stale closures
  const currentUserRef = useRef(currentUser);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);
  const fetchRef = useRef(null);

  // ── React UI state ─────────────────────────────────────────────────────────
  const [isRunning,  setIsRunning]  = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [gpsStatus,  setGpsStatus]  = useState("waiting"); // waiting|ok|error
  const [worldTiles, setWorldTiles] = useState([]);
  const [stats, setStats] = useState({ tiles: 0, distanceM: 0, events: [] });

  // ══════════════════════════════════════════════════════════════════════════
  // 1. INIT MAP
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const key = import.meta.env.VITE_MAPTILER_KEY;
    if (!key) { console.error("[MAP] Missing VITE_MAPTILER_KEY"); return; }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: isDark
        ? `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${key}`
        : `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
      center: [73.8567, 18.5204],
      zoom: 14,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      mapRef.current = map;
      setIsMapReady(true);
    });

    return () => { map.remove(); mapRef.current = null; };
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // 2. PAINT WORLD TILES
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    const myId = currentUser?.id;
    const features = worldTiles.map(t => {
      const boundary = cellToBoundary(t.tileId, true);
      boundary.push(boundary[0]);
      return {
        type: "Feature",
        properties: {
          color:  colorForUser(t.userId, myId),
          isMe:   String(t.userId) === String(myId),
          name:   t.ownerName,
          emoji:  t.ownerEmoji || "🏃",
        },
        geometry: { type: "Polygon", coordinates: [boundary] },
      };
    });

    const geojson = { type: "FeatureCollection", features };

    if (map.getSource("world-tiles")) {
      map.getSource("world-tiles").setData(geojson);
    } else {
      map.addSource("world-tiles", { type: "geojson", data: geojson });

      map.addLayer({
        id: "tiles-fill", type: "fill", source: "world-tiles",
        paint: { "fill-color": ["get", "color"], "fill-opacity": 0.35 },
      });
      map.addLayer({
        id: "tiles-line", type: "line", source: "world-tiles",
        paint: { "line-color": ["get", "color"], "line-width": 1.5, "line-opacity": 0.8 },
      });

      map.on("click", "tiles-fill", e => {
        const p = e.features[0].properties;
        new maplibregl.Popup({ closeButton: false, closeOnClick: true })
          .setLngLat(e.lngLat)
          .setHTML(`<div style="font-family:Inter,sans-serif;font-size:13px;font-weight:700">${p.isMe ? "🏆 Your tile" : `${p.emoji} ${p.name}`}</div>`)
          .addTo(map);
      });

      map.on("mouseenter", "tiles-fill", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "tiles-fill", () => { map.getCanvas().style.cursor = ""; });
    }
  }, [isMapReady, worldTiles, currentUser]);

  // ══════════════════════════════════════════════════════════════════════════
  // 3. WORLD-TILE POLLING
  // ══════════════════════════════════════════════════════════════════════════
  async function fetchWorldTiles() {
    try {
      const res = await fetch(`${API_URL}/live/world-tiles`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) setWorldTiles(data);
    } catch (err) {
      console.warn("[LIVE] world-tiles poll failed:", err.message);
    }
  }

  useEffect(() => { fetchRef.current = fetchWorldTiles; });

  useEffect(() => {
    fetchWorldTiles();
    const ms = isRunning ? 5_000 : 30_000;
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => fetchRef.current?.(), ms);
    return () => clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  // ══════════════════════════════════════════════════════════════════════════
  // 4. GPS POSITION HANDLER
  // ══════════════════════════════════════════════════════════════════════════
  const onPosition = useRef(async (pos) => {
    const { latitude: lat, longitude: lng } = pos.coords;
    const now = Date.now();
    const state = rs.current;
    const map = mapRef.current;

    setGpsStatus("ok");

    // ─── Move / create the user marker ────────────────────────────────────
    if (map) {
      if (!state.userMarker) {
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:relative;width:18px;height:18px;";

        const ring = document.createElement("div");
        ring.className = "rw-ring";

        const dot = document.createElement("div");
        dot.style.cssText = `
          width:18px;height:18px;border-radius:50%;
          background:#6366F1;border:3px solid white;
          box-shadow:0 0 0 3px rgba(99,102,241,.3);
          position:relative;z-index:1;
        `;

        wrapper.appendChild(ring);
        wrapper.appendChild(dot);

        state.userMarker = new maplibregl.Marker({ element: wrapper, anchor: "center" })
          .setLngLat([lng, lat])
          .addTo(map);
      } else {
        state.userMarker.setLngLat([lng, lat]);
      }

      if (!state.hasCentered) {
        state.hasCentered = true;
        map.flyTo({ center: [lng, lat], zoom: 17, duration: 1500 });
      } else if (state.isRunning) {
        map.easeTo({ center: [lng, lat], zoom: 17, duration: 300 });
      }
    }

    // ─── Tile capture — only while running ────────────────────────────────
    if (!state.isRunning) return;

    // Distance calculation
    if (state.prevLat != null) {
      const dLat = (lat - state.prevLat) * Math.PI / 180;
      const dLng = (lng - state.prevLng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) ** 2
        + Math.cos(state.prevLat * Math.PI / 180)
        * Math.cos(lat * Math.PI / 180)
        * Math.sin(dLng / 2) ** 2;
      const d = 6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      if (d > 1) {
        setStats(prev => ({ ...prev, distanceM: Math.round(prev.distanceM + d) }));
      }
    }

    const pLat = state.prevLat;
    const pLng = state.prevLng;
    const pTime = state.prevTime;

    state.prevLat = lat;
    state.prevLng = lng;
    state.prevTime = now;

    const tileId = latLngToCell(lat, lng, H3_RES);
    if (tileId === state.lastTileId) return;
    state.lastTileId = tileId;

    const user = currentUserRef.current;
    if (!user) return;

    const body = {
      runId: state.runId,
      lat, lng,
      prevLat: pLat,
      prevLng: pLng,
      elapsedMs: pTime ? now - pTime : null,
    };

    try {
      const res = await fetch(`${API_URL}/live/capture-tile`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": String(user.id) },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data.status === "speed_violation") {
        console.warn("[LIVE] Speed violation, skipping tile");
      } else if (data.status === "captured" || data.status === "stolen") {
        state.capturedSet.add(tileId);
        setStats(prev => ({
          ...prev,
          tiles: state.capturedSet.size,
          events: [
            { status: data.status, tileId, time: new Date().toLocaleTimeString() },
            ...prev.events.slice(0, 9),
          ],
        }));
        fetchRef.current?.();
      }
    } catch (err) {
      console.error("[LIVE] capture-tile error:", err.message);
    }
  });

  // ══════════════════════════════════════════════════════════════════════════
  // 5. START GPS IMMEDIATELY WHEN MAP IS READY
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!isMapReady) return;
    if (!navigator.geolocation) { setGpsStatus("error"); return; }

    const onErr = (err) => {
      console.error("[GPS]", err.code, err.message);
      setGpsStatus("error");
    };

    const opts = { enableHighAccuracy: true, maximumAge: 0, timeout: 5_000 };

    navigator.geolocation.getCurrentPosition(
      (pos) => onPosition.current(pos),
      onErr,
      { enableHighAccuracy: true, timeout: 15_000, maximumAge: 5_000 }
    );

    const id = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => onPosition.current(pos),
        (err) => console.warn("GPS poll:", err.message),
        opts
      );
    }, 3000);
    watchIdRef.current = id;

    return () => {
      if (watchIdRef.current != null) {
        clearInterval(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [isMapReady]);

  // ══════════════════════════════════════════════════════════════════════════
  // 6. START / STOP RUN
  // ══════════════════════════════════════════════════════════════════════════
  async function startRun() {
    const user = currentUserRef.current;
    if (!user) {
      alert("Please wait — setting up your account…");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/live/start-run`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": String(user.id) },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.error) { alert("Could not start run: " + data.error); return; }

      const state = rs.current;
      state.isRunning  = true;
      state.runId      = data.runId;
      state.prevLat    = null;
      state.prevLng    = null;
      state.prevTime   = null;
      state.lastTileId = null;
      state.capturedSet = new Set();

      setIsRunning(true);
      setStats({ tiles: 0, distanceM: 0, events: [] });

      if ("wakeLock" in navigator) {
        try { wakeLockRef.current = await navigator.wakeLock.request("screen"); }
        catch (e) { console.warn("[LIVE] Wake lock denied:", e.message); }
      }
    } catch (err) {
      alert("Network error — make sure the backend is running.");
      console.error("[LIVE] startRun:", err);
    }
  }

  async function stopRun() {
    const state = rs.current;
    state.isRunning = false;

    if (wakeLockRef.current) {
      await wakeLockRef.current.release().catch(() => { });
      wakeLockRef.current = null;
    }

    setIsRunning(false);

    const user = currentUserRef.current;
    if (!user) return;

    try {
      const res = await fetch(`${API_URL}/live/end-run`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": String(user.id) },
        body: JSON.stringify({ runId: state.runId }),
      });
      const data = await res.json();
      if (onRunEnd) onRunEnd(data);
    } catch (err) {
      console.error("[LIVE] end-run:", err);
    }
  }

  // Cleanup on unmount
  useEffect(() => () => {
    if (watchIdRef.current != null) clearInterval(watchIdRef.current);
    wakeLockRef.current?.release().catch(() => { });
    clearInterval(pollRef.current);
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // 7. RENDER
  // ══════════════════════════════════════════════════════════════════════════
  const gpsBadgeClass = gpsStatus === "ok" ? "badge-gps-ok" : gpsStatus === "error" ? "badge-gps-err" : "badge-gps-wait";
  const gpsLabel = gpsStatus === "ok" ? "📍 GPS Active" : gpsStatus === "error" ? "⚠️ GPS Error" : "⏳ Locating…";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

      {/* ── Map ── */}
      <div style={{
        position: "relative", width: "100%", height: "460px",
        borderRadius: "20px", overflow: "hidden",
        boxShadow: "var(--shadow-xl)",
        border: "1px solid var(--border2)",
      }}>
        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

        {/* GPS Badge */}
        <div className={`badge ${gpsBadgeClass}`} style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 10,
          backdropFilter: "blur(12px)", padding: "7px 14px",
        }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "currentColor", display: "inline-block",
            animation: gpsStatus === "ok" ? "pulse-dot 1.4s ease infinite" : "none",
          }} />
          {gpsLabel}
        </div>

        {/* LIVE Badge */}
        {isRunning && (
          <div className="badge badge-live" style={{
            position: "absolute", top: "12px", right: "54px", zIndex: 10,
            backdropFilter: "blur(12px)", padding: "7px 14px",
            background: "rgba(239,68,68,0.9)",
            color: "white", borderColor: "transparent",
          }}>
            <span className="dot" /> LIVE
          </div>
        )}

        {/* Map loading overlay */}
        {!isMapReady && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 20,
            background: "var(--bg2)",
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "14px",
          }}>
            <span className="spinner spinner-lg" />
            <p style={{ color: "var(--txt2)", fontWeight: 700, fontSize: "14px" }}>Loading Map…</p>
          </div>
        )}
      </div>

      {/* ── Stats (only while running) ── */}
      {isRunning && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div className="stat-chip" style={{ background: "var(--indigo-light)", border: "1px solid rgba(99,102,241,0.2)" }}>
            <p className="stat-label" style={{ color: "var(--indigo)" }}>Tiles Captured</p>
            <p className="stat-value" style={{ color: "var(--indigo)" }}>{stats.tiles}</p>
          </div>
          <div className="stat-chip" style={{ background: "var(--green-light)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <p className="stat-label" style={{ color: "var(--green)" }}>Distance</p>
            <p className="stat-value" style={{ color: "var(--green)" }}>
              {stats.distanceM >= 1000
                ? `${(stats.distanceM / 1000).toFixed(2)} km`
                : `${stats.distanceM} m`}
            </p>
          </div>
        </div>
      )}

      {/* ── Event feed ── */}
      {isRunning && stats.events.length > 0 && (
        <div style={{
          background: "var(--surface2)", border: "1px solid var(--border)",
          borderRadius: "var(--r-md)", padding: "12px 14px",
          maxHeight: "110px", overflowY: "auto",
        }}>
          {stats.events.map((ev, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", fontSize: "12px", padding: "2px 0", color: "var(--txt3)" }}>
              <span>{ev.time}</span>
              <span style={{ color: ev.status === "stolen" ? "var(--red)" : "var(--green)", fontWeight: 700 }}>
                {ev.status === "stolen" ? "⚔️ Stole" : "✅ Captured"}
              </span>
              <span style={{ fontFamily: "monospace", color: "var(--txt3)" }}>{ev.tileId.slice(-8)}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Start / Stop Button ── */}
      <button
        id="start-stop-run-btn"
        onClick={isRunning ? stopRun : startRun}
        disabled={!currentUser}
        style={{
          width: "100%", padding: "16px", border: "none",
          borderRadius: "var(--r-md)", cursor: currentUser ? "pointer" : "not-allowed",
          fontWeight: 900, fontSize: "17px", letterSpacing: "-.01em",
          color: "white", transition: "all .2s ease",
          opacity: currentUser ? 1 : 0.5,
          background: isRunning
            ? "linear-gradient(135deg,#EF4444,#DC2626)"
            : "linear-gradient(135deg,#6366F1,#4F46E5)",
          boxShadow: isRunning
            ? "0 8px 24px rgba(239,68,68,.35)"
            : "0 8px 24px rgba(99,102,241,.35)",
          fontFamily: "var(--font)",
        }}
        onPointerDown={e => { if (currentUser) e.currentTarget.style.transform = "scale(.97)"; }}
        onPointerUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
        onPointerLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {!currentUser
          ? "⏳ Setting up…"
          : isRunning
            ? "⏹  Stop Run"
            : "▶  Start Live Run"}
      </button>

      {/* ── GPS help ── */}
      {gpsStatus === "waiting" && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--txt3)", margin: 0 }}>
          📡 Allow location access when your browser asks to see your position on the map.
        </p>
      )}
      {gpsStatus === "error" && (
        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--red)", margin: 0 }}>
          ⚠️ GPS unavailable. Enable location in browser settings, then reload the page.
        </p>
      )}
    </div>
  );
}
