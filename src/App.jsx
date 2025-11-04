import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Curriculum from './pages/Curriculum.jsx';
import Communicate from './pages/Communicate.jsx';
import Funnel from './pages/Funnel.jsx';
import Pricing from './pages/Pricing.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('bgr_headcoach_auth');
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        <Route path="/curriculum" element={<Curriculum onLogout={handleLogout} />} />
        <Route path="/communicate" element={<Communicate onLogout={handleLogout} />} />
        <Route path="/funnel" element={<Funnel onLogout={handleLogout} />} />
        <Route path="/pricing" element={<Pricing onLogout={handleLogout} />} />
        <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

export default App;

