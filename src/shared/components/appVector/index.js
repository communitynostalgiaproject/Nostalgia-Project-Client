import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import experiencesRequest from '../../../api/experiences.request';
import ReactionBar from '../../../pages/landingPage/reactionBar.tsx';

import useStyles from './styles';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import LeafletTileLayer from './leafletTileLayer';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const AppVector = ({
  experiences,
  location,
  setLocation,
  zoom,
  setZoom,
  setBbox,
  setSelectedExperience
}) => {  
  const classes = useStyles()

  const updateBbox = (bounds) => { 
    setBbox(bounds.toBBoxString());
  };

  const updateLocation = (center) => {
    const { lat, lng } = center;
    setLocation([lat, lng]);
  };

  const updateZoom = (zoomLevel) => {
    setZoom(zoomLevel);
  };

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      map.setView(location, zoom);
    }, [map, location, zoom]);

    useMapEvents({
      zoomend: () => {
        updateZoom(map.getZoom());  
        updateBbox(map.getBounds());
      },
      moveend: () => {
        updateLocation(map.getCenter());
        updateBbox(map.getBounds());
      }
    });
  };

  return (
    <div className="App">
      <MapContainer
        className={classes.fullScreenMap}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}
        whenCreated={(map) => {
          updateBbox(map.getBounds());
        }}
      >
        <LeafletTileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"

        />
        <MarkerClusterGroup>
          {experiences && experiences.map((experience, index) => (
            <Marker
              key={experience['_id']}
              position={[experience.place.location.coordinates[1], experience.place.location.coordinates[0]]}
            >
              <Popup>
                <ReactionBar {...experience}/>
              </Popup>
            </Marker>
            ))}
        </MarkerClusterGroup>
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default AppVector;
