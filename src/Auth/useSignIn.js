// useSignIn.js
import { useState } from 'react';
import supabase from '../supabaseClient';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
};

export default useSignIn;
