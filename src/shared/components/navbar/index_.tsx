import React, { SyntheticEvent, useState } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Navbar = () => {

    const classes = useStyles();

    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const pages = [
        "Research",
        "Events",
        "Community Outreach",
        "Our Team",
        "About Us"
    ]


    return (
        <AppBar className={classes.navBar}>
            <Container maxWidth="xl" className={classes.navContainer}>
                <Toolbar disableGutters className={classes.navContent}>
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
                    <Box className={classes.navlinkContainer}>
                        <Tabs value={value} onChange={handleChange} aria-label='navigation tab' className={classes.navLink} classes={{ indicator: classes.tabIndicator }}>
                            {
                                pages.map((page, i) => (
                                    <Tab label={page} component={Link} to={`/${page}`} />
                                ))
                            }
                        </Tabs>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;