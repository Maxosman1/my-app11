// Logout.js
import { useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Logout = () => {
  useEffect(() => {
    const signOut = async () => {
      await supabase.auth.signOut();
      window.location.href = '/login';
    };

    signOut();
  }, []);

  return null; // This component does not render anything
};

export default Logout;
