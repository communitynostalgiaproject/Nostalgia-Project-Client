import React, { useEffect, useState } from 'react';
import ExperienceMap from '../../shared/components/ExperienceMap';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import { redirectToLogin } from '../../api/helpers';
import EditExperienceModal from '../../shared/components/side-drawer/EditExperienceModal';
import DeleteExperienceModal from '../../shared/components/side-drawer/DeleteExperienceModal';
import { Box } from '@mui/material';
import { LandingPageContextProvider } from '../../contexts/LandingPageContext';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];
  const defaultZoom = 6;
  const [userLocation, setUserLocation] = useState<Number[] | null>(null);
  // const queryClient = useQueryClient();
  // const [bbox, setBbox] = useState<String | null>(null);
  // const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  // const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  // const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  // const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  // const {
  //   experiences,
  //   setExperiences,
  //   fetchNextPage,
  //   hasNextPage
  // } = useFetchExperiencesByBbox(bbox);

  // const { data: user } = useQuery("currentUser", async () => {
  //   return await usersRequest.fetchData();
  // });

  // const deleteExperience = useMutation(async () => {
  //   await experiencesRequest.delete(selectedExperience?._id);
  // }, {
  //   onSuccess: async () => {
  //     await queryClient.cancelQueries(["experiences", bbox]);

  //     setExperiences(experiences.filter((experience: Experience) => {
  //       return experience._id !== selectedExperience?._id
  //     }));
  //     setDeleteModalOpen(false);
  //     setSelectedExperience(null);
  //   },
  //   onError: (err: any) => {
  //     console.error(`Unable to delete experience: ${err}`);
  //   }
  // });

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
    <LandingPageContextProvider>
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
      </Box>
    </LandingPageContextProvider>
  )
}

export default LandingPage;