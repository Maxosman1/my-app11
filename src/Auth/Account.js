// Account.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Button, TextField, Container, Typography } from '@mui/material';

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await supabase.auth.update({
      email: email,
      password: password,
    });
    if (error) {
      alert(error.message);
    } else if (user) {
      alert('Account updated successfully');
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">Account</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </form>
    </Container>
  );
};

export default Account;
