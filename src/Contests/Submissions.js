import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';
import { YouTubeEmbed, TikTokEmbed } from 'react-social-media-embed';

const Submissions = () => {
  const { contestId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, [contestId]);

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('contest_id', contestId);
    
    if (error) {
      console.error('Error fetching submissions:', error);
    } else {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const voteOnSubmission = async (submissionId) => {
    // Logic for voting on a submission, such as incrementing a 'votes' column
    const { data, error } = await supabase
      .from('submissions')
      .update({ votes: submission.votes + 1 })
      .eq('id', submissionId);

    if (error) {
      console.error('Error voting on submission:', error);
    } else {
      // Update the local state to reflect the new vote count
      setSubmissions(submissions.map(sub => {
        if (sub.id === submissionId) {
          return { ...sub, votes: data[0].votes };
        }
        return sub;
      }));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Submissions</Typography>
      {submissions.map((submission) => (
        <Card key={submission.id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {submission.title}
            </Typography>
            {submission.video_url.includes('youtube') ? (
              <YouTubeEmbed url={submission.video_url} />
            ) : (
              <TikTokEmbed url={submission.video_url} />
            )}
            <Typography variant="body2" color="text.secondary">
              {submission.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {submission.votes} votes
            </Typography>
            <Button onClick={() => voteOnSubmission(submission.id)}>
              Vote
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default Submissions;
