import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NavigationModule from './pages/NavigationModule';
import AttendanceModule from './pages/AttendanceModule';
import CommunicationModule from './pages/CommunicationModule';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router basename="/Hackathon-IntelliCampus/">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/navigation" 
          element={user ? <NavigationModule /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/attendance" 
          element={user ? <AttendanceModule user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/communication" 
          element={user ? <CommunicationModule user={user} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
