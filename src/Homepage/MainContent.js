import React from 'react';
import ContestCard from './ContestCard';
import RewardCard from './RewardCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const MainContent = () => (
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
          Your Points: 0
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

export default MainContent;
