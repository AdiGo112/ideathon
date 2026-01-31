import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostCard from './PostCard';

const Feed = ({
  posts,
  companies,
  filterCompany,
  setFilterCompany,
  filterPostType,
  setFilterPostType,
  filterBatch,
  setFilterBatch
}) => {
  const { getUserById } = useApp();

  const filteredPosts = posts.filter(post => {
    if (filterCompany !== 'all' && post.companyId !== parseInt(filterCompany)) {
      return false;
    }
    if (filterPostType !== 'all' && post.postType !== filterPostType) {
      return false;
    }
    if (filterBatch === 'my-batch') {
      const author = getUserById(post.authorId);
      if (author.batch !== 2026 && author.role !== 'Faculty' && !post.isPinned) {
        return false;
      }
    }
    return true;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const trendingPosts = posts
    .filter(post => new Date(post.createdAt) > threeDaysAgo)
    .sort((a, b) => b.upvotes.length - a.upvotes.length)
    .slice(0, 5);

  return (
    <>
      <main className="center-feed">
        <div className="feed-header">
          <h2>Popular Posts</h2>
        </div>

        {sortedPosts.length === 0 ? (
          <div className="no-posts">No posts match your filters.</div>
        ) : (
          sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </main>

      <aside className="right-sidebar">
        {/* Announcements */}
        <div className="sidebar-card">
          <h3>📢 Announcements</h3>
          {posts
            .filter(p => p.postType === 'Announcement')
            .slice(0, 3)
            .map(post => (
              <Link key={post.id} to={`/post/${post.id}`}>
                {post.title}
              </Link>
            ))}
        </div>

        {/* Trending */}
        <div className="sidebar-card">
          <h3>🔥 Trending</h3>
          {trendingPosts.map((post, i) => (
            <Link key={post.id} to={`/post/${post.id}`}>
              {i + 1}. {post.title}
            </Link>
          ))}
        </div>

        {/* Filters */}
        <div className="sidebar-card">
          <h3>🔍 Filters</h3>

          <button onClick={() => setFilterBatch('all')}>All</button>
          <button onClick={() => setFilterBatch('my-batch')}>My Batch</button>

          <select value={filterCompany} onChange={e => setFilterCompany(e.target.value)}>
            <option value="all">All Companies</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select value={filterPostType} onChange={e => setFilterPostType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Interview Experience">Interview Experience</option>
            <option value="Question">Question</option>
            <option value="Announcement">Announcement</option>
            <option value="Discussion">Discussion</option>
          </select>
        </div>
      </aside>
    </>
  );
};

export default Feed;
