import React, { useEffect, useState } from 'react';
import ExperienceMap from '../../shared/components/ExperienceMap';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import { redirectToLogin } from '../../api/helpers';
import EditExperienceModal from '../../shared/components/side-drawer/EditExperienceModal';
import DeleteExperienceModal from '../../shared/components/side-drawer/DeleteExperienceModal';
import MyExperiencesModal from '../../components/modal/MyExperiencesModal';
import { Box } from '@mui/material';
import { LandingPageContextProvider } from '../../contexts/LandingPageContext';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];
  const defaultZoom = 6;
  const [userLocation, setUserLocation] = useState<number[] | null>(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (err) => console.log(`Unable to get user location: ${err}`)
      );
    };
  };

  useEffect(() => {
    getUserLocation();
  }, []);
  
  return (
    <Box
      sx={{
        width: "100vw"
      }}
    >
      <MapUIOverlay
        redirectToLogin={redirectToLogin}
      />
      <SideDrawer />
      <ExperienceMap
        defaultLocation={defaultLocation}
        defaultZoom={defaultZoom}
        userLocation={userLocation}
      />
      <EditExperienceModal />
      <DeleteExperienceModal />
      <MyExperiencesModal />
    </Box>
  )
}

export default LandingPage;