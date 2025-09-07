import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import MentorDiscovery from './pages/MentorDiscovery';
import MentorProfile from './pages/MentorProfile';
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import { AuthProvider } from './context/AuthContext';
// import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mentors" element={<MentorDiscovery />} />
            <Route path="/mentor/:id" element={<MentorProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/booking/:mentorId" element={<Booking />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;