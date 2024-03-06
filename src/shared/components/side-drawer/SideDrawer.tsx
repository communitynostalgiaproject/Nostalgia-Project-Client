import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, IconButton, Paper } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExperiencePreviewList from './ExperiencePreviewList';
import ExperienceView from './ExperienceView';
import { Experience } from '../../../types/experience';

type Anchor = 'left' | 'right';

interface SideDrawerProps {
  experiences: Experience[];
  selectedExperience: Experience | null;
  setSelectedExperience: React.Dispatch<Experience | null>;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  setEditModalOpen: React.Dispatch<boolean>;
  setDeleteModalOpen: React.Dispatch<boolean>;
}

const  SideDrawer: React.FC<SideDrawerProps> = ({
  experiences,
  selectedExperience,
  setSelectedExperience,
  hasNextPage,
  fetchNextPage,
  setEditModalOpen,
  setDeleteModalOpen
}) => {
  const [sidebar, setSidebar] = useState({
    top: true,
    left: true,
    bottom: true,
    right: true,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

    setSidebar({ ...sidebar, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box 
      sx={{
        backgroundColor: '#272A40',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',

      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <IconButton
          style={{
            width: '5rem',
            pointerEvents: 'auto'
          }}
          onClick={toggleDrawer('right', false)}
          data-testid="SideDrawer-ToggleClosedButton"
        >
          <ArrowForwardIosIcon
            style={{
              fontSize: '48px',
              color: '#fff'
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{ 
          width: 500, 
          height: '100%',
          padding: '15px 0px',
          overflow: 'auto'
        }}
        // role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '15px 0px 50px 0px',
            overflow: 'auto',
            pointerEvents: 'auto',
            borderRadius: '0px'
          }}
        >
          {
            selectedExperience
              ? <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <ExperienceView
                  experience={selectedExperience}
                  onClose={() => {
                    setSelectedExperience(null);
                  }}
                  setEditModalOpen={setEditModalOpen}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              </Box>
              : <ExperiencePreviewList
                experiences={experiences}
                setSelectedExperience={setSelectedExperience}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
              />
          } 
        </Paper>
      </Box>
    </Box>
  );

  return (
    <React.Fragment key={'sidebar'}>
      <Button
        style={{ 
          position: 'fixed',
          top: '50%',
          right: '0px',
          borderRadius: '150px 0 0 150px',
          backgroundColor: '#272A40',
          display: sidebar.right ? "none" : "block",
          zIndex: 900
        }}
        onClick={toggleDrawer('right', true)}
        data-testid="SideDrawer-ToggleOpenButton"
      >
        <ArrowBackIosIcon
          style={{
            fontSize: '48px',
            color: '#fff'
          }} 
        />
      </Button>
      <SwipeableDrawer
        anchor={'right'}
        open={sidebar['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
        hideBackdrop
        sx={{
          pointerEvents: 'none'
        }}
        data-testid="SideDrawer-Drawer"
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment> 
  );
};

export default SideDrawer;