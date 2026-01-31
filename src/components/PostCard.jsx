import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const { 
    currentUser, 
    toggleUpvote, 
    getUserById, 
    getCommunityById, 
    getCompanyById,
    toggleBookmark,
    bookmarkedPosts
  } = useApp();

  const author = getUserById(post.authorId);
  const community = post.communityId ? getCommunityById(post.communityId) : null;
  const company = post.companyId ? getCompanyById(post.companyId) : null;

  const hasUpvoted = post.upvotes.includes(currentUser.id);
  const isBookmarked = bookmarkedPosts.includes(post.id);

  const goToPost = () => {
    navigate(`/post/${post.id}`);
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    toggleUpvote(post.id);
  };

  const handleDownvote = (e) => {
    e.stopPropagation();
    if (post.postType !== 'Announcement') {
      toggleUpvote(post.id);
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    toggleBookmark(post.id);
  };

  const goToCommunity = (e) => {
    e.stopPropagation();
    navigate(`/community/${community.id}`);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  };

  return (
    <div
      className={`post-card ${post.isPinned ? 'pinned' : ''}`}
      onClick={goToPost}
      role="button"
    >
      {/* Vote section */}
      <div className="vote-section">
        <button
          className={`vote-btn upvote ${hasUpvoted ? 'active' : ''}`}
          onClick={handleUpvote}
          aria-label="Upvote"
        >
          ▲
        </button>

        <div className="vote-score">{post.upvotes.length}</div>

        <button
          className="vote-btn downvote"
          onClick={handleDownvote}
          disabled={post.postType === 'Announcement'}
          aria-label="Downvote"
        >
          ▼
        </button>
      </div>

      {/* Post content */}
      <div className="post-content">
        <div className="post-header">
          {post.isPinned && <span className="pinned-badge">📌 Pinned</span>}

          <span className={`post-tag ${post.postType.toLowerCase().replace(' ', '-')}`}>
            {post.postType}
          </span>

          {company && <span className="company-tag">{company.name}</span>}

          {community && (
            <button className="community-tag" onClick={goToCommunity}>
              {community.name}
            </button>
          )}
        </div>

        <h3 className="post-title">{post.title}</h3>

        <p className="post-preview">
          {post.content.substring(0, 200)}
          {post.content.length > 200 && '...'}
        </p>

        <div className="post-footer">
          <div className="author-info">
            <span className="author-name">{author.name}</span>
            <span className="author-role-badge" data-role={author.role.toLowerCase()}>
              {author.role}
            </span>
            {author.batch && <span className="author-batch">Batch {author.batch}</span>}
          </div>

          <div className="post-meta">
            <span>💬 {post.comments.length} comments</span>
            <span>{formatTimeAgo(post.createdAt)}</span>

            <button
              className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
              onClick={handleBookmark}
              aria-label="Bookmark"
            >
              {isBookmarked ? '🔖' : '🏷️'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
