// useFetchPoints.js
import { useState } from 'react';
import supabase from '../supabaseClient';

const useFetchPoints = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPoints = async (userId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('profiles').select('points').eq('user_id', userId).single();
      if (error) throw error;
      return data?.points;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fetchPoints, loading, error };
};

export default useFetchPoints;
