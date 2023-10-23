import React from 'react';
import Navbar from './components/navbar/Navbar';
import MapLibre from './components/stadiamaps/MapLibre';

import './App.css';

function App() {
  return (
    <main className="App">
      <Navbar />
      <MapLibre />
    </main>
  );
};

export default App;
