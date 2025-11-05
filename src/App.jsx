import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Import pages
import Welcome from './pages/Welcome.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Curriculum from './pages/Curriculum.jsx';
import Communicate from './pages/Communicate.jsx';
import Coaches from './pages/Coaches.jsx';
import Performance from './pages/Performance.jsx';
import Recruit from './pages/Recruit.jsx';
import CRM from './pages/CRM.jsx';
import Ecosystem from './pages/Ecosystem.jsx';
import Pricing from './pages/Pricing.jsx';
import Settings from './pages/Settings.jsx';
import RunProgramExperience from './pages/RunProgramExperience.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('bgr_headcoach_auth');
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        <Route path="/curriculum" element={<Curriculum onLogout={handleLogout} />} />
        <Route path="/communicate" element={<Communicate onLogout={handleLogout} />} />
        <Route path="/coaches" element={<Coaches onLogout={handleLogout} />} />
        <Route path="/performance" element={<Performance onLogout={handleLogout} />} />
        <Route path="/recruit" element={<Recruit onLogout={handleLogout} />} />
        <Route path="/crm" element={<CRM onLogout={handleLogout} />} />
        <Route path="/ecosystem" element={<Ecosystem onLogout={handleLogout} />} />
        <Route path="/pricing" element={<Pricing onLogout={handleLogout} />} />
        <Route path="/settings" element={<Settings onLogout={handleLogout} />} />
        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
        <Route path="/runprogramexperience" element={<RunProgramExperience />} />
      </Routes>
    </Router>
  );
}

export default App;

