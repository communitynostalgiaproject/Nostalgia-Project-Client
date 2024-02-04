import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { IconButton } from '@mui/material';
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
    <React.Fragment>
    <IconButton
      style={{ 
        position: 'fixed',
        top: '50%', 
        right: '29%',
        borderRadius: '150px 0 0 150px',
        backgroundColor: '#272A40',
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
        sx={{ color: '#fff', padding: '1rem' }}
        data-testid="SideDrawer-FoodPhotoList"  
      >
        {[''].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemText primary={text} />
          </ListItem>
        ))}
        <PostedImagesList />
      </List>
    </Box>
    </React.Fragment>
  );

  return (
    <React.Fragment key={'sidebar'}>
      <IconButton
        style={{ 
          position: 'fixed',
          top: '50%',
          right: '0px',
          borderRadius: '150px 0 0 150px',
          backgroundColor: '#272A40',
          display: sidebar.right ? "none" : "block"
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
      </IconButton>
      <SwipeableDrawer
        anchor={'right'}
        open={sidebar['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      >
        {list('right')}
      </SwipeableDrawer>
    </React.Fragment> 
  );
};
