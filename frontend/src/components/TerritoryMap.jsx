import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { cellToBoundary } from "h3-js";
import polyline from "@mapbox/polyline";
import "maplibre-gl/dist/maplibre-gl.css";

export default function TerritoryMap({ tiles = [], routes = [] }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // 1. Initialize Map
  useEffect(() => {
    const key = import.meta.env.VITE_MAPTILER_KEY;
    if (!key) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
      center: [73.8567, 18.5204],
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      console.log("🗺️ Map Ready Signal Received");
      mapRef.current = map;
      setIsMapReady(true); // This triggers the data rendering effect
    });

    return () => map.remove();
  }, []);

  // 2. Responsive Data Painter
  useEffect(() => {
    // Only run if map is ready AND we have a ref
    if (!isMapReady || !mapRef.current) return;

    const map = mapRef.current;

    console.log("🎨 Triggering Map Paint", {
      tiles: tiles.length,
      routes: routes.length,
    });

    // --- TILES ---
    if (map.getSource("tiles-source")) {
      map.removeLayer("tiles-fill");
      map.removeLayer("tiles-border");
      map.removeSource("tiles-source");
    }

    if (tiles.length > 0) {
      const tileFeatures = tiles.map((id) => ({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            cellToBoundary(id, true).concat([cellToBoundary(id, true)[0]]),
          ],
        },
      }));

      map.addSource("tiles-source", {
        type: "geojson",
        data: { type: "FeatureCollection", features: tileFeatures },
      });
      map.addLayer({
        id: "tiles-fill",
        type: "fill",
        source: "tiles-source",
        paint: { "fill-color": "#3b82f6", "fill-opacity": 0.25 },
      });
      map.addLayer({
        id: "tiles-border",
        type: "line",
        source: "tiles-source",
        paint: { "line-color": "#2563eb", "line-width": 1.5 },
      });
    }

    // --- ROUTES ---
    if (map.getSource("routes-source")) {
      map.removeLayer("routes-outer");
      map.removeLayer("routes-inner");
      map.removeSource("routes-source");
    }

    if (routes.length > 0) {
      const routeFeatures = routes
        .filter((r) => r.polyline)
        .map((r) => {
          const coords = polyline
            .decode(r.polyline)
            .map(([lat, lng]) => [lng, lat]);
          return {
            type: "Feature",
            geometry: { type: "LineString", coordinates: coords },
          };
        });

      if (routeFeatures.length > 0) {
        map.addSource("routes-source", {
          type: "geojson",
          data: { type: "FeatureCollection", features: routeFeatures },
        });

        map.addLayer({
          id: "routes-outer",
          type: "line",
          source: "routes-source",
          paint: {
            "line-color": "#ffffff",
            "line-width": 6,
            "line-opacity": 0.8,
          },
        });

        map.addLayer({
          id: "routes-inner",
          type: "line",
          source: "routes-source",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#ef4444",
            "line-width": 3,
            "line-opacity": 1.0,
          },
        });

        // Smart Zoom
        const bounds = new maplibregl.LngLatBounds();
        routeFeatures.forEach((f) =>
          f.geometry.coordinates.forEach((c) => bounds.extend(c))
        );
        map.fitBounds(bounds, { padding: 100, duration: 1500 });
      }
    }
  }, [isMapReady, tiles, routes]); // Listens to both map readiness and data changes

  return (
    <div className="relative w-full h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-100 group">
      <div ref={mapContainerRef} className="w-full h-full" />

      {!isMapReady && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">
              Loading Map Satellites...
            </p>
          </div>
        </div>
      )}

      {isMapReady && tiles.length === 0 && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none transition-all group-hover:top-8">
          <div className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/50">
            <p className="text-gray-800 text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Ready for Capture
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
