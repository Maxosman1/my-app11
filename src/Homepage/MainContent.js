import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import supabase from '../supabaseClient'; // Adjust the path as needed
import { TikTokEmbed } from 'react-social-media-embed';

const MainContent = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [topVideos, setTopVideos] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser) {
        fetchPoints(currentUser);
      }
    };

    const fetchPoints = async (currentUser) => {
      const { data } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', currentUser.id)
        .single();

      if (data) {
        setPoints(data.points);
      }
    };

    const fetchTopVideos = async () => {
      const { data } = await supabase
        .from('videos')
        .select(`
          id,
          title,
          video_url,
          contests (title)
        `)
        .order('votes', { ascending: false })
        .limit(3);

      if (data) {
        setTopVideos(data);
      }
    };

    checkUser();
    fetchTopVideos(); // Fetch top videos
  }, []);

  const isYouTubeLink = (url) => /youtu(be.com|\.be)/.test(url);
  const isTikTokLink = (url) => /tiktok\.com/.test(url);

  const renderVideoEmbed = (videoUrl) => {
    if (isYouTubeLink(videoUrl)) {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return <iframe width="560" height="315" src={embedUrl} frameBorder="0" allowFullScreen title="YouTube Video"></iframe>;
    } else if (isTikTokLink(videoUrl)) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  const renderVideoGrid = (videos, title) => (
    <>
      <Typography variant="h5" gutterBottom component="div">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {videos.map((video) => (
          <Grid item key={video.id} xs={12} sm={6} md={4}>
            <Card>
              {/* Title and Contest Category Section */}
              <CardContent sx={{ backgroundColor: '#f5f5f5  ', color: 'black', textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {video.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                  {video.contests && video.contests.title}
                </Typography>
              </CardContent>
  
              {/* Video Embed Section */}
              {renderVideoEmbed(video.video_url)}
  
              {/* Additional Content - Video Description */}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {video.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom component="div" sx={{ textAlign: 'center', mt: 4 }}>
        Welcome to CURATRS
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" sx={{ textAlign: 'center' }}>
        Join exciting video contests and earn rewards!
      </Typography>
      <Card sx={{ mx: 'auto', mb: 3, p: 2, maxWidth: 300, backgroundColor: '#ff416c', color: 'white' }}>
        {user ? (
          <Typography variant="body1" component="div" sx={{ textAlign: 'center' }}>
            Your Points: {points}
          </Typography>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Typography variant="body1" component="div">
              Please log in to see your points
            </Typography>
            <Button variant="contained" color="primary" onClick={() => {/* Add login logic here */}}>Log In</Button>
          </div>
        )}
      </Card>
      {renderVideoGrid(topVideos, "Top Videos")}
    </Container>
  );
};

export default MainContent;
