import React, { useEffect, useState } from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import useFetchExperiencesByBbox from '../../api/queries/fetchExperiencesByBbox';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];
  const defaultZoom = 6;
  const [location, setLocation] = useState<number[]>(defaultLocation);
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoom);
  const [bbox, setBbox] = useState<String | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<String>("");
  const {
    experiences,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
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
  useEffect(() => console.log(`Currently selected location: ${location}`), [location]);
  useEffect(() => console.log(`Current bbox: ${bbox}`), [bbox]);
  useEffect(() => console.log(`Current selected experience: ${selectedExperience}`), [selectedExperience]);
  useEffect(() => console.log(`experiences: ${JSON.stringify(experiences)}`), [experiences]);
  useEffect(() => console.log(`hasNextPage: ${hasNextPage}`), [hasNextPage]);

  return (
    <>
      <MapUIOverlay />
      <SideDrawer />
      <AppVector
        experiences={experiences || []}
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