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
                <Route path="/The Science" element={<SciencePage />} />
                <Route path="/Events" element={<EventsPage />} />
                <Route path="/About" element={<AboutPage />} />
            </Routes>     
        </div>
    );
}
 
export default App;