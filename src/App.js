// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography } from '@mui/material';
import Header from './Components/Header/Header';
import MainContent from './Homepage/MainContent';
import Contests from './contests';
import Rewards from './rewards';
import ContestPage from './Contests/contestpage';
import ContestSubmissionsPage from './Contests/Submissions';
import JoinContest from './Contests/JoinContest';
import Profile from './Auth/Profile';
import EditProfile from './Auth/EditProfile';
import Contact from './contact';
import Leaderboard from './Leaderboard';
import Login from './Auth/Login';
import ReviewPage from './ReviewPage/Reviewpage';

import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient('https://uwixomogyvygqonywfqz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3aXhvbW9neXZ5Z3Fvbnl3ZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0MTgzNjQsImV4cCI6MjAxNTk5NDM2NH0.hAb1Q6wiv4JbAPLprFAeopOa3-Eizf9w8Hasg7JCmvo');
const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/contest/:contestId" element={<ContestPage />} />
              <Route path="/contest/:contestId/submissions" element={<ContestSubmissionsPage />} />
              <Route path="/contest/:contestId/joincontest" element={<JoinContest />} />
              <Route
                path="/profile"
                element={
                  session ? (
                    <Profile />
                  ) : (
                    <Container component="main" maxWidth="xs">
                      <Typography component="h1" variant="h5">
                        Authentication
                      </Typography>
                      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
                    </Container>
                  )
                }
              />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route
                path="/auth"
                element={
                  <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                      Authentication
                    </Typography>
                    <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
                  </Container>
                }
              />
              <Route
                path="/login"
                element={
                  <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">
                      Login
                    </Typography>
                    <Login />
                  </Container>
                }
              />
              {/* Add a route for the ReviewPage */}
              <Route path="/reviews" element={<ReviewPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
