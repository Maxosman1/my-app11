import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import supabase from './supabaseClient'; // Adjust the import path as needed
import Header from './Components/Header/Header';
import Contests from './contests';
import Rewards from './rewards';
import ContestPage from './Contests/contestpage';
import ContestSubmissionsPage from './Contests/Submissions';
import JoinContest from './Contests/JoinContest';
import Profile from './Auth/Profile';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import { AuthProvider } from './Auth/useAuth';
import MainContent from './Homepage/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
    <SessionContextProvider supabaseClient={supabase}>
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
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </SessionContextProvider>
    </AuthProvider>
  );
};

export default App;
