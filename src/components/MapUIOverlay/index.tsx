import { Container, Button } from '@mui/material';
import React, { useState } from 'react';
import CardModal from '../modal/CardModal';
import ExperienceForm from '../forms/ExperienceForm';

interface MapUIOverlayProps {
  redirectToLogin: () => void;
  user: any;
};

const MapUIOverlay: React.FC<MapUIOverlayProps> = ({
  redirectToLogin,
  user
}) => {
  const [ newExperienceModalOpen, setNewExperienceModalOpen ] = useState<boolean>(false);

  const toggleNewExperienceModal = () => {
    setNewExperienceModalOpen((prev) => !prev);
  };

  const handleCreateExperienceButtonClick = () => {
    if (user) {
      toggleNewExperienceModal();
      return;
    }

    redirectToLogin();
  }

  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 800,
        pointerEvents: 'none'
      }}
      data-testid="MapUIOverlay-Container"
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
        data-testid="MapUIOverlay-CreateExperienceModal"
      >
        <ExperienceForm
          mode="create"
          user={user}
        />
      </CardModal>
      <Button
        className='CreateExperienceButton'
        variant='contained'
        color='error'
        sx={{
          position: 'relative',
          left: '10%',
          top: '90%',
          pointerEvents: 'auto'
        }}
        onClick={handleCreateExperienceButtonClick}
        data-testid={
          user 
          ? "MapUIOverlay-CreateExperienceButton-LoggedIn"
          : "MapUIOverlay-CreateExperienceButton-LoggedOut"
        }
      >
        Drop a pin!
      </Button>
    </Container>
  );
};

export default MapUIOverlay;