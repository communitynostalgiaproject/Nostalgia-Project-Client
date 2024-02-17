import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import React, { useState } from 'react';
import CardModal from '../modal/CardModal';
import ExperienceForm from '../forms/ExperienceForm';
import CreateExperienceButton from './CreateExperienceButton';
import axios from 'axios';

const MapUIOverlay: React.FC = () => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
  const [ newExperienceModalOpen, setNewExperienceModalOpen ] = useState<boolean>(false);

  const toggleNewExperienceModal = () => {
    setNewExperienceModalOpen((prev) => !prev);
  };

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 800,
        pointerEvents: 'none'
      }}
    >
      <CardModal
        open={newExperienceModalOpen}
        onClose={toggleNewExperienceModal}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "600px",
            paddingBottom: "30px"
          }
        }}
        data-testid="CreateExperienceButton-CreateExperienceModal"
      >
        <ExperienceForm user={user} />
      </CardModal>
      { user ? <CreateExperienceButton toggleModal={toggleNewExperienceModal} /> : null }
    </Container>
  );
};

export default MapUIOverlay;