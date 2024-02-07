import { Button } from '@mui/material';
import React, { useState } from 'react';
import CardModal from '../modal/CardModal';
import ExperienceForm from '../forms/ExperienceForm';

const CreateExperienceButton: React.FC = () => {
  const [ newExperienceModalOpen, setNewExperienceModalOpen ] = useState<boolean>(false);

  const toggleModalOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setNewExperienceModalOpen((prev) => !prev);
  };
  

  const NewExperienceModal: React.FC = () => {
    return (
      <CardModal
        open={newExperienceModalOpen}
        onClose={toggleModalOpen}
        cardProps={{
          sx: {
            width: "90%",
            maxWidth: "600px",
            paddingBottom: "30px"
          }
        }}
        data-testid="CreateExperienceButton-CreateExperienceModal"
      >
        <ExperienceForm />
      </CardModal>
    );
  };

  return (
    <>
      <Button
        variant='contained'
        color='error'
        sx={{
          position: 'relative',
          left: '10%',
          top: '90%',
          pointerEvents: 'auto'
        }}
        onClick={toggleModalOpen}
        data-testid="CreateExperienceButton-Button"
      >
        Drop a pin!
      </Button>
      <NewExperienceModal />
    </>
  )
};

export default CreateExperienceButton;