import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PostedImagesList from './PostedImagesList';

type Anchor = 'left' | 'right';

export default function SideDrawer() {
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

  const list = (anchor: Anchor) => (
    <Box 
      sx={{ backgroundColor: '#272A40', height: '100%' }}>
      <Button
        style={{ 
          width: '5rem', 
          marginTop: '2.5rem', 
          backgroundColor: '#272A40',
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
      </Button>
      <Box
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          width: 500, 
          height: '100%',
          backgroundColor: '#272A40', 
        }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List
          sx={{ color: '#fff', padding: '1rem', pointerEvents: 'auto' }}
          data-testid="SideDrawer-FoodPhotoList" 
        >
          {[''].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ padding: '0px' }}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <PostedImagesList />
        </List>
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
