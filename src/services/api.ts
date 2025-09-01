import axios from 'axios';

// Backend API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://unv0m2gbd3.execute-api.us-east-1.amazonaws.com/dev';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const logisticsApi = {
  // Device/IoT endpoints
  sendDeviceData: (data: {
    route_id: string;
    packages: number;
    timestamp: string;
    location?: { lat: number; lng: number };
  }) => api.post('/device', data),

  // Route management endpoints (would be added as backend is extended)
  getRoutes: () => api.get('/routes'),
  
  // Driver assignment endpoints (would be added as backend is extended)
  assignDriver: (data: {
    route_id: string;
    driver_id: string;
  }) => api.post('/assignments', data),

  // Analytics endpoints (would be added as backend is extended)
  getAnalytics: () => api.get('/analytics'),
};

export default api;
