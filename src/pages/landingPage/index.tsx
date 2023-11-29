import AppVector from '../../shared/components/stadiaMap/index';
import SideDrawer from '../../components/sidedrawer/SideDrawer';

const LandingPage = () => {
    return (
        <div>
            <AppVector/>
            {/* Works but not on landing page */}
            <SideDrawer />
        </div>
    )
}

export default LandingPage;