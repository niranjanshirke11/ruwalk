import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { cellToBoundary } from "h3-js";
import polyline from "@mapbox/polyline";
import "maplibre-gl/dist/maplibre-gl.css";

export default function TerritoryMap({
  currentTiles = [],
  historyTiles = [],
  routes = [],
  onMapReady = () => {},
}) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    const key = import.meta.env.VITE_MAPTILER_KEY;
    if (!key) {
      alert("Missing VITE_MAPTILER_KEY");
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
      center: [73.8567, 18.5204],
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      console.log("🗺️ Map Initialization Complete");
      mapRef.current = map;
      setIsMapReady(true);
      onMapReady();
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Utility: convert H3 tileId -> polygon coordinates
  function h3TilesToGeoJSON(tileIds) {
    const features = tileIds.map((tileId) => {
      const boundary = cellToBoundary(tileId, true); // [lng,lat]
      boundary.push(boundary[0]); // close polygon
      return {
        type: "Feature",
        properties: { tileId },
        geometry: { type: "Polygon", coordinates: [boundary] },
      };
    });

    return { type: "FeatureCollection", features };
  }

  // Reactive Map Painting
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapReady) return;

    console.log("🎨 Painting Map Layers...", {
      current: currentTiles.length,
      history: historyTiles.length,
      routes: routes.length,
    });

    // --- 1. CLEANUP OLD LAYERS ---
    const layersToCleanup = [
      "history-fill",
      "history-border",
      "current-fill",
      "current-border",
      "route-glow",
      "route-core",
    ];
    const sourcesToCleanup = [
      "history-source",
      "current-source",
      "route-source",
    ];

    layersToCleanup.forEach((l) => {
      if (map.getLayer(l)) map.removeLayer(l);
    });
    sourcesToCleanup.forEach((s) => {
      if (map.getSource(s)) map.removeSource(s);
    });

    const bounds = new maplibregl.LngLatBounds();
    let hasData = false;

    // --- 2. DRAW HISTORY TILES (FADED GRAY) ---
    if (historyTiles?.length) {
      const historyGeo = h3TilesToGeoJSON(historyTiles);
      map.addSource("history-source", { type: "geojson", data: historyGeo });

      map.addLayer({
        id: "history-fill",
        type: "fill",
        source: "history-source",
        paint: { "fill-color": "#9CA3AF", "fill-opacity": 0.15 },
      });

      map.addLayer({
        id: "history-border",
        type: "line",
        source: "history-source",
        paint: {
          "line-width": 1,
          "line-color": "#6B7280",
          "line-opacity": 0.4,
        },
      });

      historyGeo.features.forEach((f) =>
        f.geometry.coordinates[0].forEach((c) => {
          bounds.extend(c);
          hasData = true;
        })
      );
    }

    // --- 3. DRAW CURRENT TILES (DARK/PROMINENT) ---
    if (currentTiles?.length) {
      const currentGeo = h3TilesToGeoJSON(currentTiles);
      map.addSource("current-source", { type: "geojson", data: currentGeo });

      map.addLayer({
        id: "current-fill",
        type: "fill",
        source: "current-source",
        paint: { "fill-color": "#111827", "fill-opacity": 0.4 },
      });

      map.addLayer({
        id: "current-border",
        type: "line",
        source: "current-source",
        paint: {
          "line-width": 2,
          "line-color": "#000000",
          "line-opacity": 0.7,
        },
      });

      currentGeo.features.forEach((f) =>
        f.geometry.coordinates[0].forEach((c) => {
          bounds.extend(c);
          hasData = true;
        })
      );
    }

    // --- 4. DRAW ROUTES (GLOW PATH) ---
    const routeFeatures = [];
    for (const r of routes || []) {
      if (r.polyline) {
        const decoded = polyline
          .decode(r.polyline)
          .map(([lat, lng]) => [lng, lat]);
        routeFeatures.push({
          type: "Feature",
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
        id: "route-glow",
        type: "line",
        source: "route-source",
        paint: {
          "line-color": "#ffffff",
          "line-width": 8,
          "line-opacity": 0.9,
        },
      });

      map.addLayer({
        id: "route-core",
        type: "line",
        source: "route-source",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ef4444", "line-width": 3 },
      });

      routeFeatures.forEach((f) =>
        f.geometry.coordinates.forEach((c) => {
          bounds.extend(c);
          hasData = true;
        })
      );
    }

    // --- 5. SMART ZOOM ---
    if (hasData) {
      map.fitBounds(bounds, { padding: 80, duration: 2000, maxZoom: 15 });
    }
  }, [isMapReady, currentTiles, historyTiles, routes]);

  return (
    <div className="relative w-full h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 group">
      <div ref={containerRef} className="w-full h-full" />

      {!isMapReady && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-[5px] border-black border-t-transparent rounded-full animate-spin" />
            <p className="text-black font-bold tracking-tighter text-lg">
              LOADING SATELLITE...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
