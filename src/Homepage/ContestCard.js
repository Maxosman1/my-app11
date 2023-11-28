import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/icons-material/EmojiEvents'; // Replace with your choice of icon
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

const ContestCard = () => {
  const navigate = useNavigate();

  return (
    <ButtonBase onClick={() => navigate('/contests')} style={{ width: '100%' }}>
      <Card sx={{ minWidth: 275, boxShadow: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Contests
          </Typography>
          <Icon sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="div">
            Join the Conversation.
          </Typography>
          <Typography variant="body2">
            Participate in exciting video contests.
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default ContestCard;
