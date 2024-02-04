import { Container } from '@mui/material';
import React from 'react';
import CreateExperienceButton from './CreateExperienceButton';

const MapUIOverlay: React.FC = () => {
  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 800,
      }}
    >
      <CreateExperienceButton />
    </Container>
  );
};

export default MapUIOverlay;