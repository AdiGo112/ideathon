import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const Navbar = () => {
  const { currentUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <span className="logo-icon">🎓</span>
            <span className="logo-text">CampusLoop</span>
          </Link>
        </div>
        
        <div className="navbar-center">
          <form onSubmit={handleSearch} className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search posts, users, communities..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="navbar-right">
          <div className="user-badge">
            <span className="badge-role">{currentUser.role}</span>
            <span className="badge-separator">|</span>
            <span className="badge-batch">Batch {currentUser.batch}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;