import React, { useEffect, useRef, useState } from 'react';
import ReactionBar from '../../../pages/landingPage/reactionBar';

import useStyles from './styles';

import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { latLng, LatLng, Icon, latLngBounds, LatLngBounds, point } from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import LeafletTileLayer from './leafletTileLayer';
import chefHatIconImage from "../../../assets/chef-hat-icon.png";
import { useLandingPageContext } from "../../../contexts/LandingPageContext";

const chefHatIcon = new Icon({
  iconUrl: chefHatIconImage,
  iconRetinaUrl: chefHatIconImage,
  iconAnchor: undefined,
  popupAnchor: point(0, 25),
  shadowUrl: undefined,
  shadowSize: undefined,
  shadowAnchor: undefined,
  iconSize: point(50, 50),
  className: "experience-location-icon"
});

interface ExperienceMapProps {
  defaultLocation: number[];
  defaultZoom: number;
  userLocation: number[] | null;
}

const ExperienceMap: React.FC<ExperienceMapProps> = ({
  defaultLocation,
  defaultZoom,
  userLocation
}) => {
  const classes = useStyles()
  const [movedToUser, setMovedToUser] = useState(false);
  const [currentZoom, setCurrentZoom] = useState<number>(defaultZoom);
  const [currentCenter, setCurrentCenter] = useState<LatLng>(latLng(defaultLocation[0], defaultLocation[1]))
  const {
    experiences,
    bbox,
    setBbox
  } = useLandingPageContext();
  const moveTimeoutRef = useRef<NodeJS.Timeout>();

  const updateBbox = (bounds: LatLngBounds) => { 
    setBbox(bounds.toBBoxString());
  };

  const boundsFromBboxString = (bboxString: string) => {
    const strValues = bboxString.split(",");
    const corner1 = latLng(Number(strValues[1]), Number(strValues[0]));
    const corner2 = latLng(Number(strValues[3]), Number(strValues[2]));
    return latLngBounds([corner1, corner2]);
  };

  const Markers = () => {
    const map = useMap();

    useEffect(() => {
      if (!bbox) {
        map.setView(latLng(defaultLocation[0], defaultLocation[1]), defaultZoom);
        updateBbox(map.getBounds());
      }
    }, [map, bbox]);

    // Move the map to the user's location once
    useEffect(() => {
      if (!userLocation || movedToUser) return;
      map.setView(latLng(userLocation[0], userLocation[1]), defaultZoom);
      updateBbox(map.getBounds());
      setMovedToUser(true);
    }, [map, userLocation]);

    useEffect(() => {
      map.setView(currentCenter, currentZoom);
    }, [map, currentCenter, currentZoom]);

    useMapEvents({
      zoomend: () => {
        setCurrentZoom(map.getZoom());
        updateBbox(map.getBounds());
      },
      moveend: () => {
        setCurrentCenter(map.getCenter());
        updateBbox(map.getBounds());
        map.closePopup();
      }
    });

    return (
      <MarkerClusterGroup>
        {experiences && experiences.map((experience) => (
          <Marker
            icon={chefHatIcon}
            position={[experience.place.location.coordinates[1], experience.place.location.coordinates[0]]}
          >
            <Popup>
              <ReactionBar experience={experience} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
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
        // whenReady={() => {
        //   const map = useMap();
        //   updateBbox(map.getBounds());
        // }}
        attributionControl={false}
      >
        <LeafletTileLayer
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          attribution=""
        />
        <Markers />
      </MapContainer>
    </div>
  );
}

export default ExperienceMap;