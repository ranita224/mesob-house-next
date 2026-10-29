"use client";

import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 

const pin = (symbol, background) =>
  L.divIcon({
    className: "",
    html: `<div style="width:36px;height:36px;border-radius:50%;background:${background};color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5)">${symbol}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });

const courierIcon = pin("🛵", "#9b2c16");
const homeIcon = pin("🏠", "#1f4d3a");


function FitBoth({ points, fitKey }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 1) map.setView(points[0], 15);
    else map.fitBounds(points, { padding: [40, 40] });
  }, [map, fitKey]);
  return null;
}

export default function DeliveryMap({ courier, destination, address, courierName, distanceKm, fitKey }) {
  const points = courier ? [courier, destination] : [destination];

  return (
    <MapContainer
      center={destination} // [lat, lng]
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "320px", width: "100%", zIndex: 0 }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={destination} icon={homeIcon} title="Delivery address">
        <Popup>Delivery address: {address}</Popup>
      </Marker>

      {courier && (
        <>
          <Polyline positions={[courier, destination]} pathOptions={{ dashArray: "6 8", weight: 3 }} />
          <Marker position={courier} icon={courierIcon} title={`Courier ${courierName}`}>
            <Popup>
              {courierName} · courier{distanceKm != null ? ` · ${distanceKm} km away` : ""}
            </Popup>
          </Marker>
        </>
      )}

      <FitBoth points={points} fitKey={fitKey} />
    </MapContainer>
  );
}
