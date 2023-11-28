// useUpdateProfile.js
import { useState } from 'react';
import supabase from '../supabaseClient';

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async (userId, profileData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('profiles').upsert({ user_id: userId, ...profileData });
      if (error) throw error;
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading, error };
};

export default useUpdateProfile;
