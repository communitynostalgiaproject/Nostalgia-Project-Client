import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItemText, ListItemButton, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import usersRequest from '../../../../api/users.request';
import UserMenu from '../../../../components/menus/UserMenu';
import useStyles from './styles';

const logo = require('../../../../assets/CNI-logo.png');

interface MobileNavProps {
  navItems: string[]
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {
  const { error, data: user} = useQuery("currentUser", async () => {
    return await usersRequest.fetchData();
  });
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
      setOpen(!open);
  };

  const handleListItemClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (error) console.error(`Error fetching user: ${error}`);
  }, [error, user]);

  return (

    <div className={classes.navBar}>
      <Box className={classes.logoContainer}>
        <img 
            src={logo} 
            alt='CNI logo'
            className={classes.logoImg}   
        />
        <Typography
            noWrap
            component="a"
            href="/"
            className={classes.logoName}
        >
            GFN 
        </Typography>
      </Box>
      <Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          className={classes.iconButton}
        >
          <MenuIcon className={classes.menuIcon}/>
        </IconButton>
        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer}
          className={classes.drawer}
          hideBackdrop
        >
          <Box 
            className={classes.drawer}
            sx={{
              pointerEvents: "auto"
            }}
          >
            <Box  
              className={classes.navHeader}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "10px"
              }}
            >
              <p>Menu</p>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px"
                }}
              >
                <UserMenu user={user} />
                <IconButton
                  onClick={toggleDrawer}
                >
                  <CloseIcon
                    sx={{
                      color: "white"
                    }}
                  />
                </IconButton>
              </Box>
              
            </Box>
            <Box className={classes.navItemBox}>
              <List className={classes.navItemGroup}>
                {
                  navItems.map((item: string) => (
                      item == 'Map' 
                      ? 
                        <ListItemButton key={'Map'}  component={Link} to={`/`} onClick={handleListItemClick} className={classes.navItem}>
                          <ListItemText primary={item} />
                        </ListItemButton> 
                      : 
                        <ListItemButton key={item}  component={Link} to={`/${item.toLowerCase()}`} onClick={handleListItemClick} className={classes.navItem}>
                          <ListItemText primary={item} />
                        </ListItemButton> 
                  ))
                }
                <ListItemButton key={'Our Mission'}  component={Link} to={`/Our Mission`} onClick={handleListItemClick} className={classes.navItem}>
                  <ListItemText primary={'Our Mission'} />
                </ListItemButton>
                <ListItemButton key={'Our Team'}  component={Link} to={`/Our Team`} onClick={handleListItemClick} className={classes.navItem}>
                  <ListItemText primary={'Our Team'} />
                </ListItemButton>
                <ListItemButton key={'Our Sponsors'}  component={Link} to={`/Our Sponsors`} onClick={handleListItemClick} className={classes.navItem}>
                  <ListItemText primary={'Our Sponsors'} />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Drawer>
      </Box>
   </div>
  );
};
    

export default MobileNav;