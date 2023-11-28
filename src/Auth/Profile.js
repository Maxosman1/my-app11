import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useSupabaseAuth } from '@supabase/auth-helpers-react';
import useUpdateProfile from './useUpdateProfile';
import useFetchPoints from './useFetchPoints';
import supabase from '../supabaseClient'; // Adjust the path as necessary

const Profile = () => {
  const { user } = useSupabaseAuth();
  const { updateProfile, loading: updating, error: updateError } = useUpdateProfile();
  const { fetchProfilePoints, loading: fetchingPoints, error: fetchPointsError } = useFetchPoints();
  const [profile, setProfile] = useState({ username: '', avatar_url: '' });
  const [points, setPoints] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchProfileData(user.id);
      fetchProfilePoints(user.id);
    }
  }, [user]);

  const fetchProfileData = async (userId) => {
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile({ username: data.username, avatar_url: data.avatar_url });
    } catch (error) {
      setErrorProfile(error.message);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };



  const handleUpdate = async () => {
    await updateProfile(user.id, profile);
    // Additional logic after update
  };

  if (!user) return <Typography variant="h6">Please log in</Typography>;

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Profile</Typography>
        <TextField
          margin="normal"
          fullWidth
          name="username"
          label="Username"
          type="text"
          id="username"
          value={profile.username}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          name="avatar_url"
          label="Avatar URL"
          type="text"
          id="avatar_url"
          value={profile.avatar_url}
          onChange={handleChange}
        />
        {updating || fetchingPoints || loadingProfile ? <CircularProgress size={24} sx={{ mt: 2, mb: 1, alignSelf: 'center' }} /> : null}
        <Button onClick={handleUpdate} variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Profile
        </Button>
        {updateError && <Typography color="error">{updateError}</Typography>}
        {errorProfile && <Typography color="error">{errorProfile}</Typography>}
        {fetchPointsError && <Typography color="error">{fetchPointsError}</Typography>}
        <Typography variant="body1">Points: {points}</Typography>
      </Box>
      </Container>
  );
};

export default Profile;