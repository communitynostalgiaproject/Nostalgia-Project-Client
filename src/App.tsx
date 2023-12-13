import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/navbar"; 
import LandingPage from "./pages/landingPage";
import ResearchPage from "./pages/research/ResearchPage";
import TeamPage from "./pages/team/TeamPage";
import EventsPage from "./pages/events/EventsPage";
import AboutPage from "./pages/about/AboutPage";
import ComingSoonPage from "./pages/coming-soon/ComingSoonPage";
import "./App.css";

const App = () => {
    return (
        <main style={{ height: '100vh' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/The Research" element={<ResearchPage />} />
                <Route path="/The Team" element={<TeamPage />} />
                <Route path="/Events" element={<EventsPage />} />
                <Route path="/About" element={<AboutPage />} />
                <Route path="Coming Soon" element={<ComingSoonPage />} />
            </Routes>     
        </main>        
    );
};
 
export default App;