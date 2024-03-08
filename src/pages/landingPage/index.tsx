import React from 'react';
// import FlagRequest from '../../api/flags.request'
import AppVector from '../../shared/components/stadiaMap/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';

const LandingPage: React.FC = () => {

    return (
        <>
            <AppVector/>
            <SideDrawer />
        </>
    )
}

export default LandingPage;