// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './Auth/AuthProvider';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import supabase from './supabaseClient';
import Header from './Components/Header/Header';
import Contests from './contests';
import Rewards from './rewards';
import ContestPage from './Contests/contestpage';
import ContestSubmissionsPage from './Contests/Submissions';
import JoinContest from './Contests/JoinContest';
import Profile from './Auth/Profile';
import EditProfile from './Auth/EditProfile';
import MainContent from './Homepage/MainContent';
import Contact from './contact';
import Leaderboard from './Leaderboard';

import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient();

// Define your MUI theme
const theme = createTheme({
  palette: {
    mode: 'dark', // Set the theme mode to dark
  },
});

const App = () => {
  return (
    <Auth0Provider
      domain="dev-eevxtyxjq6ulz633.us.auth0.com"
      clientId="8Spm2KnOgkdh8NU6AFghwmVAMulioXCc"
      redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Include CssBaseline for global styles */}
          <AuthProvider>
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
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/auth" element={<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />} />
                </Routes>
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Auth0Provider>
  );
};

export default App;
