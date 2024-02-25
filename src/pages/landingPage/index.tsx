import React, { useEffect, useState } from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];  // Adjust to whatever
  const [location, setLocation] = useState<number[]>(defaultLocation);
  const [bbox, setBbox] = useState<number[] | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<String>("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          console.log(`User location: ${[latitude, longitude]}`);
          // setLocation([latitude, longitude]);
        },
        (err) => console.log(`Unable to get user location: ${err}`)
      );
    };
  };

  useEffect(() => getUserLocation(), []);
  useEffect(() => console.log(`Currently selected location: ${location}`), [location]);
  useEffect(() => console.log(`Current bbox: ${bbox}`), [bbox]);
  useEffect(() => console.log(`Current selected experience: ${selectedExperience}`), [selectedExperience]);

  return (
    <>
      <MapUIOverlay />
      <SideDrawer />
      <AppVector />
    </>
  )
}

export default LandingPage;