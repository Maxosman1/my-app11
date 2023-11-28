import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Icon from '@mui/icons-material/CardGiftcard'; // Replace with your choice of icon
import ButtonBase from '@mui/material/ButtonBase';
import { useNavigate } from 'react-router-dom';

const RewardCard = () => {
  const navigate = useNavigate();

  return (
    <ButtonBase onClick={() => navigate('/rewards')} style={{ width: '100%' }}>
      <Card sx={{ minWidth: 275, boxShadow: 3 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Rewards
          </Typography>
          <Icon sx={{ fontSize: 40 }} />
          <Typography variant="h5" component="div">
            Discover Your Rewards.
          </Typography>
          <Typography variant="body2">
            Earn exciting rewards by participating in contests.
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
};

export default RewardCard;
