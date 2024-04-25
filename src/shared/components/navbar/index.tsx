import React from 'react';
import DesktopNav from './desktop';
import MobileNav from './mobile';
import { useMediaQuery, useTheme } from '@mui/material';

const Navbar = () => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(1024));

    const pages: string[] = [
        "Events",
        "Community Outreach",
        "Our Team",
    ]

    return (
        <>
        {
            matches ? <MobileNav navItems={pages} /> : <DesktopNav navItems={pages}/> 
        }
        </>
    )
}

export default Navbar;