import { Container } from '@mui/material';
import { useQuery } from 'react-query';
import React from 'react';
import CreateExperienceButton from './CreateExperienceButton';
import axios from 'axios';

const MapUIOverlay: React.FC = () => {
  const { data: user } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });

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
      { user ? <CreateExperienceButton /> : null }
    </Container>
  );
};

export default MapUIOverlay;