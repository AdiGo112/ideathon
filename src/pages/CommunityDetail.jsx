import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import '../styles/Styles.css';

const CommunityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    getCommunityById, 
    posts, 
    joinedCommunities, 
    toggleCommunityMembership,
    createPost
  } = useApp();

  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('Discussion');

  const community = getCommunityById(parseInt(id));

  if (!community) {
    return (
      <div className="community-detail-page">
        <div className="not-found">
          <h2>Community not found</h2>
          <button onClick={() => navigate('/communities')}>View All Communities</button>
        </div>
      </div>
    );
  }

  const isJoined = joinedCommunities.includes(community.id);
  const communityPosts = posts.filter(post => post.communityId === community.id);

  const handleToggleMembership = () => {
    toggleCommunityMembership(community.id);
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (postTitle.trim() && postContent.trim()) {
      const newPost = createPost({
        title: postTitle.trim(),
        content: postContent.trim(),
        communityId: community.id,
        postType
      });
      setPostTitle('');
      setPostContent('');
      setPostType('Discussion');
      setShowCreatePost(false);
      navigate(`/post/${newPost.id}`);
    }
  };

  return (
    <div className="community-detail-page">
      <div className="community-header">
        <div className="community-info">
          <h1>{community.name}</h1>
          <p className="community-description">{community.description}</p>
          <div className="community-stats">
            <span>👥 {community.memberCount.toLocaleString()} members</span>
          </div>
        </div>
        <button
          className={`join-btn large ${isJoined ? 'joined' : ''}`}
          onClick={handleToggleMembership}
        >
          {isJoined ? '✓ Joined' : 'Join Community'}
        </button>
      </div>

      <div className="community-content">
        <div className="community-actions">
          <button 
            className="create-post-btn"
            onClick={() => setShowCreatePost(!showCreatePost)}
          >
            {showCreatePost ? 'Cancel' : '+ Create Post'}
          </button>
        </div>

        {showCreatePost && (
          <div className="create-post-form">
            <h3>Create a Post</h3>
            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label>Post Type</label>
                <select value={postType} onChange={(e) => setPostType(e.target.value)}>
                  <option value="Discussion">Discussion</option>
                  <option value="Question">Question</option>
                  <option value="Interview Experience">Interview Experience</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows="6"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Post
              </button>
            </form>
          </div>
        )}

        <div className="community-posts">
          <h2>Posts ({communityPosts.length})</h2>
          {communityPosts.length === 0 ? (
            <div className="no-posts">
              <p>No posts in this community yet. Be the first to post!</p>
            </div>
          ) : (
            communityPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;