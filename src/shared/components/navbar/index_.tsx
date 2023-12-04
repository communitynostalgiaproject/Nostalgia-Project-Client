import React from 'react';
import DesktopNav from './desktop';
import MobileNav from './mobile';

const Navbar = () => {

    const pages: string[] = [
        "Research",
        "Events",
        "Community Outreach",
        "Our Team",
        "About Us"
    ]


    return (
        <MobileNav navItems={pages} />
        // <DesktopNav navItems={pages}/>
    )
}

export default Navbar;