import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container, CircularProgress } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RouteManagement from './pages/RouteManagement';
import DriverManagement from './pages/DriverManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import APITesting from './pages/APITesting';
import Login from './pages/Login';

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress />
        <Box>Loading...</Box>
      </Box>
    );
  }

  // If not authenticated, show only login page
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // If authenticated, show full layout with sidebar and header
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
            <Route path="/api-testing" element={<APITesting />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
