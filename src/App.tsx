import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './shared/components/navbar';
import LandingPage from "./pages/landingPage";
import SciencePage from "./components/science/SciencePage";
import EventsPage from "./components/events/EventsPage";
import AboutPage from "./components/about/AboutPage";

import "./App.css";
import { Container } from "@mui/material";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/research" element={<SciencePage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/community_outreach" element={<EventsPage />} />
                <Route path="/our_team" element={<EventsPage />} />
                <Route path="/about_us" element={<AboutPage />} />
            </Routes>     
        </Router>
    );
}
 
export default App;