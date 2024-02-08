// Signup.js
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import { supabase } from './AuthProvider'; // Adjust the path as needed

const signUp = async ({ email, password }) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return user;
};

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => navigate('/login'),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate({ email, password });
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
          {isLoading && <CircularProgress size={24} sx={{ mt: 2, mb: 1, alignSelf: 'center' }} />}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          {error && <Typography color="error">{error.message}</Typography>}
          <Link href="/login" variant="body2">
            {"Already have an account? Log in"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
