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
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<boolean>;
}

const  SideDrawer: React.FC<SideDrawerProps> = ({
  experiences,
  selectedExperience,
  setSelectedExperience,
  hasNextPage,
  fetchNextPage,
  setEditModalOpen,
  setDeleteModalOpen,
  sidebarOpen,
  setSidebarOpen
}) => {
  const [sidebar, setSidebar] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
          onClick={() => setSidebarOpen(false)}
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
          width: '99%', 
          height: '100%',
          maxWidth: 500,
          padding: '15px 0px',
          overflow: 'auto'
        }}
        // role="presentation"
        onClick={() => setSidebarOpen(false)}
        onKeyDown={() => setSidebarOpen(false)}
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
        onClick={() => setSidebarOpen(true)}
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
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
        hideBackdrop
        sx={{
          pointerEvents: 'none'
        }}
        PaperProps={{
          style: {
            top: '100px',
            height: 'calc(100vh - 100px)'
          }
        }}
        data-testid="SideDrawer-Drawer"
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment> 
  );
};

export default SideDrawer;