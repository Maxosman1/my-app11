import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'react-auth-kit';
import { Container, CssBaseline, Typography, Box, TextField, Button } from '@mui/material';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await auth.signIn({ email, password });
      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
