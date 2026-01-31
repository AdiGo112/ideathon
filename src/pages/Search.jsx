import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import PostCard from '../components/PostCard';
import '../styles/Styles.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchAll } = useApp();

  const results = useMemo(() => {
    if (!query.trim()) {
      return { posts: [], users: [], communities: [] };
    }
    return searchAll(query);
  }, [query, searchAll]);

  const totalResults = results.posts.length + results.users.length + results.communities.length;

  if (!query.trim()) {
    return (
      <div className="search-page">
        <div className="search-empty">
          <h2>Enter a search query</h2>
          <p>Use the search bar above to find posts, users, or communities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Search Results for "{query}"</h1>
        <p>{totalResults} results found</p>
      </div>

      {totalResults === 0 ? (
        <div className="no-results">
          <h2>No results found</h2>
          <p>Try different keywords or check your spelling</p>
        </div>
      ) : (
        <div className="search-results">
          {/* Posts */}
          {results.posts.length > 0 && (
            <div className="search-section">
              <h2>Posts ({results.posts.length})</h2>
              <div className="posts-results">
                {results.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* Users */}
          {results.users.length > 0 && (
            <div className="search-section">
              <h2>Users ({results.users.length})</h2>
              <div className="users-results">
                {results.users.map(user => (
                  <div key={user.id} className="user-result">
                    <div className="user-info">
                      <span className="user-name">{user.name}</span>
                      <span className="user-role-badge" data-role={user.role.toLowerCase()}>
                        {user.role}
                      </span>
                      {user.batch && (
                        <span className="user-batch">Batch {user.batch}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Communities */}
          {results.communities.length > 0 && (
            <div className="search-section">
              <h2>Communities ({results.communities.length})</h2>
              <div className="communities-results">
                {results.communities.map(community => (
                  <Link 
                    key={community.id} 
                    to={`/community/${community.id}`}
                    className="community-result"
                  >
                    <h3>{community.name}</h3>
                    <p>{community.description}</p>
                    <span className="member-count">
                      {community.memberCount.toLocaleString()} members
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;