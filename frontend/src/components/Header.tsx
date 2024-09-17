import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <Link to="/">
          <img src="/logo.png" alt="Application Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <UserMenu />
    </header>
  );
};

export default Header;