import React from 'react';
import './Header.css';

const Header = () => (
    <header className="header">
        <div className="logo">STYRATE</div>
        <nav className="navigation">
            <a href="/">Home</a>
            <a href="/contests">Contests</a>
            <a href="/rewards">Rewards</a>
            <a href="/contact">Contact</a>
            <a href="/login">Login</a>
        </nav>
    </header>
);
export default Header;