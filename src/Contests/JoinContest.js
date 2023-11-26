import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { TextField, Button, Typography, Container, Checkbox, FormControlLabel } from '@mui/material';

const JoinContest = () => {
  const { contestId } = useParams();
  const [videoLink, setVideoLink] = useState('');
  const [description, setDescription] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleVideoSubmission = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('You must accept the terms and conditions.');
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        { 
          contest_id: contestId,
          user_id: supabase.auth.user().id, // Assumes user is logged in
          video_url: videoLink,
          description: description,
          // Additional metadata like votes can be initialized here
        }
      ]);

    if (error) {
      alert(error.message);
    } else {
      alert('Your video has been submitted!');
      // Clear the form or navigate the user away from the join contest page
    }
    setSubmitting(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">Join Contest</Typography>
      {/* Rules list here */}
      <TextField
        fullWidth
        label="Enter video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Enter video description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />}
        label="I agree to the contest's Terms and Conditions"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVideoSubmission}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Upload'}
      </Button>
    </Container>
  );
};

export default JoinContest;
