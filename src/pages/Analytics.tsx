import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Analytics: React.FC = () => {
  // Sample data for charts
  const efficiencyData = [
    { month: 'Jan', efficiency: 85, fuelSavings: 1200 },
    { month: 'Feb', efficiency: 88, fuelSavings: 1500 },
    { month: 'Mar', efficiency: 92, fuelSavings: 1800 },
    { month: 'Apr', efficiency: 89, fuelSavings: 1600 },
    { month: 'May', efficiency: 94, fuelSavings: 2100 },
    { month: 'Jun', efficiency: 91, fuelSavings: 1900 },
  ];

  const routeData = [
    { name: 'Completed', value: 245, color: '#4caf50' },
    { name: 'In Progress', value: 67, color: '#2196f3' },
    { name: 'Delayed', value: 23, color: '#ff9800' },
    { name: 'Cancelled', value: 12, color: '#f44336' },
  ];

  const vehicleUtilization = [
    { vehicle: 'Truck-001', utilization: 92 },
    { vehicle: 'Truck-002', utilization: 88 },
    { vehicle: 'Truck-003', utilization: 95 },
    { vehicle: 'Truck-004', utilization: 78 },
    { vehicle: 'Truck-005', utilization: 85 },
  ];

  const deliveryPerformance = [
    { time: '8:00', onTime: 95, delayed: 5 },
    { time: '10:00', onTime: 92, delayed: 8 },
    { time: '12:00', onTime: 98, delayed: 2 },
    { time: '14:00', onTime: 89, delayed: 11 },
    { time: '16:00', onTime: 94, delayed: 6 },
    { time: '18:00', onTime: 91, delayed: 9 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Efficiency Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Route Efficiency & Fuel Savings Trends
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Efficiency (%)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="fuelSavings"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Fuel Savings ($)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Route Status Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Route Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={routeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {routeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Vehicle Utilization */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Vehicle Utilization Rates
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={vehicleUtilization}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilization" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Delivery Performance */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Performance by Time
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={deliveryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" stackId="a" fill="#4caf50" name="On Time" />
                <Bar dataKey="delayed" stackId="a" fill="#f44336" name="Delayed" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Key Metrics Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Average Route Time
                  </Typography>
                  <Typography variant="h5" component="div">
                    2h 15m
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -8% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Fuel Efficiency
                  </Typography>
                  <Typography variant="h5" component="div">
                    8.2 L/100km
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    -12% consumption
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Customer Satisfaction
                  </Typography>
                  <Typography variant="h5" component="div">
                    4.7/5
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +0.3 from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Cost Savings
                  </Typography>
                  <Typography variant="h5" component="div">
                    $12,450
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +15% this quarter
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
