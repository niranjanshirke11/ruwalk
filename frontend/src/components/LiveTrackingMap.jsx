/**
 * LiveTrackingMap.jsx  – v3 (all issues fixed)
 *
 * KEY FIXES vs original v1:
 *  ✅ GPS watchPosition starts immediately when map is ready (green dot appears
 *     WITHOUT pressing "Start Run" — no more needing to reload)
 *  ✅ Map auto-flies to your real GPS location on first fix
 *  ✅ Tile capture only happens while rs.isRunning=true (safe to walk freely)
 *  ✅ Pulsing green dot marker always visible while GPS is active
 *  ✅ LIVE badge in top-right while run is in progress
 *  ✅ colorForUser uses a stable string hash (works for any userId value)
 *  ✅ fetchWorldTiles + currentUser stored in refs so GPS callback never has
 *     stale closures; GPS watch is never restarted mid-run
 *  ✅ "Your tiles" shown in indigo on the map — other users in distinct colors
 */

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { latLngToCell, cellToBoundary } from "h3-js";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const H3_RES = 10;

// ─── stable color per user ───────────────────────────────────────────────────
const PALETTE = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B",
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

// ─── inject pulsing-ring keyframes once ──────────────────────────────────────
if (!document.getElementById("ruwalk-gps-css")) {
    const s = document.createElement("style");
    s.id = "ruwalk-gps-css";
    s.textContent = `
    @keyframes rwPulse {
      0%  { transform:scale(1);   opacity:.9; }
      70% { transform:scale(2.5); opacity:0;  }
      100%{ transform:scale(2.5); opacity:0;  }
    }
    .rw-ring { position:absolute; inset:-7px; border-radius:50%;
               background:rgba(99,102,241,.35);
               animation:rwPulse 1.8s ease-out infinite; }
    .rw-ring-red { background:rgba(239,68,68,.35); }
    @keyframes rwSpin { to { transform:rotate(360deg); } }
  `;
    document.head.appendChild(s);
}

// =============================================================================
export default function LiveTrackingMap({ currentUser, onRunEnd }) {

    // ── DOM / map refs ─────────────────────────────────────────────────────────
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const watchIdRef = useRef(null);
    const wakeLockRef = useRef(null);
    const pollRef = useRef(null);

    // ── mutable run-state (NO re-renders) ──────────────────────────────────────
    const rs = useRef({
        isRunning: false,
        runId: null,
        prevLat: null,
        prevLng: null,
        prevTime: null,
        lastTileId: null,
        capturedSet: new Set(),
        userMarker: null,
        hasCentered: false,   // has the map ever flown to the user's location?
    });

    // Keep a ref to the latest currentUser so GPS callbacks never go stale
    const currentUserRef = useRef(currentUser);
    useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

    // Keep a ref to the latest fetchWorldTiles
    const fetchRef = useRef(null);

    // ── React UI state ─────────────────────────────────────────────────────────
    const [isRunning, setIsRunning] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [gpsStatus, setGpsStatus] = useState("waiting"); // waiting | ok | error
    const [worldTiles, setWorldTiles] = useState([]);
    const [stats, setStats] = useState({ tiles: 0, distanceM: 0, events: [] });

    // ══════════════════════════════════════════════════════════════════════════
    // 1. INIT MAP
    // ══════════════════════════════════════════════════════════════════════════
    useEffect(() => {
        const key = import.meta.env.VITE_MAPTILER_KEY;
        if (!key) { console.error("[MAP] Missing VITE_MAPTILER_KEY"); return; }

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
            center: [73.8567, 18.5204],  // fallback center (Pune); overridden on first GPS fix
            zoom: 14,
            attributionControl: false,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");

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
                    color: colorForUser(t.userId, myId),
                    isMe: String(t.userId) === String(myId),
                    name: t.ownerName,
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
                paint: { "fill-color": ["get", "color"], "fill-opacity": 0.4 },
            });
            map.addLayer({
                id: "tiles-line", type: "line", source: "world-tiles",
                paint: { "line-color": ["get", "color"], "line-width": 1.5, "line-opacity": 0.85 },
            });

            map.on("click", "tiles-fill", e => {
                const p = e.features[0].properties;
                new maplibregl.Popup({ closeButton: false, closeOnClick: true })
                    .setLngLat(e.lngLat)
                    .setHTML(`<div style="padding:8px"><b>${p.isMe ? "🏆 Your tile" : `👤 ${p.name}`}</b></div>`)
                    .addTo(map);
            });
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

    // Store in ref so GPS callback can call it without stale closure
    useEffect(() => { fetchRef.current = fetchWorldTiles; });

    // Start/restart poll when running state changes
    useEffect(() => {
        fetchWorldTiles();                        // immediate fetch on mount / change
        const ms = isRunning ? 5_000 : 30_000;
        clearInterval(pollRef.current);
        pollRef.current = setInterval(() => fetchRef.current?.(), ms);
        return () => clearInterval(pollRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning]);


    // ══════════════════════════════════════════════════════════════════════════
    // 4. GPS POSITION HANDLER (stored in ref — never recreated)
    // ══════════════════════════════════════════════════════════════════════════
    const onPosition = useRef(async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const now = Date.now();
        const state = rs.current;
        const map = mapRef.current;

        setGpsStatus("ok");

        // ─── Move / create the user marker ──────────────────────────────────
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
          box-shadow:0 0 0 2px rgba(99,102,241,.4);
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

            // Fly to real location on VERY FIRST GPS fix
            if (!state.hasCentered) {
                state.hasCentered = true;
                map.flyTo({ center: [lng, lat], zoom: 17, duration: 1500 });
            } else if (state.isRunning) {
                // Keep map centered on the runner
                map.easeTo({ center: [lng, lat], zoom: 17, duration: 300 });
            }
        }

        // ─── Tile capture — only while running ──────────────────────────────
        if (!state.isRunning) return;

        // ─── Haversine distance counter ──────────────────────────────────────
        // Calculate distance FIRST, even if we haven't crossed a tile boundary
        if (state.prevLat != null) {
            const dLat = (lat - state.prevLat) * Math.PI / 180;
            const dLng = (lng - state.prevLng) * Math.PI / 180;
            const a = Math.sin(dLat / 2) ** 2
                + Math.cos(state.prevLat * Math.PI / 180)
                * Math.cos(lat * Math.PI / 180)
                * Math.sin(dLng / 2) ** 2;
            const d = 6_371_000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            // Only update UI distance if we moved a reasonable amount (e.g. at least 1 meter)
            if (d > 1) {
                setStats(prev => ({ ...prev, distanceM: Math.round(prev.distanceM + d) }));
            }
        }

        // Cache previous values for API payload BEFORE overwriting them
        const pLat = state.prevLat;
        const pLng = state.prevLng;
        const pTime = state.prevTime;

        // Overwrite prev tracking values to current immediately for the next tick
        state.prevLat = lat;
        state.prevLng = lng;
        state.prevTime = now;

        const tileId = latLngToCell(lat, lng, H3_RES);
        if (tileId === state.lastTileId) return;   // same hex, skip
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
                fetchRef.current?.();   // instant world-tile refresh
            }
        } catch (err) {
            console.error("[LIVE] capture-tile error:", err.message);
        }
    });


    // ══════════════════════════════════════════════════════════════════════════
    // 5. START GPS IMMEDIATELY WHEN MAP IS READY
    //    (warms up GPS chip; green dot appears without pressing Start)
    // ══════════════════════════════════════════════════════════════════════════
    useEffect(() => {
        if (!isMapReady) return;
        if (!navigator.geolocation) { setGpsStatus("error"); return; }

        const onErr = (err) => {
            console.error("[GPS]", err.code, err.message);
            setGpsStatus("error");
        };

        const opts = { enableHighAccuracy: true, maximumAge: 0, timeout: 5_000 };

        // Get a quick initial fix first
        navigator.geolocation.getCurrentPosition(
            (pos) => onPosition.current(pos),
            onErr,
            { enableHighAccuracy: true, timeout: 15_000, maximumAge: 5_000 }
        );

        // Instead of watchPosition, which stalls on some mobile browsers after a few seconds,
        // we use an aggressive polling loop to ensure constant dot updating and tracking.
        const id = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (pos) => onPosition.current(pos),
                (err) => console.warn("GPS poll slip:", err.message),
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
        if (!user) return;

        try {
            const res = await fetch(`${API_URL}/live/start-run`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "x-user-id": String(user.id) },
                body: JSON.stringify({}),
            });
            const data = await res.json();
            if (data.error) { alert("Could not start run: " + data.error); return; }

            const state = rs.current;
            state.isRunning = true;
            state.runId = data.runId;
            state.prevLat = null;
            state.prevLng = null;
            state.prevTime = null;
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
        if (watchIdRef.current != null) navigator.geolocation.clearWatch(watchIdRef.current);
        wakeLockRef.current?.release().catch(() => { });
        clearInterval(pollRef.current);
    }, []);


    // ══════════════════════════════════════════════════════════════════════════
    // 7. RENDER
    // ══════════════════════════════════════════════════════════════════════════
    const gpsBadgeColor = gpsStatus === "ok" ? "#10B981" : gpsStatus === "error" ? "#EF4444" : "#374151";
    const gpsBadgeLabel = gpsStatus === "ok" ? "📍 GPS Active" : gpsStatus === "error" ? "⚠ GPS Error" : "⏳ Locating…";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>

            {/* ── Map container ── */}
            <div style={{
                position: "relative", width: "100%", height: "480px",
                borderRadius: "24px", overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,.25)",
                border: "3px solid rgba(255,255,255,.8)",
            }}>
                <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

                {/* GPS badge */}
                <div style={{
                    position: "absolute", top: "12px", left: "12px", zIndex: 10,
                    padding: "5px 12px", borderRadius: "9999px", fontSize: "12px",
                    fontWeight: 700, display: "flex", alignItems: "center", gap: "7px",
                    background: gpsBadgeColor, color: "white",
                    boxShadow: `0 4px 14px ${gpsBadgeColor}66`,
                    transition: "background .3s",
                }}>
                    <span style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: "white", display: "inline-block",
                        animation: gpsStatus === "ok" ? "rwPulse 1.8s ease-out infinite" : "none",
                    }} />
                    {gpsBadgeLabel}
                </div>

                {/* LIVE badge */}
                {isRunning && (
                    <div style={{
                        position: "absolute", top: "12px", right: "54px", zIndex: 10,
                        padding: "5px 12px", borderRadius: "9999px", fontSize: "12px", fontWeight: 700,
                        background: "#EF4444", color: "white",
                        display: "flex", alignItems: "center", gap: "6px",
                        boxShadow: "0 4px 14px rgba(239,68,68,.45)",
                    }}>
                        <span style={{
                            width: "6px", height: "6px", borderRadius: "50%", background: "white",
                            animation: "rwPulse 1s ease-out infinite"
                        }} />
                        LIVE
                    </div>
                )}

                {/* Map loading overlay */}
                {!isMapReady && (
                    <div style={{
                        position: "absolute", inset: 0, background: "#111827",
                        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "14px",
                    }}>
                        <div style={{
                            width: "40px", height: "40px", border: "4px solid #6366F1",
                            borderTopColor: "transparent", borderRadius: "50%",
                            animation: "rwSpin .8s linear infinite",
                        }} />
                        <p style={{ color: "white", fontWeight: 700, fontSize: "14px", margin: 0 }}>Loading Map…</p>
                    </div>
                )}
            </div>

            {/* ── Stats bar (only while running) ── */}
            {isRunning && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div style={{ background: "#EEF2FF", borderRadius: "16px", padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#818CF8", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Tiles Captured</p>
                        <p style={{ margin: 0, fontSize: "36px", fontWeight: 900, color: "#4338CA", lineHeight: 1.1 }}>{stats.tiles}</p>
                    </div>
                    <div style={{ background: "#ECFDF5", borderRadius: "16px", padding: "12px 16px" }}>
                        <p style={{ margin: 0, fontSize: "11px", color: "#34D399", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Distance</p>
                        <p style={{ margin: 0, fontSize: "36px", fontWeight: 900, color: "#065F46", lineHeight: 1.1 }}>
                            {stats.distanceM >= 1000
                                ? `${(stats.distanceM / 1000).toFixed(2)} km`
                                : `${stats.distanceM} m`}
                        </p>
                    </div>
                </div>
            )}

            {/* ── Live event feed ── */}
            {isRunning && stats.events.length > 0 && (
                <div style={{ background: "#111827", borderRadius: "16px", padding: "12px", maxHeight: "120px", overflowY: "auto" }}>
                    {stats.events.map((ev, i) => (
                        <div key={i} style={{ display: "flex", gap: "8px", fontSize: "12px", color: "#D1D5DB", padding: "2px 0" }}>
                            <span style={{ color: "#6B7280" }}>{ev.time}</span>
                            <span style={{ color: ev.status === "stolen" ? "#F87171" : "#34D399" }}>
                                {ev.status === "stolen" ? "⚔️ Stole" : "✅ Captured"}
                            </span>
                            <span style={{ color: "#6B7280", fontFamily: "monospace" }}>{ev.tileId.slice(-8)}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Start / Stop button ── */}
            {currentUser ? (
                <button
                    onClick={isRunning ? stopRun : startRun}
                    style={{
                        width: "100%", padding: "16px", border: "none",
                        borderRadius: "16px", cursor: "pointer",
                        fontWeight: 900, fontSize: "18px", letterSpacing: "-.01em",
                        color: "white", transition: "all .15s ease",
                        background: isRunning
                            ? "linear-gradient(135deg,#EF4444,#DC2626)"
                            : "linear-gradient(135deg,#6366F1,#4F46E5)",
                        boxShadow: isRunning
                            ? "0 8px 24px rgba(239,68,68,.4)"
                            : "0 8px 24px rgba(99,102,241,.4)",
                    }}
                    onPointerDown={e => (e.currentTarget.style.transform = "scale(.97)")}
                    onPointerUp={e => (e.currentTarget.style.transform = "scale(1)")}
                    onPointerLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                    {isRunning ? "⏹  Stop Run" : "▶  Start Live Run"}
                </button>
            ) : (
                <p style={{ textAlign: "center", fontSize: "14px", color: "#9CA3AF", fontWeight: 500, padding: "8px 0", margin: 0 }}>
                    Connect Strava to use Live Tracking
                </p>
            )}

            {/* ── GPS help tips ── */}
            {gpsStatus === "waiting" && (
                <p style={{ textAlign: "center", fontSize: "12px", color: "#6B7280", margin: 0 }}>
                    📡 Allow location access when your browser asks to see your position on the map.
                </p>
            )}
            {gpsStatus === "error" && (
                <p style={{ textAlign: "center", fontSize: "12px", color: "#EF4444", margin: 0 }}>
                    ⚠️ GPS unavailable. Enable location in browser &amp; phone settings, then reload the page.
                </p>
            )}
        </div>
    );
}
