import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import useStyles from './styles';
import UserMenu from '../../../../components/menus/UserMenu';

interface DesktopNavProps {
    navItems: string[]
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
  const { data: user, error } = useQuery("currentUser", async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

    return res.data;
  });
    const classes = useStyles();

    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    };

    useEffect(() => {
      if (error) console.error(`Error fetching user: ${error}`);
      
    }, [error, user]);

    return (
        <AppBar
          className={classes.navBar}
          data-testid="DesktopNav-AppBar"
        >
            <Container maxWidth="xl" className={classes.navContainer}>
                <Toolbar disableGutters className={classes.navContent}>
                    <Box>
                        <Typography
                            noWrap
                            component="a"
                            href="/"
                            className={classes.logo}
                            data-testid="DesktopNav-Logo"
                        >
                            Nostalgia
                        </Typography>
                    </Box>
                    <Box className={classes.navlinkContainer}>
                        <Tabs value={value} onChange={handleChange} aria-label='navigation tab' className={classes.navLink} classes={{ indicator: classes.tabIndicator }}>
                            {
                                navItems.map((item: string) => (
                                    <Tab
                                      key={item}
                                      label={item}
                                      component={Link}
                                      to={`/${item}`}
                                      data-testid={`DesktopNav-LinkTab-${item}`}
                                    />
                                ))
                            }
                        </Tabs>
                        <UserMenu user={user} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default DesktopNav;