import React from 'react';
import AppVector from '../../shared/components/stadiaMap/index';
import SideDrawer from '../../shared/components/side-drawer/SideDrawer';
import MapUIOverlay from '../../components/MapUIOverlay';
import { redirectToLogin } from '../../api/helpers';

const LandingPage: React.FC = () => {
    return (
        <>
          <MapUIOverlay redirectToLogin={redirectToLogin} />
          <SideDrawer />
          <AppVector/>
        </>
    )
}

export default LandingPage;