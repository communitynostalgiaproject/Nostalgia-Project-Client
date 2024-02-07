import { Button } from '@mui/material';
import React from 'react';

const CreateExperienceButton: React.FC<{toggleModal: () => void}> = ({
  toggleModal
}) => {
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
        onClick={toggleModal}
        data-testid="CreateExperienceButton-Button"
      >
        Drop a pin!
      </Button>
    </>
  )
};

export default CreateExperienceButton;