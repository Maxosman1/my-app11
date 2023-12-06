import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './Auth/AuthProvider';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Add this import
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



const queryClient = new QueryClient();

// Define your MUI theme
const theme = createTheme();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
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
  );
};

export default App;
