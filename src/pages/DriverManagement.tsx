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
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status: 'active' | 'inactive' | 'on-leave';
  vehicle: string;
  experience: string;
  rating: number;
}

const DriverManagement: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@logistics.com',
      phone: '+1-555-0123',
      licenseNumber: 'DL123456789',
      status: 'active',
      vehicle: 'Truck-001',
      experience: '5 years',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@logistics.com',
      phone: '+1-555-0456',
      licenseNumber: 'DL987654321',
      status: 'active',
      vehicle: 'Truck-002',
      experience: '3 years',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike.davis@logistics.com',
      phone: '+1-555-0789',
      licenseNumber: 'DL456789123',
      status: 'on-leave',
      vehicle: 'Unassigned',
      experience: '7 years',
      rating: 4.9,
    },
  ]);

  const [open, setOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const handleAddDriver = () => {
    setEditingDriver(null);
    setOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
    setOpen(true);
  };

  const handleDeleteDriver = (id: string) => {
    setDrivers(drivers.filter(driver => driver.id !== id));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingDriver(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'on-leave':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Driver Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddDriver}
        >
          Add Driver
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Driver</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>License</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 2 }}>{driver.name.charAt(0)}</Avatar>
                    <Typography variant="body1">{driver.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{driver.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2">{driver.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{driver.licenseNumber}</TableCell>
                <TableCell>
                  <Chip
                    label={driver.status}
                    color={getStatusColor(driver.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>{driver.vehicle}</TableCell>
                <TableCell>{driver.experience}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {driver.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ★
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleEditDriver(driver)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteDriver(driver.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDriver ? 'Edit Driver' : 'Add New Driver'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={editingDriver?.name || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                defaultValue={editingDriver?.email || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                defaultValue={editingDriver?.phone || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="License Number"
                defaultValue={editingDriver?.licenseNumber || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Experience"
                defaultValue={editingDriver?.experience || ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle Assignment"
                defaultValue={editingDriver?.vehicle || ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            {editingDriver ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DriverManagement;
