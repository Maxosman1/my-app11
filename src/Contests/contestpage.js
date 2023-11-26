import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Card, CardMedia, CardContent, Typography, Button, Container } from '@mui/material';

const ContestPage = () => {
  const { contestId } = useParams();
  const [topVideos, setTopVideos] = useState([]);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetchContest();
    fetchTopVideos();
  }, [contestId]);

  const fetchContest = async () => {
    const { data, error } = await supabase
      .from('contests')
      .select('*')
      .eq('id', contestId)
      .single();
    
    if (error) {
      console.error('Error fetching contest', error);
    } else {
      setContest(data);
    }
  };

  const fetchTopVideos = async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('contest_id', contestId)
      .order('votes', { ascending: false })
      .limit(3);

    if (error) {
      console.error('Error fetching videos', error);
    } else {
      setTopVideos(data);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{contest?.title}</Typography>
      <Typography variant="body1">{contest?.description}</Typography>
      {/* Display contest details and countdown timer here */}
      <Button component={Link} to={`/contest/${contestId}/join`} variant="contained" color="primary">
        Join Contest
      </Button>
      <Button component={Link} to={`/contest/${contestId}/submissions`} variant="outlined" color="secondary">
        My Submissions
      </Button>
      <Typography variant="h5" gutterBottom>Top Videos</Typography>
      {topVideos.map((video, index) => (
        <Card key={video.id} sx={{ marginBottom: 2 }}>
          <CardMedia
            component="img"
            image={video.thumbnail_url} // Make sure your videos table has a thumbnail_url column
            alt={video.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {video.title}
            </Typography>
            {/* Here you could use video.embed_url to embed the video */}
            <Typography variant="body2" color="text.secondary">
              {video.votes} votes
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ContestPage;
