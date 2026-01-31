import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const Communities = () => {
  const { communities, joinedCommunities, toggleCommunityMembership } = useApp();

  const handleToggleMembership = (e, communityId) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCommunityMembership(communityId);
  };

  return (
    <div className="communities-page">
      <div className="communities-header">
        <h1>Communities</h1>
        <p>Join communities to connect with students who share your interests</p>
      </div>

      <div className="communities-grid">
        {communities.map(community => {
          const isJoined = joinedCommunities.includes(community.id);
          
          return (
            <Link 
              key={community.id} 
              to={`/community/${community.id}`}
              className="community-card"
            >
              <div className="community-card-header">
                <h3>{community.name}</h3>
                <button
                  className={`join-btn ${isJoined ? 'joined' : ''}`}
                  onClick={(e) => handleToggleMembership(e, community.id)}
                >
                  {isJoined ? 'Joined' : 'Join'}
                </button>
              </div>
              
              <p className="community-description">{community.description}</p>
              
              <div className="community-stats">
                <span className="member-count">
                  👥 {community.memberCount.toLocaleString()} members
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Communities;