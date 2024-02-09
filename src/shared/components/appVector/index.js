import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import experiencesRequest from '../../../api/experiences.request';

import useStyles from './styles';
import ThanksForSharing from '../../../assets/reactionIcons/thanksForSharing';
import MeToo from '../../../assets/reactionIcons/meToo';
import WillTry from '../../../assets/reactionIcons/willTry';

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
      console.log(`user: ${JSON.stringify(experiences)}`);
     
  }, [error, experiences])

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
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"

        />
        <MarkerClusterGroup>
          {experiences && experiences.map((experience, index) => (
            <Marker
              key={experience['_id']}
              position={[experience.place.location.coordinates[1], experience.place.location.coordinates[0]]}
            >
              <Popup>
                <div className={classes.popupGroup}>
                  <div className={classes.experienceTitle}>
                    {experience.title}
                  </div>
                  <div className={classes.experienceImageGroup}>
                    <img src={experience.foodPhotoUrl} alt={`${experience.title}`} className={classes.experienceImage}/>
                  </div>
                  <div className={classes.reactionGroup}>
                    <div className={classes.meToo} title='Me Too'>
                      <MeToo/>
                    </div>
                    <div className={classes.thanksForSharing} title='Thanks for sharing'>
                      <ThanksForSharing/>
                    </div>
                    <div className={classes.willTry} title='Will try'>
                      <WillTry/>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
            ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default AppVector;
