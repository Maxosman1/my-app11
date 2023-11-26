// VideoCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const VideoCard = ({ searchText, imgLink, genre, title, releaseDate }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 4 }}> {/* Example of adding inline styles with MUI's 'sx' prop */}
      <CardMedia
        component="img"
        height="160"
        image={imgLink}
        alt={`Thumbnail for ${title}`}
      />
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {searchText}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {genre}
        </Typography>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {releaseDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
