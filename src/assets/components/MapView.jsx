// src/assets/components/MapView.jsx
// Displays live Air Quality data across Kenya using Open-Meteo API (no key required)

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- Fix Leaflet marker icons for React/Vite builds ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView() {
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching of air quality data for multiple Kenya coordinates
        const coords = [
          { name: "Nairobi", lat: -1.2921, lon: 36.8219 },
          { name: "Mombasa", lat: -4.0435, lon: 39.6682 },
          { name: "Kisumu", lat: -0.0917, lon: 34.7679 },
          { name: "Eldoret", lat: 0.5204, lon: 35.2698 },
          { name: "Nakuru", lat: -0.3031, lon: 36.0800 },
          { name: "Thika", lat: -1.0396, lon: 37.0834 },
          { name: "Garissa", lat: -0.4569, lon: 39.6583 },
          { name: "Nakuru", lat: -0.3031, lon: 36.0800 },
          { name: "Ngong", lat: -1.3562118, lon: 36.6561}
    
        ];

        const allData = await Promise.all(
          coords.map(async (loc) => {
            const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${loc.lat}&longitude=${loc.lon}&hourly=pm2_5,pm10,carbon_monoxide`;
            const res = await fetch(url);
            const json = await res.json();

            // Extract latest data safely
            const lastIndex = json.hourly?.time?.length - 1;
            return {
              ...loc,
              pm25: json.hourly?.pm2_5?.[lastIndex] ?? "N/A",
              pm10: json.hourly?.pm10?.[lastIndex] ?? "N/A",
              co: json.hourly?.carbon_monoxide?.[lastIndex] ?? "N/A",
            };
          })
        );

        setDataPoints(allData);
      } catch (error) {
        console.error("Error fetching Open-Meteo data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4 text-gray-500">
        Loading live air quality data...
      </div>
    );
  }

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[-0.5, 37]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dataPoints.map((point, i) => (
          <Marker key={i} position={[point.lat, point.lon]}>
            <Popup>
              <strong>{point.name}</strong> <br />
              PM2.5: {point.pm25} µg/m³ <br />
               PM10: {point.pm10} µg/m³ <br />
               CO: {point.co} µg/m³
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
