import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { cellToBoundary } from "h3-js";
import polyline from "@mapbox/polyline";
import "maplibre-gl/dist/maplibre-gl.css";

export default function TerritoryMap({
  currentTiles = [],
  historyTiles = [],
  routes = [],
}) {
  const mapRef       = useRef(null);
  const containerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const key = import.meta.env.VITE_MAPTILER_KEY;
    if (!key) {
      console.error("[TerritoryMap] Missing VITE_MAPTILER_KEY");
      return;
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: isDark
        ? `https://api.maptiler.com/maps/streets-v2-dark/style.json?key=${key}`
        : `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
      center: [73.8567, 18.5204],
      zoom: 11,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      mapRef.current = map;
      setIsMapReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function h3TilesToGeoJSON(tileIds) {
    const features = tileIds.map((tileId) => {
      const boundary = cellToBoundary(tileId, true);
      boundary.push(boundary[0]);
      return {
        type: "Feature",
        properties: { tileId },
        geometry: { type: "Polygon", coordinates: [boundary] },
      };
    });
    return { type: "FeatureCollection", features };
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    // Cleanup
    const layers  = ["history-fill","history-border","current-fill","current-border","route-glow","route-core"];
    const sources = ["history-source","current-source","route-source"];
    layers.forEach(l  => { if (map.getLayer(l))   map.removeLayer(l); });
    sources.forEach(s => { if (map.getSource(s))  map.removeSource(s); });

    const bounds = new maplibregl.LngLatBounds();
    let hasData = false;

    // History tiles (faded)
    if (historyTiles?.length) {
      const geo = h3TilesToGeoJSON(historyTiles);
      map.addSource("history-source", { type: "geojson", data: geo });
      map.addLayer({ id: "history-fill", type: "fill", source: "history-source",
        paint: { "fill-color": "#9CA3AF", "fill-opacity": 0.12 } });
      map.addLayer({ id: "history-border", type: "line", source: "history-source",
        paint: { "line-width": 1, "line-color": "#6B7280", "line-opacity": 0.3 } });
      geo.features.forEach(f => f.geometry.coordinates[0].forEach(c => { bounds.extend(c); hasData = true; }));
    }

    // Current tiles (prominent indigo)
    if (currentTiles?.length) {
      const geo = h3TilesToGeoJSON(currentTiles);
      map.addSource("current-source", { type: "geojson", data: geo });
      map.addLayer({ id: "current-fill", type: "fill", source: "current-source",
        paint: { "fill-color": "#6366F1", "fill-opacity": 0.35 } });
      map.addLayer({ id: "current-border", type: "line", source: "current-source",
        paint: { "line-width": 1.5, "line-color": "#4F46E5", "line-opacity": 0.8 } });
      geo.features.forEach(f => f.geometry.coordinates[0].forEach(c => { bounds.extend(c); hasData = true; }));
    }

    // Routes
    const routeFeatures = [];
    for (const r of routes || []) {
      if (r.polyline) {
        const decoded = polyline.decode(r.polyline).map(([lat, lng]) => [lng, lat]);
        routeFeatures.push({
          type: "Feature",
          properties: { name: r.name, distance: r.distance, date: r.date },
          geometry: { type: "LineString", coordinates: decoded },
        });
      }
    }

    if (routeFeatures.length > 0) {
      map.addSource("route-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: routeFeatures },
      });
      map.addLayer({
        id: "route-glow", type: "line", source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ffffff", "line-width": 8, "line-opacity": 0.7 },
      });
      map.addLayer({
        id: "route-core", type: "line", source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#f97316", "line-width": 2.5 },
      });
      routeFeatures.forEach(f => f.geometry.coordinates.forEach(c => { bounds.extend(c); hasData = true; }));

      map.on("click", "route-glow", (e) => {
        const props = e.features[0].properties;
        const distKm = props.distance ? (props.distance / 1000).toFixed(2) : "0.00";
        const dateStr = props.date ? new Date(props.date).toLocaleDateString() : "?";
        new maplibregl.Popup({ closeButton: false, closeOnClick: true })
          .setLngLat(e.lngLat)
          .setHTML(`<div style="font-family:Inter,sans-serif"><b style="font-size:13px">${props.name || "Run"}</b><br/><span style="font-size:12px;color:var(--txt3)">📏 ${distKm} km &nbsp;📅 ${dateStr}</span></div>`)
          .addTo(map);
      });
      map.on("mouseenter", "route-glow", () => { map.getCanvas().style.cursor = "pointer"; });
      map.on("mouseleave", "route-glow", () => { map.getCanvas().style.cursor = ""; });
    }

    if (hasData) {
      map.fitBounds(bounds, { padding: 80, duration: 1800, maxZoom: 15 });
    }
  }, [isMapReady, currentTiles, historyTiles, routes]);

  return (
    <div style={{
      position: "relative", width: "100%", height: "500px",
      borderRadius: "20px 20px 0 0", overflow: "hidden",
    }}>
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {!isMapReady && (
        <div style={{
          position: "absolute", inset: 0,
          background: "var(--bg2)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px",
        }}>
          <span className="spinner spinner-lg" />
          <p style={{ color: "var(--txt2)", fontWeight: 700, fontSize: "14px" }}>Loading Map…</p>
        </div>
      )}
    </div>
  );
}
