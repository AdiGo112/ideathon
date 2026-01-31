import React from 'react';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import '../styles/Styles.css';

const Bookmarks = () => {
  const { posts, bookmarkedPosts } = useApp();

  const bookmarkedPostsList = posts.filter(post => bookmarkedPosts.includes(post.id));

  return (
    <div className="bookmarks-page">
      <div className="bookmarks-header">
        <h1>Bookmarked Posts</h1>
        <p>Posts you've saved for later</p>
      </div>

      {bookmarkedPostsList.length === 0 ? (
        <div className="no-bookmarks">
          <h2>No bookmarks yet</h2>
          <p>Bookmark posts to save them for later reading</p>
        </div>
      ) : (
        <div className="bookmarks-list">
          {bookmarkedPostsList.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;