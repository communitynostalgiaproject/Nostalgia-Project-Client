import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Tabs, Tab, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Navbar = () => {

    const classes = useStyles();

    const pages = [
        "Research",
        "Events",
        "Community Outreach",
        "Our Team",
        "About Us"
    ]


    return (
        <AppBar className={classes.navBar}>
            <Container>
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
                    <Box>
                        {
                            pages.map((page, i) => (
                                <Button>
                                    <Link to={`/${page}`} className={classes.navLink}> {page} </Link>
                                </Button>
                            ))
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar;