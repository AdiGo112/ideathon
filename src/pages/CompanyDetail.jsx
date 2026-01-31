import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import '../styles/Styles.css';

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCompanyById, posts } = useApp();
  const [activeTab, setActiveTab] = useState('interview');

  const company = getCompanyById(parseInt(id));

  if (!company) {
    return (
      <div className="company-detail-page">
        <div className="not-found">
          <h2>Company not found</h2>
          <button onClick={() => navigate('/companies')}>View All Companies</button>
        </div>
      </div>
    );
  }

  // Get all posts related to this company
  const companyPosts = posts.filter(post => post.companyId === company.id);

  // Filter posts by tab
  const getFilteredPosts = () => {
    switch (activeTab) {
      case 'interview':
        return companyPosts.filter(post => post.postType === 'Interview Experience');
      case 'resources':
        return companyPosts.filter(post => post.postType === 'Resource');
      case 'discussions':
        return companyPosts.filter(post => 
          post.postType === 'Question' || post.postType === 'Discussion'
        );
      default:
        return companyPosts;
    }
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="company-detail-page">
      <div className="company-header">
        <div className="company-logo-large">{company.logo}</div>
        <div className="company-info">
          <h1>{company.name}</h1>
          <p className="company-stats">{company.threadCount} total threads</p>
        </div>
      </div>

      <div className="company-tabs">
        <button
          className={`tab ${activeTab === 'interview' ? 'active' : ''}`}
          onClick={() => setActiveTab('interview')}
        >
          Interview Experiences
        </button>
        <button
          className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          Resources
        </button>
        <button
          className={`tab ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
      </div>

      <div className="company-content">
        {filteredPosts.length === 0 ? (
          <div className="no-posts">
            <p>No {activeTab === 'interview' ? 'interview experiences' : activeTab} yet for this company.</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;