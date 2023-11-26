import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../src/Components/Header/Header';
import Contests from '../src/contests'; // Ensure this path is correct
import Rewards from '../src/rewards'; // Ensure this path is correct
import ContestPage from '../src/Contests/contestpage'; // Ensure this path is correct
import MainContent from '../src/Homepage/MainContent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contests" element={<Contests />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/contest/:contestId" element={<ContestPage />} />

        {/* You can add more routes here as needed */}
      </Routes>
    </div>
  </Router>
);

export default App;
