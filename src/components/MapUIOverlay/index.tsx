import { Container } from '@mui/material';
import React from 'react';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import CreateExperienceButton from './CreateExperienceButton';

const MapUIOverlay: React.FC = () => {
  return (
    <Container
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed'
      }}
    >
      <CreateExperienceButton />
      <SideDrawer />
    </Container>
  );
};

export default MapUIOverlay;