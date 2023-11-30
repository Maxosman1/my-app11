import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "https://uwixomogyvygqonywfqz.supabase.co";
const supabaseAnonKey = "your-supabase-anon-key"; // Replace with your actual anon key
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
      authListener.subscription.unsubscribe()    };
  }, []);

  const login = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
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
    login,
    signOut,
    passwordReset,
    updatePassword,
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        // ... (authentication functions like login, signOut, etc.)
      }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;