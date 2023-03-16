import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapContainer } from "../contexts/MapContainerContext";

// Define default values for the map
const defaultLatitude = 39.8283;
const defaultLongitude = -98.5795;
const defaultZoomLevel = 4;

const PropertyMap = ({ propertyList = [], onPropertySelect }) => {
  const { mapContainer } = useMapContainer();

  useEffect(() => {
    if (!mapContainer || propertyList.length === 0) return;

    const map = L.map(mapContainer).setView(
      [defaultLatitude, defaultLongitude],
      defaultZoomLevel
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    propertyList.forEach((property) => {
      const marker = L.marker([property.latitude, property.longitude]).addTo(
        map
      );
      marker.on("click", () => {
        onPropertySelect(property);
      });
    });
  }, [mapContainer, propertyList, onPropertySelect]);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "600px" }}
      ref={mapContainer}
    ></div>
  );
};

export default PropertyMap;
