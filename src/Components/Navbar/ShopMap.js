import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

const ShopMap = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWluaGR0cmFuMjgwMSIsImEiOiJja3ZnOTJqMWkyNnJtMzF0MmI3amNyMGoxIn0.pZUH560pDSoh1kHxSA7EAg";

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [151.692767, -32.900506],
      zoom: 14,
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right");
    const marker = new mapboxgl.Marker({ color: "red" });
    marker.setLngLat([151.692767, -32.900506]).addTo(map);
  }, []);

  return <div id="mapContainer" className="map-container"></div>;
};

export default ShopMap;
