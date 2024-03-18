import React, { useEffect, useState } from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import { redirectToLogin } from '../../api/helpers';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useFetchExperiencesByBbox from '../../api/queries/fetchExperiencesByBbox';
import { Experience } from '../../types/experience';
import EditExperienceModal from '../../shared/components/side-drawer/EditExperienceModal';
import DeleteExperienceModal from '../../shared/components/side-drawer/DeleteExperienceModal';
import usersRequest from '../../api/users.request';
import experiencesRequest from '../../api/experiences.request';

const LandingPage: React.FC = () => {
  const defaultLocation = [38.9072, 139.69222];
  const defaultZoom = 6;
  const queryClient = useQueryClient();
  const [userLocation, setUserLocation] = useState<Number[] | null>(null);
  const [bbox, setBbox] = useState<String | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {
    experiences,
    setExperiences,
    fetchNextPage,
    hasNextPage
  } = useFetchExperiencesByBbox(bbox);

  const { data: user } = useQuery("currentUser", async () => {
    return await usersRequest.fetchData();
  });

  const deleteExperience = useMutation(async () => {
    await experiencesRequest.delete(selectedExperience?._id);
  }, {
    onSuccess: async () => {
      await queryClient.cancelQueries(["experiences", bbox]);

      setExperiences(experiences.filter((experience: Experience) => {
        return experience._id !== selectedExperience?._id
      }));
      setDeleteModalOpen(false);
      setSelectedExperience(null);
    },
    onError: (err: any) => {
      console.error(`Unable to delete experience: ${err}`);
    }
  });

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
    <>
      <MapUIOverlay
        redirectToLogin={redirectToLogin}
        user={user}
        setBbox={setBbox}  
      />
      <SideDrawer
        experiences={experiences}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        setEditModalOpen={setEditModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      <AppVector
        experiences={experiences}
        defaultLocation={defaultLocation}
        defaultZoom={defaultZoom}
        userLocation={userLocation}
        bbox={bbox}
        setBbox={setBbox}
        setSelectedExperience={setSelectedExperience}
      />
      <EditExperienceModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        experience={selectedExperience as Experience}
        setExperiences={setExperiences}
        setSelectedExperience={setSelectedExperience}
      />
      <DeleteExperienceModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={() => deleteExperience.mutate()}
        deleteError={`${deleteExperience.error}`}
        processingDeletion={deleteExperience.isLoading}
      />
    </>
  )
}

export default LandingPage;