import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CareerExplorer from './pages/CareerExplorer';
import SkillQuiz from './pages/SkillQuiz';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/careers" element={<CareerExplorer />} />
          <Route path="/quiz" element={<SkillQuiz />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
