import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Divider,
  Container,
  Tab,
  Tabs,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Auth } from 'aws-amplify';
import '../aws-config'; // Import AWS configuration

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { signIn: authSignIn, signUp: authSignUp, isAuthenticated } = useAuth();
  
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Sign In State
  const [signInForm, setSignInForm] = useState({
    email: '',
    password: '',
  });

  // Sign Up State
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });

  // Confirm Sign Up State
  const [confirmForm, setConfirmForm] = useState({
    email: '',
    confirmationCode: '',
  });

  // Forgot Password State
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    newPassword: '',
    confirmationCode: '',
  });

  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [needsPasswordReset, setNeedsPasswordReset] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError(null);
    setSuccess(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authSignIn(signInForm.email, signInForm.password);
      setSuccess('Successfully signed in!');
      
      // Navigation will be handled by useEffect when isAuthenticated changes
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await authSignUp(
        signUpForm.email,
        signUpForm.password,
        signUpForm.email,
        signUpForm.name
      );

      console.log('Sign up success:', result);
      setSuccess('Account created! Please check your email for confirmation code.');
      setConfirmForm({ ...confirmForm, email: signUpForm.email });
      setNeedsConfirmation(true);
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Auth.confirmSignUp(confirmForm.email, confirmForm.confirmationCode);
      setSuccess('Email confirmed! You can now sign in.');
      setNeedsConfirmation(false);
      setTabValue(0);
    } catch (error: any) {
      console.error('Confirm sign up error:', error);
      setError(error.message || 'Failed to confirm email');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Auth.forgotPassword(forgotPasswordForm.email);
      setSuccess('Password reset code sent to your email!');
      setNeedsPasswordReset(true);
    } catch (error: any) {
      console.error('Forgot password error:', error);
      setError(error.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await Auth.forgotPasswordSubmit(
        forgotPasswordForm.email,
        forgotPasswordForm.confirmationCode,
        forgotPasswordForm.newPassword
      );
      setSuccess('Password reset successful! You can now sign in.');
      setNeedsPasswordReset(false);
      setTabValue(0);
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    try {
      await Auth.resendSignUp(confirmForm.email);
      setSuccess('Confirmation code resent!');
    } catch (error: any) {
      setError(error.message || 'Failed to resend confirmation code');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Logistics Management
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center" sx={{ mb: 3 }}>
            Secure authentication with AWS Cognito
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          {needsConfirmation ? (
            <Box component="form" onSubmit={handleConfirmSignUp}>
              <Typography variant="h6" gutterBottom>
                Confirm Your Email
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={confirmForm.email}
                onChange={(e) => setConfirmForm({ ...confirmForm, email: e.target.value })}
                required
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Confirmation Code"
                value={confirmForm.confirmationCode}
                onChange={(e) => setConfirmForm({ ...confirmForm, confirmationCode: e.target.value })}
                required
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Confirming...' : 'Confirm Email'}
              </Button>
              <Link
                component="button"
                variant="body2"
                onClick={handleResendConfirmation}
                sx={{ display: 'block', textAlign: 'center' }}
              >
                Resend confirmation code
              </Link>
            </Box>
          ) : needsPasswordReset ? (
            <Box component="form" onSubmit={handleResetPassword}>
              <Typography variant="h6" gutterBottom>
                Reset Password
              </Typography>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={forgotPasswordForm.email}
                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, email: e.target.value })}
                required
                margin="normal"
                disabled
              />
              <TextField
                fullWidth
                label="Confirmation Code"
                value={forgotPasswordForm.confirmationCode}
                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, confirmationCode: e.target.value })}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={forgotPasswordForm.newPassword}
                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, newPassword: e.target.value })}
                required
                margin="normal"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs">
                  <Tab label="Sign In" />
                  <Tab label="Sign Up" />
                  <Tab label="Forgot Password" />
                </Tabs>
              </Box>

              <TabPanel value={tabValue} index={0}>
                <Box component="form" onSubmit={handleSignIn}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                    required
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box component="form" onSubmit={handleSignUp}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={signUpForm.name}
                    onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={signUpForm.email}
                    onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                    required
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={signUpForm.password}
                    onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                    required
                    margin="normal"
                    helperText="Password must be at least 8 characters with uppercase, lowercase, and numbers"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={signUpForm.confirmPassword}
                    onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                    required
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box component="form" onSubmit={handleForgotPassword}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={forgotPasswordForm.email}
                    onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, email: e.target.value })}
                    required
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Code'}
                  </Button>
                </Box>
              </TabPanel>
            </>
          )}

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" color="textSecondary" align="center">
            AWS Cognito Configuration:
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" display="block">
            User Pool: {process.env.REACT_APP_COGNITO_USER_POOL_ID}
          </Typography>
          <Typography variant="caption" color="textSecondary" align="center" display="block">
            Region: {process.env.REACT_APP_COGNITO_REGION}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
