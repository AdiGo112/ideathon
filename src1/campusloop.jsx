import React, { useState } from 'react';
import './BatchWise.css';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "TPO Update: Infosys Campus Drive Details",
    content: "Infosys will be conducting on-campus interviews for pre-final and final year students. Register by Feb 5th.",
    authorName: "Dr. Priya Sharma",
    authorRole: "Faculty",
    batch: null,
    company: null,
    postType: "Announcement",
    score: 234,
    commentsCount: 45,
    timestamp: "2 hours ago",
    isPinned: true
  },
  {
    id: 2,
    title: "Google SDE Internship Interview Experience",
    content: "Just finished my Google interview process. Happy to share my experience with coding rounds, system design, and behavioral questions.",
    authorName: "Rahul Mehta",
    authorRole: "Alumni",
    batch: "2022",
    company: "Google",
    postType: "Interview Experience",
    score: 892,
    commentsCount: 127,
    timestamp: "5 hours ago",
    isPinned: false
  },
  {
    id: 3,
    title: "Tips for First-Year Internships?",
    content: "I'm a first-year CS student looking for summer internships. What should I focus on? LeetCode, projects, or something else?",
    authorName: "Ananya Reddy",
    authorRole: "Student",
    batch: "2027",
    company: null,
    postType: "Question",
    score: 156,
    commentsCount: 89,
    timestamp: "8 hours ago",
    isPinned: false
  },
  {
    id: 4,
    title: "Referral for Microsoft SDE?",
    content: "Looking for a referral for Microsoft SDE role. I have 2 years of experience in full-stack development. Happy to share my resume.",
    authorName: "Vikram Singh",
    authorRole: "Alumni",
    batch: "2021",
    company: "Microsoft",
    postType: "Question",
    score: 67,
    commentsCount: 34,
    timestamp: "12 hours ago",
    isPinned: false
  },
  {
    id: 5,
    title: "Amazon SDE Intern OA Experience",
    content: "Completed the Amazon online assessment yesterday. 2 coding questions - one on arrays and one on graphs. Sharing my approach.",
    authorName: "Sneha Gupta",
    authorRole: "Student",
    batch: "2026",
    company: "Amazon",
    postType: "Interview Experience",
    score: 423,
    commentsCount: 78,
    timestamp: "1 day ago",
    isPinned: false
  },
  {
    id: 6,
    title: "How to prepare for system design interviews?",
    content: "I have interviews coming up in 2 months. What resources did you use to prepare for system design rounds?",
    authorName: "Arjun Patel",
    authorRole: "Student",
    batch: "2025",
    company: null,
    postType: "Question",
    score: 201,
    commentsCount: 56,
    timestamp: "1 day ago",
    isPinned: false
  },
  {
    id: 7,
    title: "Placement Committee: Resume Review Sessions This Week",
    content: "The placement committee will be conducting resume review sessions on Feb 2nd and 3rd. Book your slots on the portal.",
    authorName: "Placement Committee",
    authorRole: "Faculty",
    batch: null,
    company: null,
    postType: "Announcement",
    score: 178,
    commentsCount: 23,
    timestamp: "2 days ago",
    isPinned: false
  },
  {
    id: 8,
    title: "Goldman Sachs Interview - What to expect?",
    content: "I have my Goldman Sachs interview next week. For those who've been through it, what should I prepare?",
    authorName: "Priya Desai",
    authorRole: "Student",
    batch: "2025",
    company: "Goldman Sachs",
    postType: "Question",
    score: 289,
    commentsCount: 67,
    timestamp: "2 days ago",
    isPinned: false
  }
];

const COMMUNITIES = [
  { name: "DSA", members: "2.3k" },
  { name: "ML & AI", members: "1.8k" },
  { name: "Resume Review", members: "3.1k" },
  { name: "Campus Beauties", members: "892" }
];

const TRENDING = [
  "Off-campus opportunities",
  "FAANG preparation guide",
  "Internship vs Research",
  "Startup culture discussion",
  "Open source contributions"
];

export default function BatchWise() {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [filter, setFilter] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');
  const [selectedPostType, setSelectedPostType] = useState('All Types');

  // Handle upvote
  const handleVote = (postId, delta) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, score: post.score + delta } : post
    ));
  };

  // Filter posts based on current filters
  const filteredPosts = posts.filter(post => {
    if (filter === 'My Batch' && post.authorRole === 'Student' && post.batch !== '2027') {
      return false;
    }
    if (selectedCompany !== 'All Companies' && post.company !== selectedCompany) {
      return false;
    }
    if (selectedPostType !== 'All Types' && post.postType !== selectedPostType) {
      return false;
    }
    return true;
  });

  // Sort: pinned first, then by timestamp
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="BatchWise">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <div className="logo">
              <span className="logo-icon">🎓</span>
              <span className="logo-text">BatchWise</span>
            </div>
          </div>
          
          <div className="navbar-center">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search BatchWise" />
            </div>
          </div>
          
          <div className="navbar-right">
            <div className="user-badge">
              <span className="badge-role">Student</span>
              <span className="badge-separator">|</span>
              <span className="badge-batch">Batch 2027</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="sidebar-section">
            <div className="nav-item active">
              <span className="nav-icon">🏠</span>
              Home
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-title">Communities</div>
            {COMMUNITIES.map(community => (
              <div key={community.name} className="nav-item">
                <span className="nav-icon">👥</span>
                <div className="community-info">
                  <div className="community-name">{community.name}</div>
                  <div className="community-members">{community.members} members</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar-section">
            <div className="nav-item">
              <span className="nav-icon">💼</span>
              Internship Experiences
            </div>
            <div className="nav-item">
              <span className="nav-icon">🏢</span>
              Company Threads
            </div>
            <div className="nav-item">
              <span className="nav-icon">🔖</span>
              Bookmarks
            </div>
          </div>
        </aside>

        {/* Center Feed */}
        <main className="center-feed">
          <div className="feed-header">
            <h2>Popular Posts</h2>
          </div>

          {sortedPosts.map(post => (
            <div key={post.id} className={`post-card ${post.isPinned ? 'pinned' : ''}`}>
              {/* Vote section */}
              <div className="vote-section">
                <button 
                  className="vote-btn upvote"
                  onClick={() => handleVote(post.id, 1)}
                  aria-label="Upvote"
                >
                  ▲
                </button>
                <div className="vote-score">{post.score}</div>
                <button 
                  className="vote-btn downvote"
                  onClick={() => handleVote(post.id, -1)}
                  disabled={post.postType === 'Announcement'}
                  aria-label="Downvote"
                >
                  ▼
                </button>
              </div>

              {/* Post content */}
              <div className="post-content">
                <div className="post-header">
                  {post.isPinned && (
                    <span className="pinned-badge">📌 Pinned</span>
                  )}
                  <span className={`post-tag ${post.postType.toLowerCase().replace(' ', '-')}`}>
                    {post.postType}
                  </span>
                  {post.company && (
                    <span className="company-tag">{post.company}</span>
                  )}
                </div>

                <h3 className="post-title">{post.title}</h3>
                <p className="post-preview">{post.content}</p>

                <div className="post-footer">
                  <div className="author-info">
                    <span className="author-name">{post.authorName}</span>
                    <span className="author-role-badge" data-role={post.authorRole.toLowerCase()}>
                      {post.authorRole}
                    </span>
                    {post.batch && (
                      <span className="author-batch">Batch {post.batch}</span>
                    )}
                  </div>
                  
                  <div className="post-meta">
                    <span className="comments-count">💬 {post.commentsCount} comments</span>
                    <span className="timestamp">{post.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
              <div className="announcement-item">
                <div className="announcement-text">
                  Campus placement season begins March 1st. Update your resumes!
                </div>
                <div className="announcement-time">3 days ago</div>
              </div>
              <div className="announcement-item">
                <div className="announcement-text">
                  Tech fest registrations open. Register your team by Feb 10th.
                </div>
                <div className="announcement-time">5 days ago</div>
              </div>
            </div>
          </div>

          {/* Trending */}
          <div className="sidebar-card trending">
            <div className="card-header">
              <span className="card-icon">🔥</span>
              <h3>Trending This Week</h3>
            </div>
            <div className="card-content">
              {TRENDING.map((topic, index) => (
                <div key={index} className="trending-item">
                  <span className="trending-number">{index + 1}</span>
                  <span className="trending-text">{topic}</span>
                </div>
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
                    className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => setFilter('All')}
                  >
                    All
                  </button>
                  <button 
                    className={`filter-btn ${filter === 'My Batch' ? 'active' : ''}`}
                    onClick={() => setFilter('My Batch')}
                  >
                    My Batch
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label>Company</label>
                <select 
                  value={selectedCompany} 
                  onChange={(e) => setSelectedCompany(e.target.value)}
                >
                  <option>All Companies</option>
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Amazon</option>
                  <option>Goldman Sachs</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Post Type</label>
                <select 
                  value={selectedPostType} 
                  onChange={(e) => setSelectedPostType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Interview Experience</option>
                  <option>Question</option>
                  <option>Announcement</option>
                </select>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
