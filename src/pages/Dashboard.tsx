import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  LocalShipping as TruckIcon,
  Route as RouteIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Active Routes',
      value: '24',
      icon: <RouteIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      change: '+12%',
    },
    {
      title: 'Total Drivers',
      value: '156',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      change: '+5%',
    },
    {
      title: 'Fleet Vehicles',
      value: '89',
      icon: <TruckIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      change: '+2%',
    },
    {
      title: 'Efficiency Rate',
      value: '94.2%',
      icon: <TrendingUpIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      change: '+3.1%',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="success.main">
                  {stat.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Route Optimization Status
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Current Route Efficiency
              </Typography>
              <LinearProgress variant="determinate" value={94} sx={{ mt: 1, height: 10 }} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                94% efficiency achieved
              </Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                • Route #1234 optimized - 15% fuel savings
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                • Driver John Smith completed delivery
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                • New vehicle added to fleet
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                • Maintenance scheduled for Truck #45
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
