import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import experiencesRequest from '../../../api/experiences.request';
import ReactionBar from '../../../pages/landingPage/reactionBar.tsx';

import useStyles from './styles';

import 'leaflet/dist/leaflet.css';
import {MapContainer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import LeafletTileLayer from './leafletTileLayer';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const AppVector = () => {  
  const classes = useStyles()

  const { error, data: experiences } = useQuery("experiences", async() => {
    return await experiencesRequest.get()
  });

  useEffect(() => {
    if (error) console.error(`Error fetching user: ${error}`);
  }, [error, experiences]);

  return (
    <div className="App">
      <MapContainer
        className={classes.fullScreenMap}
        center={[38.9072, 139.69222]}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[[-85.06, -180], [85.06, 180]]}
        scrollWheelZoom={true}>
        <LeafletTileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"

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
      </MapContainer>
    </div>
  );
}

export default AppVector;
