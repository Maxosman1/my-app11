import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/icons-material/EmojiEvents'; // Example icon, replace with your choice

const ContestCard = () => (
  <Card sx={{ minWidth: 1000, boxShadow: 3 }}>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Contests
      </Typography>
      <Icon sx={{ fontSize: 40 }} />
      <Typography variant="h5" component="div">
        Join the Conversation.
      </Typography>
    </CardContent>
  </Card>
);

export default ContestCard;
