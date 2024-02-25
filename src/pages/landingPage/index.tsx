import React, { useEffect, useState } from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import useFetchExperiencesByBbox from '../../api/queries/fetchExperiencesByBbox';
import { Experience } from '../../types/experience';

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
      <MapUIOverlay />
      <SideDrawer
        experiences={experiences}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
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