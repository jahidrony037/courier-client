import { useEffect, useState } from "react";

const RealTimeTracking = ({ parcelLocation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (parcelLocation && parcelLocation.lat && parcelLocation.lng) {
      setLocation(parcelLocation);
    }
  }, [parcelLocation]);

  if (!location) {
    return (
      <div
        style={{
          height: "400px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
        }}
      >
        <p>No location data available</p>
      </div>
    );
  }

  // Create Google Maps URL
  // eslint-disable-next-line no-unused-vars
  // const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.lat},${location.lng}&zoom=15`;

  // Create OpenStreetMap URL
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    location.lng - 0.01
  },${location.lat - 0.01},${location.lng + 0.01},${
    location.lat + 0.01
  }&layer=mapnik&marker=${location.lat},${location.lng}`;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <div
        style={{
          marginBottom: "10px",
          padding: "10px",
          backgroundColor: "#e8f5e8",
          border: "1px solid #4caf50",
          borderRadius: "4px",
        }}
      >
        <strong>📍 Parcel Location:</strong>
        <br />
        Latitude: {location.lat}
        <br />
        Longitude: {location.lng}
        <br />
        <div style={{ marginTop: "10px" }}>
          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1976d2",
              textDecoration: "none",
              marginRight: "15px",
            }}
          >
            🗺️ Open in Google Maps
          </a>
          <a
            href={`https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}&zoom=15`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            🌍 Open in OpenStreetMap
          </a>
        </div>
      </div>

      {/* Embedded map */}
      <iframe
        src={osmUrl}
        width="100%"
        height="350"
        style={{ border: "1px solid #ddd" }}
        title="Parcel Location Map"
      />
    </div>
  );
};

export default RealTimeTracking;
