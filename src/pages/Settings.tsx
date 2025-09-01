import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: 'Logistics Corp',
    email: 'admin@logistics.com',
    phone: '+1-555-0123',
    address: '123 Logistics Way, City, State 12345',
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      routeUpdates: true,
      maintenanceReminders: true,
    },
    apiSettings: {
      awsRegion: 'us-east-1',
      apiGatewayUrl: 'https://your-api-gateway-url.amazonaws.com',
      iotEndpoint: 'your-iot-endpoint.amazonaws.com',
    },
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value,
      },
    }));
  };

  const handleApiSettingChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      apiSettings: {
        ...prev.apiSettings,
        [field]: value,
      },
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {saveStatus === 'saved' && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Settings saved successfully!
        </Alert>
      )}

      {saveStatus === 'error' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Error saving settings. Please try again.
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Company Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Company Information" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={settings.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={settings.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={settings.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Notification Settings" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.emailAlerts}
                      onChange={(e) => handleNotificationChange('emailAlerts', e.target.checked)}
                    />
                  }
                  label="Email Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.smsAlerts}
                      onChange={(e) => handleNotificationChange('smsAlerts', e.target.checked)}
                    />
                  }
                  label="SMS Alerts"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.routeUpdates}
                      onChange={(e) => handleNotificationChange('routeUpdates', e.target.checked)}
                    />
                  }
                  label="Route Updates"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications.maintenanceReminders}
                      onChange={(e) => handleNotificationChange('maintenanceReminders', e.target.checked)}
                    />
                  }
                  label="Maintenance Reminders"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* AWS Integration Settings */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="AWS Integration Settings" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="AWS Region"
                    value={settings.apiSettings.awsRegion}
                    onChange={(e) => handleApiSettingChange('awsRegion', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="API Gateway URL"
                    value={settings.apiSettings.apiGatewayUrl}
                    onChange={(e) => handleApiSettingChange('apiGatewayUrl', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="IoT Endpoint"
                    value={settings.apiSettings.iotEndpoint}
                    onChange={(e) => handleApiSettingChange('iotEndpoint', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Data Management */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Data Management" />
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Export Data
                </Button>
                <Button
                  variant="outlined"
                  color="warning"
                >
                  Backup Database
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                >
                  Clear Cache
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="textSecondary">
                Last backup: 2024-01-15 14:30 UTC
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
