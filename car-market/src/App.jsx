// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';
import CarList from './pages/CarList';

const App = () => {
  return (
    <Router basename="/car-market/">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/highlighted-cars" element={<HighlightedCars />} />
        <Route path="/carlist" element={<CarList />} />
      </Routes>
    </Router>
  );
};

export default App;
