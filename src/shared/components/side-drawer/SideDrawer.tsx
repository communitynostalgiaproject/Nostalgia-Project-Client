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
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: '60px',
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
          flex: 1,
          backgroundColor: 'white',
          maxWidth: 500,
          padding: '0px 5px 30px 5px',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
      >
          {
            selectedExperience
              ? <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
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
      </Box>
    </Box>
  );

  return (
    <React.Fragment key={'sidebar'}>
      <Button
        variant='contained'
        disableElevation
        sx={{ 
          position: 'fixed',
          top: '50%',
          right: '-20px',
          borderRadius: '150px 0 0 150px',
          backgroundColor: '#272A40',
          display: sidebarOpen ? "none" : "block",
          zIndex: 900,
          ":hover": {
            backgroundColor: '#272A40'
          }
        }}
        onClick={() => setSidebarOpen(true)}
        data-testid="SideDrawer-ToggleOpenButton"
      >
        <ArrowBackIosIcon
          sx={{
            fontSize: '48px',
            color: '#fff',
            "@media (max-width: 599px)": {
              fontSize: '35px'
            }
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
          pointerEvents: 'none',
        }}
        PaperProps={{
          style: {
            top: '100px',
            height: 'calc(100vh - 100px)',
            display: sidebarOpen ? 'block' : 'none'
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