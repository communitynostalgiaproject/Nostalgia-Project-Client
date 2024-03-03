import React, { useEffect, useState } from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import { redirectToLogin } from '../../api/helpers';
import { useQuery } from 'react-query';
import useFetchExperiencesByBbox from '../../api/queries/fetchExperiencesByBbox';
import { Experience } from '../../types/experience';
import usersRequest from '../../api/users.request';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];
  const defaultZoom = 6;
  const [location, setLocation] = useState<number[]>(defaultLocation);
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoom);
  const [bbox, setBbox] = useState<String | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const {
    experiences,
    fetchNextPage,
    hasNextPage
  } = useFetchExperiencesByBbox(bbox);

  const { data: user } = useQuery("currentUser", async () => {
    return await usersRequest.fetchData();
  });

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation([latitude, longitude]);
        },
        (err) => console.log(`Unable to get user location: ${err}`)
      );
    };
  };

  useEffect(() => getUserLocation(), []);

  return (
    <>
      <MapUIOverlay
        redirectToLogin={redirectToLogin}
        user={user}  
      />
      <SideDrawer
        experiences={experiences}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        user={user}
      />
      <AppVector
        experiences={experiences}
        location={location}
        setLocation={setLocation}
        zoom={zoomLevel}
        setZoom={setZoomLevel}
        setBbox={setBbox}
        setSelectedExperience={setSelectedExperience}
      />
    </>
  )
}

export default LandingPage;