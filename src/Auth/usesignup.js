// useSignUp.js
import { useState } from 'react';
import supabase from '../supabaseClient';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async (email, password) => {
    setLoading(true);
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { signUp, loading, error };
};

export default SignUp;
