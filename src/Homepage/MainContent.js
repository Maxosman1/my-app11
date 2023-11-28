import React, { useState, useEffect } from 'react';
import ContestCard from './ContestCard';
import RewardCard from './RewardCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import supabase from '../supabaseClient'; // Adjust the path as needed

const MainContent = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const user = supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('points')
          .eq('id', user.id)
          .single();

        if (data) {
          setPoints(data.points);
        }
      }
    };

    fetchPoints();
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to STYRATE
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Join exciting video contests and earn rewards!
        </Typography>
        <Paper sx={{ margin: 'auto', padding: 2, maxWidth: 300, backgroundColor: '#ff416c', color: 'white', mt: 2 }}>
          <Typography variant="body1">
            Your Points: {points}
          </Typography>
        </Paper>
        <Grid container spacing={2} sx={{ justifyContent: 'center', mt: 3 }}>
          <Grid item>
            <ContestCard />
          </Grid>
          <Grid item>
            <RewardCard />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MainContent;
