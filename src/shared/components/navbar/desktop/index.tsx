import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Tabs, Tab, InputLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import useStyles from './styles';
import UserMenu from '../../../../components/menus/UserMenu';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const logo = require('../../../../assets/CNI-logo.png');

interface DesktopNavProps {
    navItems: string[]
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {

    const [value, setValue] = useState(0);
    
    const classes = useStyles();

    const { data: user, error } = useQuery("currentUser", async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/fetchData`, { withCredentials: true });

        return res.data;
    });

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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'sInputLabelpace-between',
                            alignItems: 'center'
                        }}
                    >
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
                            data-testid="DesktopNav-Logo"
                        >
                            Global Food Nostalgia Map
                        </Typography>
                    </Box>
                    <Box className={classes.navlinkContainer}>
                        <Tabs value={value} onChange={handleChange} aria-label='navigation tab' className={classes.navLink} classes={{ indicator: classes.tabIndicator }}>
                            {
                                navItems.map((item: string) => (
                                    item == 'Map' 
                                    ? 
                                        <Tab
                                            key={'Map'}
                                            label={'Map'}
                                            component={Link}
                                            to={`/`}
                                            data-testid={`DesktopNav-LinkTab-Map`}
                                        />
                                  :
                                    <Tab
                                        key={item}
                                        label={item}
                                        component={Link}
                                        to={`/${item}`}
                                        data-testid={`DesktopNav-LinkTab-${item}`}
                                    />
                                ))
                            }
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>                                
                                <InputLabel id="demo-simple-select-label">Learn More</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                >
                                    <Tab 
                                        key={'About Us'}
                                        label={'About Us'}
                                        component={Link}
                                        to={`/About Us`}
                                        data-testid={`DesktopNav-LinkTab-About Us`}
                                    />
                                    <Tab 
                                        key={'Our Team'}
                                        label={'Our Team'}
                                        component={Link}
                                        to={`/Our Team`}
                                        data-testid={`DesktopNav-LinkTab-Our Team`}
                                    />
                                </Select>
                            </FormControl>
                        </Tabs>
                        <UserMenu user={user} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default DesktopNav;