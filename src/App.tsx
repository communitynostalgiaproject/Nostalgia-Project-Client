import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './shared/components/navbar';
import TutorialModal from "./shared/components/tutorialModal/TutorialModal";
import LandingPage from "./pages/landingPage";
import ResearchPage from "./pages/research/ResearchPage";
import CommunityOutreachPage from "./pages/community-outreach/CommunityOutreachPage";
import EventsPage from "./pages/events/EventsPage";
import AboutPage from "./pages/about/AboutPage";
import TeamPage from "./pages/team/TeamPage";
import "./App.css";

const App: React.FC = () => {
    const modalShown = localStorage.getItem('showModal') === 'true' ? false : true;

    useEffect(() => {
        localStorage.setItem('showModal', 'true');
    }, []);

    return (
        <Router> 
            {modalShown ? <TutorialModal /> : null}
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/Community Outreach" element={<CommunityOutreachPage />} />
                <Route path="/Our Team" element={<TeamPage />} />
                <Route path="/About Us" element={<AboutPage />} />
            </Routes>     
        </Router>
    );
}
 
export default App;