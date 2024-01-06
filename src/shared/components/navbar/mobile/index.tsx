import React, {useState} from 'react';
import { Drawer, List, ListItemText, ListItemButton, IconButton, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import LoginButton from '../../../../components/login/loginButton';
import useStyles from './styles';

interface MobileNavProps {
  navItems: string[]
}

const MobileNav: React.FC<MobileNavProps> = ({ navItems }) => {

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
      setOpen(!open);
  };

  const handleListItemClick = () => {
    setOpen(false);
  };

  return (

    <div className={classes.navBar}>
      <Box>
        <Typography
            noWrap
            component="a"
            href="/"
            className={classes.logo}
        >
            Nostalgia
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
                {
                  navItems.map((item: string) => (
                      <ListItemButton key={item}  component={Link} to={`/${item.toLowerCase()}`} onClick={handleListItemClick} className={classes.navItem}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                  ))
                }
                <LoginButton />
              </List>
            </Box>
          </Box>
        </Drawer>
      </Box>
   </div>
  );
};
    

export default MobileNav;