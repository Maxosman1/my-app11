// ReviewPage.js
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { TikTokEmbed } from 'react-social-media-embed';
import supabase from '../supabaseClient'; // Adjust the path as needed;

const ReviewPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]);
  const [videoReviews, setVideoReviews] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchVideoReviews();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    // Fetch distinct categories from your database excluding 'Opinion'
    const { data, error } = await supabase
      .from('videos')
      .select('categories')
      .distinct('categories')
      .ne('categories', 'Opinion');

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(['All', ...data.map((category) => category.categories)]);
    }
  };

  const fetchVideoReviews = async () => {
    // Fetch video reviews from your database based on the selected category
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('categories', selectedCategory === 'All' ? null : selectedCategory)
      .ne('categories', 'Opinion');

    if (error) {
      console.error('Error fetching video reviews:', error);
    } else {
      setVideoReviews(data || []);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFilterClick = () => {
    fetchVideoReviews();
  };

  const isYouTubeLink = (url) => /youtu(be.com|\.be)/.test(url);
  const isTikTokLink = (url) => /tiktok\.com/.test(url);

  const renderVideoEmbed = (videoUrl) => {
    if (isYouTubeLink(videoUrl)) {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return <iframe width="100%" height="315" src={embedUrl} frameBorder="0" allowFullScreen title="YouTube Video"></iframe>;
    } else if (isTikTokLink(videoUrl)) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h4" gutterBottom component="div">
          Video Reviews
        </Typography>
        <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilterClick}>
          Filter
        </Button>
      </Box>
      <Grid container spacing={2}>
        {videoReviews.map((review) => (
          <Grid item key={review.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', textAlign: 'center' }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {review.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontStyle: 'italic' }}>
                  {review.categories && review.categories.join(', ')}
                </Typography>
              </CardContent>

              {renderVideoEmbed(review.video_url)}

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {review.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReviewPage;
