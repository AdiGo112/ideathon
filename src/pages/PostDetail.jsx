import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Comment from '../components/Comment';
import '../styles/styles.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getPostById, 
    getUserById, 
    getCommunityById, 
    getCompanyById,
    currentUser,
    toggleUpvote,
    addComment,
    toggleBookmark,
    bookmarkedPosts
  } = useApp();

  const [commentText, setCommentText] = useState('');

  const post = getPostById(id);

  if (!post) {
    return (
      <div className="post-detail-page">
        <div className="post-not-found">
          <h2>Post not found</h2>
          <button onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  const author = getUserById(post.authorId);
  const community = post.communityId ? getCommunityById(post.communityId) : null;
  const company = post.companyId ? getCompanyById(post.companyId) : null;
  const hasUpvoted = post.upvotes.includes(currentUser.id);
  const isBookmarked = bookmarkedPosts.includes(post.id);

  const handleUpvote = () => {
    toggleUpvote(post.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(post.id, commentText.trim());
      setCommentText('');
    }
  };

  const handleBookmark = () => {
    toggleBookmark(post.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-detail-page">
      <div className="post-detail-container">
        <div className="post-detail-card">
          {/* Vote section */}
          <div className="post-vote-section">
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
              onClick={handleUpvote}
              disabled={post.postType === 'Announcement'}
              aria-label="Downvote"
            >
              ▼
            </button>
          </div>

          {/* Post content */}
          <div className="post-detail-content">
            <div className="post-detail-header">
              {post.isPinned && (
                <span className="pinned-badge">📌 Pinned</span>
              )}
              <span className={`post-tag ${post.postType.toLowerCase().replace(' ', '-')}`}>
                {post.postType}
              </span>
              {company && (
                <Link to={`/company/${company.id}`} className="company-tag">
                  {company.name}
                </Link>
              )}
              {community && (
                <Link to={`/community/${community.id}`} className="community-tag">
                  {community.name}
                </Link>
              )}
            </div>

            <h1 className="post-detail-title">{post.title}</h1>

            <div className="post-detail-meta">
              <span className="author-name">{author.name}</span>
              <span className="author-role-badge" data-role={author.role.toLowerCase()}>
                {author.role}
              </span>
              {author.batch && (
                <span className="author-batch">Batch {author.batch}</span>
              )}
              <span className="post-timestamp">{formatDate(post.createdAt)}</span>
            </div>

            <div className="post-detail-body">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="post-detail-actions">
              <div className="action-stats">
                <span>{post.upvotes.length} upvotes</span>
                <span>{post.comments.length} comments</span>
              </div>
              <button 
                className={`bookmark-action ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                {isBookmarked ? '🔖 Bookmarked' : '🏷️ Bookmark'}
              </button>
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="comments-section">
          <h2>Comments ({post.comments.length})</h2>

          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="add-comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts..."
              rows="4"
            />
            <button type="submit" disabled={!commentText.trim()}>
              Add Comment
            </button>
          </form>

          {/* Comments list */}
          <div className="comments-list">
            {post.comments.length === 0 ? (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map(comment => (
                <Comment 
                  key={comment.id} 
                  comment={comment} 
                  postId={post.id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;