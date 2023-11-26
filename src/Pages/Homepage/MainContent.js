import React from 'react';
import ContestCard from './ContestCard';
import RewardCard from './RewardCard';
import './MainContent.css';

const MainContent = () => (
    <main className="main-content">
        <h2>Welcome to STYRATE</h2>
        <p>Join exciting video contests and earn rewards!</p>
        <div className="points">Your Points: 0</div>
        <div className="card-container">
            <ContestCard />
            <RewardCard />
        </div>
    </main>
);
export default MainContent;