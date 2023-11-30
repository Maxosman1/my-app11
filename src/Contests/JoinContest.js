import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import { TextField, Button, Typography, Container, Checkbox, FormControlLabel } from '@mui/material';
import { TikTokEmbed, YoutubeEmbed } from 'react-social-media-embed';

const JoinContest = () => {
  const { contestId } = useParams();
  const [videoLink, setVideoLink] = useState('');
  const [title, setTitle] = useState(''); // State for the video title
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const isYouTubeLink = (url) => /youtu(be.com|\.be)/.test(url);
  const isTikTokLink = (url) => /tiktok\.com/.test(url);

  const renderVideoEmbed = (url) => {
    if (isYouTubeLink(url)) {
      return <YoutubeEmbed url={url} />;
    } else if (isTikTokLink(url)) {
      return <TikTokEmbed url={url} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  const handleVideoSubmission = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('You must accept the terms and conditions.');
      return;
    }
    if (!videoLink || (!isYouTubeLink(videoLink) && !isTikTokLink(videoLink))) {
      alert('Please enter a valid YouTube or TikTok video URL.');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('videos')
      .insert([
        { 
          contest_id: contestId,
          user_id: supabase.auth.getUser()?.id, // Assuming user is logged in
          video_url: videoLink,
          title: title, // Submit the title
          // Other necessary fields...
        }
      ]);

    if (error) {
      alert(`Submission failed: ${error.message}`);
    } else {
      alert('Your video has been submitted successfully!');
      setVideoLink('');
      setTitle('');
    }

    setSubmitting(false);
  };

  const handlePreview = () => {
    if (!videoLink || (!isYouTubeLink(videoLink) && !isTikTokLink(videoLink))) {
      alert('Please enter a valid YouTube or TikTok video URL.');
      return;
    }
    setShowPreview(true);
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h1" variant="h5">Join Contest</Typography>
      <TextField
        fullWidth
        label="Enter video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Enter video title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <FormControlLabel
        control={<Checkbox checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />}
        label="I agree to the contest's Terms and Conditions"
      />
      <Button variant="contained" color="primary" onClick={handlePreview} style={{ marginRight: '10px' }}>
        Preview
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleVideoSubmission}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Upload'}
      </Button>

      {/* Preview Section */}
      {showPreview && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Preview Submission</Typography>
          <Typography><b>Video title:</b> {title}</Typography>
          {renderVideoEmbed(videoLink)}
        </div>
      )}
    </Container>
  );
};

export default JoinContest;