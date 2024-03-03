import React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExperiencePreviewList from './ExperiencePreviewList';
import ExperienceView from '../../../components/ExperienceView';
import { Experience } from '../../../types/experience';

type Anchor = 'left' | 'right';

interface SideDrawerProps {
  experiences: Experience[];
  selectedExperience: Experience | null;
  setSelectedExperience: React.Dispatch<Experience | null>;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
}

const  SideDrawer: React.FC<SideDrawerProps> = ({
  experiences,
  selectedExperience,
  setSelectedExperience,
  hasNextPage,
  fetchNextPage
}) => {
  const [sidebar, setSidebar] = React.useState({
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

    const handleDeleteExperience = async () => {
      return true;
    };

  const list = (anchor: Anchor) => (
    <Box 
      sx={{ backgroundColor: '#272A40', height: '100%' }}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: 500, 
          height: '100%',
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Box
          sx={{
            width: '95%',
            maxHeight: '80%',
            overflow: 'auto',
            pointerEvents: 'auto'
          }}
        >
          {
            selectedExperience
              ? <Box>
                <Box
                  sx={{
                    padding: '10px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                  }}
                >
                  <IconButton
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                      e.stopPropagation();
                      setSelectedExperience(null);
                    }}
                  >
                    <CloseIcon 
                      color="primary"
                    />
                  </IconButton>
                </Box>
                <ExperienceView
                  experience={selectedExperience}
                  onDelete={handleDeleteExperience}
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
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment> 
  );
};

export default SideDrawer;