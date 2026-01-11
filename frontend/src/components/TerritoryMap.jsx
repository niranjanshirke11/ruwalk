import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { cellToBoundary } from "h3-js";
import "maplibre-gl/dist/maplibre-gl.css";

export default function TerritoryMap({ tiles = [] }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const key = import.meta.env.VITE_MAPTILER_KEY;

    if (!key) {
      alert("Missing VITE_MAPTILER_KEY in frontend/.env");
      return;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${key}`,
      center: [73.8567, 18.5204], // Pune
      zoom: 11,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!tiles.length) return;

    const map = mapRef.current;

    // If already exists remove old layers/sources
    if (map.getLayer("tiles-fill")) map.removeLayer("tiles-fill");
    if (map.getLayer("tiles-border")) map.removeLayer("tiles-border");
    if (map.getSource("tiles-source")) map.removeSource("tiles-source");

    // Convert H3 tiles -> GeoJSON polygons
    const features = tiles.map((tileId) => {
      const boundary = cellToBoundary(tileId, true); // gives [lng, lat] for GeoJSON
      boundary.push(boundary[0]); // close polygon

      return {
        type: "Feature",
        properties: { tileId },
        geometry: {
          type: "Polygon",
          coordinates: [boundary],
        },
      };
    });

    const geojson = {
      type: "FeatureCollection",
      features,
    };

    map.addSource("tiles-source", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "tiles-fill",
      type: "fill",
      source: "tiles-source",
      paint: {
        "fill-opacity": 0.4,
      },
    });

    map.addLayer({
      id: "tiles-border",
      type: "line",
      source: "tiles-source",
      paint: {
        "line-width": 2,
      },
    });
  }, [tiles]);

  return (
    <div className="w-full h-[440px] rounded-2xl overflow-hidden shadow-lg bg-white">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
