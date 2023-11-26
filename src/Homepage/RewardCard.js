import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/icons-material/CardGiftcard'; // Example icon, replace with your choice

const RewardCard = () => (
  <Card sx={{ minWidth: 1000, boxShadow: 3 }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Rewards
      </Typography>
      <Icon sx={{ fontSize: 40 }} />
      <Typography variant="h5" component="div">
        Discover your rewards.
      </Typography>
    </CardContent>
  </Card>
);

export default RewardCard;
