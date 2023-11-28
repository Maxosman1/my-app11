// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import useSignUp from './usesignup'; // Adjust the path according to your project structure
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading, error } = useSignUp();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await signUp(email, password);
    if (user) navigate('/login');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Sign Up</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          {loading && <CircularProgress size={24} sx={{ mt: 2, mb: 1, alignSelf: 'center' }} />}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          <Link href="/login" variant="body2">
            {"Already have an account? Log in"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
