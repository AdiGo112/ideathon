import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import '../styles/Styles.css';

const Home = () => {
  const { posts, communities, companies, joinedCommunities } = useApp();
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterPostType, setFilterPostType] = useState('all');
  const [filterBatch, setFilterBatch] = useState('all');

  // Filter posts
  const filteredPosts = posts.filter(post => {
    if (filterCompany !== 'all' && post.companyId !== parseInt(filterCompany)) {
      return false;
    }
    if (filterPostType !== 'all' && post.postType !== filterPostType) {
      return false;
    }
    if (filterBatch === 'my-batch') {
      const author = post.authorId;
      // Show posts from user's batch (2026) or from faculty/pinned
      const postAuthor = useApp().getUserById(author);
      if (postAuthor.batch !== 2026 && postAuthor.role !== 'Faculty' && !post.isPinned) {
        return false;
      }
    }
    return true;
  });

  // Sort: pinned first
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  // Get trending posts (most upvotes in last 3 days)
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  const trendingPosts = [...posts]
    .filter(post => new Date(post.createdAt) > threeDaysAgo)
    .sort((a, b) => b.upvotes.length - a.upvotes.length)
    .slice(0, 5);

  return (
    <div className="home-page">
      {/* Left Sidebar */}
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
          <Link to="/companies" className="nav-item">
            <span className="nav-icon">🏢</span>
            Companies
          </Link>
          <Link to="/resources" className="nav-item">
            <span className="nav-icon">📚</span>
            Resources
          </Link>
          <Link to="/bookmarks" className="nav-item">
            <span className="nav-icon">🔖</span>
            Bookmarks
          </Link>
        </div>
      </aside>

      {/* Center Feed */}
      <main className="center-feed">
        <div className="feed-header">
          <h2>Popular Posts</h2>
        </div>

        {sortedPosts.length === 0 ? (
          <div className="no-posts">
            <p>No posts match your filters.</p>
          </div>
        ) : (
          sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        {/* Announcements */}
        <div className="sidebar-card announcements">
          <div className="card-header">
            <span className="card-icon">📢</span>
            <h3>Announcements</h3>
          </div>
          <div className="card-content">
            {posts
              .filter(post => post.postType === 'Announcement')
              .slice(0, 3)
              .map(post => (
                <Link 
                  key={post.id} 
                  to={`/post/${post.id}`}
                  className="announcement-item"
                >
                  <div className="announcement-text">{post.title}</div>
                </Link>
              ))}
          </div>
        </div>

        {/* Trending */}
        <div className="sidebar-card trending">
          <div className="card-header">
            <span className="card-icon">🔥</span>
            <h3>Trending This Week</h3>
          </div>
          <div className="card-content">
            {trendingPosts.map((post, index) => (
              <Link 
                key={post.id}
                to={`/post/${post.id}`}
                className="trending-item"
              >
                <span className="trending-number">{index + 1}</span>
                <span className="trending-text">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="sidebar-card filters">
          <div className="card-header">
            <span className="card-icon">🔍</span>
            <h3>Filters</h3>
          </div>
          <div className="card-content">
            <div className="filter-group">
              <label>Batch Filter</label>
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterBatch === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterBatch('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-btn ${filterBatch === 'my-batch' ? 'active' : ''}`}
                  onClick={() => setFilterBatch('my-batch')}
                >
                  My Batch
                </button>
              </div>
            </div>

            <div className="filter-group">
              <label>Company</label>
              <select 
                value={filterCompany} 
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                <option value="all">All Companies</option>
                {companies.map(company => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Post Type</label>
              <select 
                value={filterPostType} 
                onChange={(e) => setFilterPostType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="Interview Experience">Interview Experience</option>
                <option value="Question">Question</option>
                <option value="Announcement">Announcement</option>
                <option value="Discussion">Discussion</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Home;