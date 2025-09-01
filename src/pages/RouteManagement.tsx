import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Map as MapIcon,
} from '@mui/icons-material';

interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  status: 'active' | 'completed' | 'planned';
  driver: string;
  vehicle: string;
  estimatedTime: string;
  distance: string;
}

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: '1',
      name: 'Route A-001',
      origin: 'Warehouse A',
      destination: 'Customer Center B',
      status: 'active',
      driver: 'John Smith',
      vehicle: 'Truck-001',
      estimatedTime: '2h 30m',
      distance: '45.2 km',
    },
    {
      id: '2',
      name: 'Route B-002',
      origin: 'Warehouse B',
      destination: 'Distribution Center C',
      status: 'planned',
      driver: 'Sarah Johnson',
      vehicle: 'Truck-002',
      estimatedTime: '1h 45m',
      distance: '28.7 km',
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const handleAddRoute = () => {
    setEditingRoute(null);
    setOpen(true);
  };

  const handleEditRoute = (route: Route) => {
    setEditingRoute(route);
    setOpen(true);
  };

  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter(route => route.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingRoute(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'completed':
        return 'default';
      case 'planned':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Route Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRoute}
        >
          Add Route
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route Name</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Est. Time</TableCell>
              <TableCell>Distance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.id}>
                <TableCell>{route.name}</TableCell>
                <TableCell>{route.origin}</TableCell>
                <TableCell>{route.destination}</TableCell>
                <TableCell>
                  <Chip
                    label={route.status}
                    color={getStatusColor(route.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{route.driver}</TableCell>
                <TableCell>{route.vehicle}</TableCell>
                <TableCell>{route.estimatedTime}</TableCell>
                <TableCell>{route.distance}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditRoute(route)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteRoute(route.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton size="small">
                    <MapIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRoute ? 'Edit Route' : 'Add New Route'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Route Name"
                defaultValue={editingRoute?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Driver"
                defaultValue={editingRoute?.driver || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Origin"
                defaultValue={editingRoute?.origin || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Destination"
                defaultValue={editingRoute?.destination || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle"
                defaultValue={editingRoute?.vehicle || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Time"
                defaultValue={editingRoute?.estimatedTime || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            {editingRoute ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RouteManagement;
