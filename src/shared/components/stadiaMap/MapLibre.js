/*
    Documentation:

    StadiaMaps uses Leaflet
    https://docs.stadiamaps.com/tutorials/getting-started-with-react-leaflet/

    Leaflet uses LibreMaps & MapTiler to convert it's static map images to vector tiles
    https://docs.maptiler.com/react/maplibre-gl-js/how-to-use-maplibre-gl-js/
*/
import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import './mapLibre.css';

// Enable vector tiles in Leaflet
const MapLibre = () => {

    // Map container & obj
    const mapContainer = useRef(null);
    const map = useRef(null);

    // Map navigation functionality
    // map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    
    // Default longitude & latitude
    const [lng] = useState(0.1276);
    const [lat] = useState(51.5072);

    // Map markers
    // new maplibregl.Marker({color: "#D22B2B"})
    // .setLngLat([lng, lat])
    // .addTo(map.current);

    // Default zoom level
    const [zoom] = useState(25);

    // Auth use of MapTiler API
    const API_KEY = '';

    useEffect(() => {
        if (map.current) return; 
      
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
          center: [lng, lat],
          zoom: zoom
        });
      
    }, [API_KEY, lng, lat, zoom]);

    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
};

export default MapLibre;