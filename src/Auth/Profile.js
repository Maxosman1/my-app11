// Profile.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Button, TextField, Container, Typography, Avatar } from '@mui/material';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [points, setPoints] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, bio, avatar_url, points`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setBio(data.bio);
        setAvatarUrl(data.avatar_url);
        setPoints(data.points);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onAvatarUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const onAvatarUpload = async (filePath) => {
    const { data, error: urlError } = await supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (urlError) {
      throw urlError;
    }

    setAvatarUrl(data.publicURL);
    updateProfile({ avatar_url: data.publicURL }); // Call update profile to save the new avatar URL
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const newUpdates = {
        id: user.id,
        username,
        website,
        bio,
        ...updates,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(newUpdates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">Profile</Typography>
      <Avatar
        src={avatarUrl}
        sx={{ width: 56, height: 56, marginBottom: 2 }}
      />
      <Button
        variant="contained"
        component="label"
        disabled={uploading}
      >
        Upload Avatar
        <input
          type="file"
          hidden
          onChange={handleAvatarUpload}
        />
      </Button>
      <Typography variant="subtitle1">{`Points: ${points}`}</Typography>
      {/* ... rest of the profile fields */}
    </Container>
  );
};

export default Profile;
