import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button, Container, CssBaseline, Typography, Box, CircularProgress, Link, Snackbar, TextField } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient'; // Adjust the path as needed

const signIn = async ({ email, password }) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return user;
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { mutate, isLoading, error } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setOpenSnackbar(true);
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate('/profile');
      }, 2000);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ email, password });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {session ? (
          <div>
            <Typography component="h1" variant="h5">
              Logged in!
            </Typography>
            {/* You can add more components or content for the logged-in state */}
          </div>
        ) : (
          <div>
            <Typography component="h1" variant="h5">Login</Typography>
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
                Login
              </Button>
              {error && <Typography color="error">{error.message}</Typography>}
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <MuiAlert elevation={6} variant="filled" severity="success">
                Login successful! Redirecting to profile...
              </MuiAlert>
            </Snackbar>
          </div>
        )}
      </Box>
    </Container>
  );
};

export default Login;
