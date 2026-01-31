import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LeftSidebar = () => {
  const { communities } = useApp();

  return (
    <aside className="left-sidebar">
      <div className="sidebar-section">
        <Link to="/" className="nav-item active">
          <span className="nav-icon">🏠</span>
          Home
        </Link>
      </div>

      <div className="sidebar-section">
        <div className="section-title">Communities</div>
        {communities.slice(0, 4).map(community => (
          <Link
            key={community.id}
            to={`/community/${community.id}`}
            className="nav-item"
          >
            <span className="nav-icon">👥</span>
            <div className="community-info">
              <div className="community-name">{community.name}</div>
              <div className="community-members">
                {community.memberCount.toLocaleString()} members
              </div>
            </div>
          </Link>
        ))}
        <Link to="/communities" className="nav-item view-all">
          View All Communities →
        </Link>
      </div>

      <div className="sidebar-section">
        <Link to="/companies" className="nav-item">🏢 Companies</Link>
        <Link to="/resources" className="nav-item">📚 Resources</Link>
        <Link to="/bookmarks" className="nav-item">🔖 Bookmarks</Link>
      </div>
    </aside>
  );
};

export default LeftSidebar;
