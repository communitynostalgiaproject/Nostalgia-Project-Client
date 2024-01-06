import React, { SyntheticEvent, useState } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import useUserSession from '../../../../hooks/useUserSession';
import LoginButton from '../../../../components/login/loginButton';

interface DesktopNavProps {
    navItems: string[]
}

const DesktopNav: React.FC<DesktopNavProps> = ({ navItems }) => {
    const user = useUserSession();
    const classes = useStyles();

    const [value, setValue] = useState(0)

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

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
                                navItems.map((item: string) => (
                                    <Tab key={item} label={item} component={Link} to={`/${item}`} />
                                ))
                            }
                        </Tabs>
                        {user ? null : <LoginButton />}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default DesktopNav;