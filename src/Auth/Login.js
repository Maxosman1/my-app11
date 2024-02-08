// AuthProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://uwixomogyvygqonywfqz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aXhvbW9neXZ5Z3Fvbnl3ZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MTgzNjQsImV4cCI6MjAxNTk5NDM2NH0.hAb1Q6wiv4JbAPLprFAeopOa3-Eizf9w8Hasg7JCmvo"; // Replace with your actual anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
      setLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setUser(null);
      } else if (event === "SIGNED_IN") {
        setUser(session.user);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    await supabase.auth.signIn({ provider: 'google' });
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const passwordReset = async (email) => {
    return supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password"
    });
  };

  const updatePassword = async (accessToken, newPassword) => {
    return supabase.auth.api.updateUser(accessToken, { password: newPassword });
  };

  const value = {
    user,
    isLoading: loading,
    loginWithGoogle,
    signOut,
    passwordReset,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
