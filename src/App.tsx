import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar"; 
import HomePage from "./components/home/HomePage";
import SciencePage from "./components/science/SciencePage";
import EventsPage from "./components/events/EventsPage";
import AboutPage from "./components/about/AboutPage";

import "./App.css";

function App() {
    return (
        <main>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/The Science" element={<SciencePage />} />
                <Route path="/Events" element={<EventsPage />} />
                <Route path="/About" element={<AboutPage />} />
            </Routes>     
        </main>
    );
}
 
export default App;