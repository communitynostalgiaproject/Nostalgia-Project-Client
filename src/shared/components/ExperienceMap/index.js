import React, { useEffect, useState } from 'react';
import ReactionBar from '../../../pages/landingPage/reactionBar.tsx/index.tsx';

import useStyles from './styles.tsx';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import LeafletTileLayer from './leafletTileLayer.tsx';
import chefHatIconImage from "../../../assets/chef-hat-icon.png";

const chefHatIcon = new L.Icon({
  iconUrl: chefHatIconImage,
  iconRetinaUrl: chefHatIconImage,
  iconAnchor: null,
  popupAnchor: L.point(0, 25),
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(50, 50),
  className: "experience-location-icon"
});

const ExperienceMap = ({
  experiences,
  defaultLocation,
  defaultZoom,
  userLocation,
  bbox,
  setBbox,
  setSelectedExperience
}) => {  
  const classes = useStyles()
  const [movedToUser, setMovedToUser] = useState(false);

  const updateBbox = (bounds) => { 
    setBbox(bounds.toBBoxString());
  };

  const boundsFromBboxString = (bboxString) => {
    const strValues = bboxString.split(",");
    const corner1 = [Number(strValues[1]), Number(strValues[0])];
    const corner2 = [Number(strValues[3]), Number(strValues[2])];
    return L.latLngBounds([corner1, corner2]);
  };

  const MapEvents = () => {
    const map = useMap();

    
    useEffect(() => {
      if (!bbox) {
        map.setView(defaultLocation, defaultZoom);
        updateBbox(map.getBounds());
      }
    }, [map, bbox]);

    // Move the map to the user's location once
    useEffect(() => {
      if (!userLocation || movedToUser) return;
      map.setView(userLocation, defaultZoom);
      updateBbox(map.getBounds());
      setMovedToUser(true);
    }, [map, userLocation]);

    useEffect(() => {
      if (!bbox) return;
      const bounds = boundsFromBboxString(bbox);
      map.fitBounds(bounds);
    }, [map, bbox]);

    useMapEvents({
      zoomend: () => {
        updateBbox(map.getBounds());
      },
      moveend: () => {
        updateBbox(map.getBounds());
      }
    });
  };

  return (
    <div
      className="App"
      data-testid="Map-Container"
    >
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
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"

        />
        <MarkerClusterGroup>
          {experiences && experiences.map((experience, index) => (
            <Marker
              key={experience['_id']}
              icon={chefHatIcon}
              position={[experience.place.location.coordinates[1], experience.place.location.coordinates[0]]}
            >
              <Popup>
                <ReactionBar
                  experience={experience}
                  setSelectedExperience={setSelectedExperience}
                />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default ExperienceMap;
