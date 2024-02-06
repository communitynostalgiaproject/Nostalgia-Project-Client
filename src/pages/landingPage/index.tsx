import React from 'react';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import AppVector from '../../shared/components/appVector/index';

const LandingPage: React.FC = () => {
    return (
        <>
            <AppVector/>
            <SideDrawer />
        </>
    )
}

export default LandingPage;