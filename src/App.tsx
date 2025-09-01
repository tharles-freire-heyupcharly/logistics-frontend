import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RouteManagement from './pages/RouteManagement';
import DriverManagement from './pages/DriverManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

import Login from './pages/Login';

function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Header />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/routes" element={<RouteManagement />} />
            <Route path="/drivers" element={<DriverManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
