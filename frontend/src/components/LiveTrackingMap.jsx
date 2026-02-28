/**
 * LiveTrackingMap.jsx
 *
 * Real-time territory capture component.
 * Uses navigator.geolocation.watchPosition for GPS,
 * H3 at resolution 10 for tile mapping,
 * and REST polling (no WebSockets) for world state.
 */
import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import { latLngToCell, cellToBoundary } from "h3-js";
import "maplibre-gl/dist/maplibre-gl.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const H3_RES = 10;

// Assign a stable color per userId (so each runner has a different color)
const USER_COLORS = [
    "#3B82F6", // blue
    "#EF4444", // red
    "#10B981", // green
    "#F59E0B", // amber
    "#8B5CF6", // violet
    "#EC4899", // pink
    "#14B8A6", // teal
    "#F97316", // orange
];
function colorForUser(userId, currentUserId) {
    if (userId === currentUserId) return "#6366F1"; // indigo = YOU
    return USER_COLORS[userId % USER_COLORS.length];
}

export default function LiveTrackingMap({ currentUser, onRunEnd }) {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const watchIdRef = useRef(null);
    const wakeLockRef = useRef(null);
    const pollTimerRef = useRef(null);

    // Track state across GPS callbacks without re-renders
    const runStateRef = useRef({
        isRunning: false,
        runId: null,
        prevLat: null,
        prevLng: null,
        prevTime: null,
        lastTileId: null,    // avoid re-capturing the same tile consecutively
        capturedSet: new Set(), // tiles captured this run (for stats)
    });

    // React UI state
    const [isRunning, setIsRunning] = useState(false);
    const [isMapReady, setIsMapReady] = useState(false);
    const [runId, setRunId] = useState(null);
    const [stats, setStats] = useState({ tiles: 0, distanceM: 0, events: [] });
    const [gpsStatus, setGpsStatus] = useState("waiting"); // waiting | ok | error
    const [worldTiles, setWorldTiles] = useState([]);

    // ─── 1. INIT MAP ───────────────────────────────────────────────────────────
    useEffect(() => {
        const key = import.meta.env.VITE_MAPTILER_KEY;
        if (!key) { console.error("Missing VITE_MAPTILER_KEY"); return; }

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
            center: [73.8567, 18.5204],
            zoom: 15,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");

        // Locate me button
        map.addControl(
            new maplibregl.GeolocateControl({
                positionOptions: { enableHighAccuracy: true },
                trackUserLocation: false,
                showAccuracyCircle: false,
            }),
            "top-right"
        );

        map.on("load", () => {
            mapRef.current = map;
            setIsMapReady(true);
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    // ─── 2. PAINT WORLD TILES ON MAP ───────────────────────────────────────────
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isMapReady) return;

        const features = worldTiles.map(t => {
            const boundary = cellToBoundary(t.tileId, true);
            boundary.push(boundary[0]);
            return {
                type: "Feature",
                properties: {
                    tileId: t.tileId,
                    userId: t.userId,
                    ownerName: t.ownerName,
                    color: colorForUser(t.userId, currentUser?.id),
                    isMe: t.userId === currentUser?.id,
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
                id: "world-tiles-fill",
                type: "fill",
                source: "world-tiles",
                paint: {
                    "fill-color": ["get", "color"],
                    "fill-opacity": 0.45,
                },
            });

            map.addLayer({
                id: "world-tiles-border",
                type: "line",
                source: "world-tiles",
                paint: {
                    "line-color": ["get", "color"],
                    "line-width": 1.5,
                    "line-opacity": 0.8,
                },
            });

            // Tap on a tile to see owner
            map.on("click", "world-tiles-fill", e => {
                const props = e.features[0].properties;
                new maplibregl.Popup({ closeButton: false, closeOnClick: true })
                    .setLngLat(e.lngLat)
                    .setHTML(
                        `<div style="padding:8px;min-width:120px">
               <b style="font-size:13px">${props.isMe ? "🏆 Your tile" : `👤 ${props.ownerName}`}</b>
             </div>`
                    )
                    .addTo(map);
            });
        }
    }, [isMapReady, worldTiles, currentUser]);

    // ─── 3. POLL WORLD TILES ───────────────────────────────────────────────────
    const fetchWorldTiles = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/live/world-tiles`);
            const data = await res.json();
            if (Array.isArray(data)) setWorldTiles(data);
        } catch (err) {
            console.warn("[LIVE] world-tiles poll failed:", err.message);
        }
    }, []);

    // Poll continuously (but slower when not running)
    useEffect(() => {
        fetchWorldTiles(); // initial load
        const interval = isRunning ? 5000 : 30000;
        pollTimerRef.current = setInterval(fetchWorldTiles, interval);
        return () => clearInterval(pollTimerRef.current);
    }, [isRunning, fetchWorldTiles]);

    // ─── 4. GPS POSITION HANDLER ───────────────────────────────────────────────
    const handlePosition = useCallback(async (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const now = Date.now();
        const rs = runStateRef.current;

        setGpsStatus("ok");

        // Move map to follow user
        if (mapRef.current) {
            mapRef.current.easeTo({ center: [lng, lat], zoom: 16, duration: 500 });

            // Update/create user marker
            if (!rs.userMarker) {
                const el = document.createElement("div");
                el.style.cssText = `
          width: 18px; height: 18px; border-radius: 50%;
          background: #6366F1; border: 3px solid white;
          box-shadow: 0 0 0 4px rgba(99,102,241,0.3);
        `;
                rs.userMarker = new maplibregl.Marker({ element: el })
                    .setLngLat([lng, lat])
                    .addTo(mapRef.current);
            } else {
                rs.userMarker.setLngLat([lng, lat]);
            }
        }

        if (!rs.isRunning) return;

        // Compute H3 tile
        const tileId = latLngToCell(lat, lng, H3_RES);
        if (tileId === rs.lastTileId) return; // same tile, nothing to do
        rs.lastTileId = tileId;

        // Build capture request body
        const body = {
            runId: rs.runId,
            lat,
            lng,
            prevLat: rs.prevLat,
            prevLng: rs.prevLng,
            elapsedMs: rs.prevTime ? now - rs.prevTime : null,
        };

        try {
            const res = await fetch(`${API_URL}/live/capture-tile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": String(currentUser.id),
                },
                body: JSON.stringify(body),
            });
            const data = await res.json();

            if (data.status === "speed_violation") {
                console.warn("[LIVE] Speed violation — tile not captured");
            } else if (data.status === "captured" || data.status === "stolen") {
                rs.capturedSet.add(tileId);
                setStats(prev => ({
                    ...prev,
                    tiles: rs.capturedSet.size,
                    events: [
                        { status: data.status, tileId, time: new Date().toLocaleTimeString() },
                        ...prev.events.slice(0, 9),
                    ],
                }));
                fetchWorldTiles(); // instant refresh after capture
            }
        } catch (err) {
            console.error("[LIVE] capture-tile error:", err.message);
        }

        // Update distance counter
        if (rs.prevLat != null) {
            const dLat = (lat - rs.prevLat) * Math.PI / 180;
            const dLng = (lng - rs.prevLng) * Math.PI / 180;
            const a = Math.sin(dLat / 2) ** 2
                + Math.cos(rs.prevLat * Math.PI / 180)
                * Math.cos(lat * Math.PI / 180)
                * Math.sin(dLng / 2) ** 2;
            const dist = 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            setStats(prev => ({ ...prev, distanceM: Math.round(prev.distanceM + dist) }));
        }

        rs.prevLat = lat;
        rs.prevLng = lng;
        rs.prevTime = now;
    }, [currentUser, fetchWorldTiles]);

    // ─── 5. START / STOP RUN ───────────────────────────────────────────────────
    async function startRun() {
        if (!currentUser) return;

        try {
            const res = await fetch(`${API_URL}/live/start-run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": String(currentUser.id),
                },
                body: JSON.stringify({}),
            });
            const data = await res.json();
            if (data.error) { alert("Could not start run: " + data.error); return; }

            const rs = runStateRef.current;
            rs.isRunning = true;
            rs.runId = data.runId;
            rs.prevLat = null;
            rs.prevLng = null;
            rs.prevTime = null;
            rs.lastTileId = null;
            rs.capturedSet = new Set();

            setRunId(data.runId);
            setIsRunning(true);
            setStats({ tiles: 0, distanceM: 0, events: [] });

            // Acquire Wake Lock — keeps GPS alive on Android
            if ("wakeLock" in navigator) {
                try {
                    wakeLockRef.current = await navigator.wakeLock.request("screen");
                    console.log("[LIVE] Wake lock acquired");
                } catch (e) {
                    console.warn("[LIVE] Wake lock denied:", e.message);
                }
            }

            // Start GPS watch
            watchIdRef.current = navigator.geolocation.watchPosition(
                handlePosition,
                (err) => {
                    console.error("[GPS] Error:", err.message);
                    setGpsStatus("error");
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 10000,
                }
            );

        } catch (err) {
            alert("Network error. Make sure backend is reachable.");
            console.error("[LIVE] startRun error:", err);
        }
    }

    async function stopRun() {
        const rs = runStateRef.current;
        rs.isRunning = false;

        // Stop GPS
        if (watchIdRef.current != null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        // Release wake lock
        if (wakeLockRef.current) {
            await wakeLockRef.current.release();
            wakeLockRef.current = null;
        }

        setIsRunning(false);
        setGpsStatus("waiting");

        // Call end-run
        try {
            const res = await fetch(`${API_URL}/live/end-run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-user-id": String(currentUser.id),
                },
                body: JSON.stringify({ runId: rs.runId }),
            });
            const data = await res.json();
            if (onRunEnd) onRunEnd(data);
        } catch (err) {
            console.error("[LIVE] end-run error:", err);
        }
    }

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (watchIdRef.current != null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
            wakeLockRef.current?.release();
            clearInterval(pollTimerRef.current);
        };
    }, []);

    // ─── 6. RENDER ─────────────────────────────────────────────────────────────
    return (
        <div className="relative w-full flex flex-col gap-3">

            {/* Map */}
            <div className="relative w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <div ref={containerRef} className="w-full h-full" />

                {/* GPS status badge */}
                <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5
          ${gpsStatus === "ok" ? "bg-emerald-500 text-white"
                        : gpsStatus === "error" ? "bg-red-500 text-white"
                            : "bg-gray-800 text-gray-300"}`}>
                    <span className={`w-2 h-2 rounded-full ${gpsStatus === "ok" ? "bg-white animate-pulse" : "bg-gray-400"}`} />
                    {gpsStatus === "ok" ? "GPS Active" : gpsStatus === "error" ? "GPS Error" : "Waiting for GPS…"}
                </div>

                {/* Loading overlay */}
                {!isMapReady && (
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            <p className="text-white font-bold text-sm">Loading Map…</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats bar (visible while running) */}
            {isRunning && (
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-indigo-50 rounded-2xl px-4 py-3">
                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Tiles Captured</p>
                        <p className="text-3xl font-black text-indigo-700">{stats.tiles}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl px-4 py-3">
                        <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Distance</p>
                        <p className="text-3xl font-black text-emerald-700">
                            {stats.distanceM >= 1000
                                ? `${(stats.distanceM / 1000).toFixed(2)} km`
                                : `${stats.distanceM} m`}
                        </p>
                    </div>
                </div>
            )}

            {/* Live event feed */}
            {isRunning && stats.events.length > 0 && (
                <div className="bg-gray-900 rounded-2xl p-3 max-h-32 overflow-y-auto">
                    {stats.events.map((ev, i) => (
                        <div key={i} className="text-xs text-gray-300 flex gap-2 py-0.5">
                            <span className="text-gray-500">{ev.time}</span>
                            <span className={ev.status === "stolen" ? "text-red-400" : "text-emerald-400"}>
                                {ev.status === "stolen" ? "⚔️ Stole" : "✅ Captured"}
                            </span>
                            <span className="text-gray-500 truncate font-mono">{ev.tileId.slice(-8)}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Start / Stop button */}
            {currentUser && (
                <button
                    onClick={isRunning ? stopRun : startRun}
                    className={`w-full py-4 rounded-2xl font-black text-lg tracking-tight transition-all shadow-lg active:scale-95 ${isRunning
                            ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30"
                        }`}
                >
                    {isRunning ? "⏹  Stop Run" : "▶  Start Live Run"}
                </button>
            )}

            {!currentUser && (
                <p className="text-center text-sm text-gray-400 font-medium py-2">
                    Connect Strava to use Live Tracking
                </p>
            )}
        </div>
    );
}
