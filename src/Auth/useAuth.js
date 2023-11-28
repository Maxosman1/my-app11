// useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import supabase from '../supabaseClient'; // Adjust the path as necessary

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const checkCurrentSession = async () => {
    const {data: { session },} = await supabase.auth.getSession();
    setUser(session?.user || null);
    setLoading(false);
  };

  const value = {
    user,
    setUser,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
