import { Button } from '@mui/material';
import React from 'react';

const CreateExperienceButton: React.FC<{onClick: () => void}> = ({
  onClick
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
        onClick={onClick}
        data-testid="CreateExperienceButton-Button"
      >
        Drop a pin!
      </Button>
    </>
  )
};

export default CreateExperienceButton;