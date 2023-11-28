import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabaseClient';
import { Card, CardContent, Typography, Container, Button, Box } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TikTokEmbed, YoutubeEmbed } from 'react-social-media-embed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Submissions = () => {
  const { contestId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [contestLabel, setContestLabel] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const submissionsPerPage = 10;

  useEffect(() => {
    fetchContestLabel();
    fetchSubmissions(page);
  }, [page, contestId]);

  const fetchContestLabel = async () => {
    const { data, error } = await supabase
      .from('contests')
      .select('title')
      .eq('id', contestId)
      .single();

    if (error) {
      console.error('Error fetching contest label:', error);
    } else {
      setContestLabel(data.label);
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
    const submission = submissions.find(sub => sub.id === submissionId);
    if (!submission) return;

    const voteType = isUpvote ? 'upvotes' : 'downvotes';
    const updatedVotes = (submission[voteType] || 0) + 1;

    const { error } = await supabase
      .from('videos')
      .update({ [voteType]: updatedVotes })
      .eq('id', submissionId);

    if (error) {
      console.error('Error updating vote:', error);
    } else {
      setSubmissions(submissions.map(sub => {
        if (sub.id === submissionId) {
          return { ...sub, [voteType]: updatedVotes };
        }
        return sub;
      }));
    }
  };

  const renderVideoEmbed = (videoUrl) => {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      return <YoutubeEmbed url={videoUrl} />;
    } else if (videoUrl.includes("tiktok.com")) {
      return <TikTokEmbed url={videoUrl} />;
    }
    return <Typography>Unsupported video platform</Typography>;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>{contestLabel}</Typography>
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
              <Typography variant="h6" component="div" guttercenter>
                {submission.title}
              </Typography>
              {renderVideoEmbed(submission.video_url)}
              <Typography variant="body2" color="text.secondary" gutterCenter>
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
