import React from 'react';
import DesktopNav from './desktop';
import MobileNav from './mobile';
import { useMediaQuery, useTheme } from '@mui/material';

const pages: string[] = ['The Research', 'The Team', 'Events', 'About', 'Coming Soon'];

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down(1024));
    console.log(matches)

    const pages: string[] = [
        "Research",
        "Events",
        "Community Outreach",
        "Our Team",
        "About Us"
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