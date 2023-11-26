import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../src/Components/Header/Header';
import ContestsPage from '../src/contests'; // Adjust the path as needed

import MainContent from '../src/Pages/Homepage/MainContent';
import Footer from '../src/Components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/contests" element={<ContestsPage />} />
        {/* Add other routes here */}
      </Routes>
      <Footer />
    </div>
  </Router>
);

export default App;;
