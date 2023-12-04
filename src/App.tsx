import React from "react";
import { Routes, Route } from "react-router-dom";
// import Navbar from "./shared/components/navbar"; 
import Navbar from './shared/components/navbar/index_';
// import HomePage from "./components/home/HomePage";
import LandingPage from "./pages/landingPage";
import SciencePage from "./components/science/SciencePage";
import EventsPage from "./components/events/EventsPage";
import AboutPage from "./components/about/AboutPage";

import "./App.css";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/research" element={<SciencePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/community_outreach" element={<EventsPage />} />
                <Route path="/our_team" element={<EventsPage />} />
                <Route path="/about_us" element={<AboutPage />} />
            </Routes>     
        </div>
    );
}
 
export default App;