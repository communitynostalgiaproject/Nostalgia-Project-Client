import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItemText, ListItemButton, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import usersRequest from '../../../../api/users.request';
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
    // console.log(`user: ${JSON.stringify(user)}`);
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
            The Map
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
        >
          <Box className={classes.drawer}>
            <div className={classes.navHeader}>
              <p>Menu</p>
            </div>
            <Box className={classes.navItemBox}>
              <List className={classes.navItemGroup}>
                <ListItemButton component={Link} to={`/`} onClick={handleListItemClick} className={classes.navItem}>
                  <ListItemText primary={'Map'} />
                </ListItemButton>
                {
                  navItems.map((item: string) => (
                      <ListItemButton key={item}  component={Link} to={`/${item.toLowerCase()}`} onClick={handleListItemClick} className={classes.navItem}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                  ))
                }
              </List>
            </Box>
          </Box>
        </Drawer>
      </Box>
   </div>
  );
};
    

export default MobileNav;