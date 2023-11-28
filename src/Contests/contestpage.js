import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import { Typography, Button, Container, Grid, Card, CardContent, Box } from '@mui/material';
import Countdown from 'react-countdown';
import { TikTokEmbed, YoutubeEmbed } from 'react-social-media-embed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ContestPage = () => {
  const { contestId } = useParams();
  const [topVideos, setTopVideos] = useState([]);
  const [contest, setContest] = useState(null);

  useEffect(() => {
    fetchContest();
    fetchTopVideos();
  }, [contestId]);

  const fetchContest = async () => {
    try {
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .eq('id', contestId)
        .single();

      if (error) throw error;
      setContest(data);
    } catch (error) {
      console.error('Error fetching contest', error);
    }
  };

  const fetchTopVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('contest_id', contestId)
        .order('votes', { ascending: false })
        .limit(3);

      if (error) throw error;
      setTopVideos(data);
    } catch (error) {
      console.error('Error fetching top videos', error);
    }
  };

  const renderVideoEmbed = (videoUrl) => {
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      return <YoutubeEmbed url={videoUrl} />;
    } else if (videoUrl.includes('tiktok.com')) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  const countdownRenderer = ({ days, hours, minutes, seconds }) => {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <AccessTimeIcon color="action" />
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          {days}d {hours}h {minutes}m {seconds}s left
        </Typography>
      </Box>
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom component="div">
        {contest?.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {contest?.description}
      </Typography>
      {contest?.start_time && (
        <Box my={2} sx={{ backgroundColor: '#008000', p: 2, borderRadius: 2 }}>
          <Countdown
            date={new Date(new Date(contest.start_time).getTime() + 12 * 24 * 60 * 60 * 1000)}
            renderer={countdownRenderer}
          />
        </Box>
      )}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item>
          <Button component={Link} to={`/contest/${contestId}/joincontest`} variant="contained" color="primary">
            Join Contest
          </Button>
        </Grid>
        <Grid item>
          <Button component={Link} to={`/contest/${contestId}/submissions`} variant="outlined" color="secondary">
            All Submissions
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" gutterBottom component="div">
        Top Videos
      </Typography>
      <Grid container spacing={2}>
        {topVideos.map((video, index) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card>
              {renderVideoEmbed(video.video_url)}
              <CardContent>
                <Typography variant="h6" component="div">
                  {video.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContestPage;
