import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const Comment = ({ comment, postId, level = 0 }) => {
  const { 
    currentUser, 
    getUserById, 
    deleteComment, 
    addComment,
    toggleCommentUpvote 
  } = useApp();
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');

  const author = getUserById(comment.authorId);
  const canDelete = comment.authorId === currentUser.id;
  const hasUpvoted = comment.upvotes.includes(currentUser.id);

  const handleDelete = () => {
    if (window.confirm('Delete this comment?')) {
      deleteComment(postId, comment.id);
    }
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      addComment(postId, replyText.trim(), comment.id);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleUpvote = () => {
    toggleCommentUpvote(postId, comment.id);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className={`comment ${level > 0 ? 'nested' : ''}`}>
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{author.name}</span>
          <span className="comment-role-badge" data-role={author.role.toLowerCase()}>
            {author.role}
          </span>
          {author.batch && (
            <span className="comment-batch">Batch {author.batch}</span>
          )}
          <span className="comment-timestamp">{formatTimeAgo(comment.createdAt)}</span>
        </div>

        <p className="comment-text">{comment.content}</p>

        <div className="comment-actions">
          <button 
            className={`comment-upvote ${hasUpvoted ? 'active' : ''}`}
            onClick={handleUpvote}
          >
            ▲ {comment.upvotes.length > 0 && comment.upvotes.length}
          </button>
          
          {level === 0 && (
            <button 
              className="comment-reply"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </button>
          )}
          
          {canDelete && (
            <button 
              className="comment-delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>

        {isReplying && (
          <form onSubmit={handleReply} className="reply-form">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              rows="3"
              autoFocus
            />
            <div className="reply-form-actions">
              <button type="submit" disabled={!replyText.trim()}>
                Reply
              </button>
              <button type="button" onClick={() => setIsReplying(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map(reply => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              postId={postId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;