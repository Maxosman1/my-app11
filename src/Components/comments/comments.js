import React, { useState, useEffect } from 'react';
import supabase from '../supabaseClient'; // Adjust the path as needed

const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('video_id', videoId);

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data);
    }
  };

  const handleSubmit = async () => {
    const user = supabase.auth.user();
    if (!user) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        { video_id: videoId, user_id: user.id, content: newComment }
      ]);

    if (error) {
      console.error('Error submitting comment:', error);
    } else {
      setComments([...comments, data[0]]);
      setNewComment('');
    }
  };

  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          {/* Additional comment details */}
        </div>
      ))}
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={handleSubmit}>Submit Comment</button>
    </div>
  );
};

export default CommentsSection;
