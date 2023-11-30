import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import { Card, CardContent, Typography, Container, Button, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TikTokEmbed } from 'react-social-media-embed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Submissions = () => {
  const { contestId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [contestDetails, setContestDetails] = useState({ label: '', points: 0 });
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const submissionsPerPage = 10;

  useEffect(() => {
    fetchContestDetails();
    fetchSubmissions(page);
  }, [page, contestId]);

  const fetchContestDetails = async () => {
    const { data, error } = await supabase
      .from('contests')
      .select('title, point_value')
      .eq('id', contestId)
      .single();

    if (error) {
      console.error('Error fetching contest details:', error);
    } else {
      setContestDetails({ label: data.title, points: data.point_value });
    }
  };

  const fetchSubmissions = async (currentPage) => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('contest_id', contestId)
      .range(currentPage * submissionsPerPage, (currentPage + 1) * submissionsPerPage - 1);

    if (error) {
      console.error('Error fetching submissions:', error);
      setHasMore(false);
    } else {
      setSubmissions(prev => [...prev, ...data]);
      setHasMore(data.length === submissionsPerPage);
      setPage(currentPage + 1);
    }
  };

  const handleVote = async (submissionId, isUpvote) => {
    // Voting logic implementation
  };

  const renderVideoEmbed = (videoUrl) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return <iframe src={`https://www.youtube.com/embed/${videoUrl.split('v=')[1].split('&')[0]}`} frameBorder="0" allowFullScreen title="YouTube Video"></iframe>;
    } else if (videoUrl.includes("tiktok.com")) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {contestDetails.label} - Win {contestDetails.points} Points
      </Typography>
      <InfiniteScroll
        dataLength={submissions.length}
        next={() => fetchSubmissions(page)}
        hasMore={hasMore}
        loader={<Typography>Loading...</Typography>}
        endMessage={<Typography style={{ textAlign: 'center' }}>You have seen all submissions</Typography>}
      >
        {submissions.map((submission) => (
          <Card key={submission.id} sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {submission.title}
              </Typography>
              {renderVideoEmbed(submission.video_url)}
              <Typography variant="body2" color="text.secondary">
                {submission.description}
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                <Button onClick={() => handleVote(submission.id, true)} startIcon={<ArrowUpwardIcon />}>
                  Upvote {submission.upvotes || 0}
                </Button>
                <Button onClick={() => handleVote(submission.id, false)} startIcon={<ArrowDownwardIcon />}>
                  Downvote {submission.downvotes || 0}
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Submissions;
