import React from 'react';
import AppVector from '../../shared/components/appVector/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';

const LandingPage: React.FC = () => {
    return (
        <>
          <MapUIOverlay />
          <SideDrawer />
          <AppVector/>
        </>
    )
}

export default LandingPage;