import React from "react";
import { createContext, useContext, useRef } from "react";

const MapContainerContext = createContext();

export const useMapContainer = () => {
  return useContext(MapContainerContext);
};

export const MapContainerProvider = ({ children }) => {
  const mapContainer = useRef(null);

  return (
    <MapContainerContext.Provider value={{ mapContainer }}>
      {children}
    </MapContainerContext.Provider>
  );
};
