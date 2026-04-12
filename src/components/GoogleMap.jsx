import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { asset } from "../config";

// Fix icône par défaut Leaflet (webpack/vite ne résout pas les assets automatiquement)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Marqueur personnalisé couleur primaire
const customIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 32px; height: 32px;
      background: #048162;
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(4,129,98,0.4);
    "></div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36],
});

const LAT = 33.589170953186944;
const LNG = -7.596696157143334;

const LeafletMap = () => {
  return (
    <MapContainer
      center={[LAT, LNG]}
      zoom={17}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%", minHeight: "288px" }}
      className="rounded-2xl z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <Marker position={[LAT, LNG]} icon={customIcon}>
        <Popup>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", minWidth: "140px" }}>
            <img src={asset("AmadalGreen.png")} alt="Amadal" style={{ height: "28px", width: "auto", objectFit: "contain" }} />
            <div style={{ fontSize: "11px", color: "#6b7280", textAlign: "center", lineHeight: "1.5" }}>
              121, rue Radi Slaoui, Belvédère<br />Casablanca
            </div>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
