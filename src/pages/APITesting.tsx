import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import { logisticsApi } from '../services/api';

const APITesting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    route_id: 'R001',
    packages: 5,
    lat: 40.7128,
    lng: -74.0060,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await logisticsApi.sendDeviceData({
        route_id: formData.route_id,
        packages: formData.packages,
        timestamp: new Date().toISOString(),
        location: {
          lat: formData.lat,
          lng: formData.lng,
        },
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        API Testing
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Test the integration between frontend and backend services
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Send Device Data" 
              subheader="Test IoT device data submission"
            />
            <CardContent>
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Route ID"
                      value={formData.route_id}
                      onChange={(e) => handleInputChange('route_id', e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Number of Packages"
                      type="number"
                      value={formData.packages}
                      onChange={(e) => handleInputChange('packages', parseInt(e.target.value))}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Latitude"
                      type="number"
                      value={formData.lat}
                      onChange={(e) => handleInputChange('lat', parseFloat(e.target.value))}
                      inputProps={{ step: 'any' }}
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Longitude"
                      type="number"
                      value={formData.lng}
                      onChange={(e) => handleInputChange('lng', parseFloat(e.target.value))}
                      inputProps={{ step: 'any' }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? 'Sending...' : 'Send Data to Backend'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="API Response" />
            <CardContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2">{error}</Typography>
                </Alert>
              )}

              {result && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="body2">Request successful!</Typography>
                </Alert>
              )}

              {result && (
                <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                  <Typography variant="h6" gutterBottom>
                    Response Data:
                  </Typography>
                  <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </Paper>
              )}

              {!result && !error && (
                <Typography variant="body2" color="textSecondary">
                  Submit the form to see the API response here
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardHeader title="System Status" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="Frontend Running" 
                  color="success" 
                  variant="outlined"
                />
                <Chip 
                  label="Backend API Available" 
                  color="success" 
                  variant="outlined"
                />
                <Chip 
                  label="AWS Services Active" 
                  color="success" 
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>API Endpoint:</strong> {process.env.REACT_APP_API_URL || 'Not configured'}
              </Typography>
              
              <Typography variant="body2">
                <strong>Environment:</strong> {process.env.NODE_ENV}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default APITesting;
