import React, { createContext, useState, useContext, useEffect } from 'react';
import { 
  currentUser, 
  users, 
  communities, 
  companies, 
  resources,
  initialPosts,
  getUserById,
  getCommunityById,
  getCompanyById
} from '../data/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // State management
  const [posts, setPosts] = useState(initialPosts);
  const [joinedCommunities, setJoinedCommunities] = useState([1, 3]); // User has joined communities 1 and 3
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // Toggle upvote on a post
  const toggleUpvote = (postId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const hasUpvoted = post.upvotes.includes(currentUser.id);
        return {
          ...post,
          upvotes: hasUpvoted 
            ? post.upvotes.filter(id => id !== currentUser.id)
            : [...post.upvotes, currentUser.id]
        };
      }
      return post;
    }));
  };

  // Add comment to a post
  const addComment = (postId, content, parentCommentId = null) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(), // Simple unique ID
          authorId: currentUser.id,
          content,
          createdAt: new Date().toISOString(),
          upvotes: [],
          parentCommentId,
          replies: []
        };

        // If it's a reply to another comment
        if (parentCommentId) {
          const updatedComments = [...post.comments];
          const parentComment = updatedComments.find(c => c.id === parentCommentId);
          if (parentComment) {
            parentComment.replies = [...(parentComment.replies || []), newComment];
          }
          return { ...post, comments: updatedComments };
        }

        // Top-level comment
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  // Delete comment
  const deleteComment = (postId, commentId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        // Check if it's a top-level comment
        const isTopLevel = post.comments.some(c => c.id === commentId);
        
        if (isTopLevel) {
          return {
            ...post,
            comments: post.comments.filter(c => c.id !== commentId)
          };
        }

        // It's a reply - find and remove from parent
        const updatedComments = post.comments.map(comment => ({
          ...comment,
          replies: (comment.replies || []).filter(r => r.id !== commentId)
        }));

        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  // Toggle upvote on a comment
  const toggleCommentUpvote = (postId, commentId) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const updateCommentUpvotes = (comment) => {
          if (comment.id === commentId) {
            const hasUpvoted = comment.upvotes.includes(currentUser.id);
            return {
              ...comment,
              upvotes: hasUpvoted
                ? comment.upvotes.filter(id => id !== currentUser.id)
                : [...comment.upvotes, currentUser.id]
            };
          }
          return comment;
        };

        const updatedComments = post.comments.map(comment => {
          const updated = updateCommentUpvotes(comment);
          if (updated.replies) {
            updated.replies = updated.replies.map(updateCommentUpvotes);
          }
          return updated;
        });

        return { ...post, comments: updatedComments };
      }
      return post;
    }));
  };

  // Join/leave community
  const toggleCommunityMembership = (communityId) => {
    setJoinedCommunities(prev => {
      if (prev.includes(communityId)) {
        return prev.filter(id => id !== communityId);
      }
      return [...prev, communityId];
    });
  };

  // Create a new post
  const createPost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      content: postData.content,
      authorId: currentUser.id,
      communityId: postData.communityId || null,
      companyId: postData.companyId || null,
      postType: postData.postType || 'Discussion',
      upvotes: [],
      comments: [],
      createdAt: new Date().toISOString(),
      isPinned: false
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  // Toggle bookmark
  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      }
      return [...prev, postId];
    });
  };

  // Get post by ID
  const getPostById = (id) => {
    return posts.find(post => post.id === parseInt(id));
  };

  // Search functionality
  const searchAll = (query) => {
    const lowerQuery = query.toLowerCase();
    
    const postResults = posts.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );

    const userResults = users.filter(user =>
      user.name.toLowerCase().includes(lowerQuery)
    );

    const communityResults = communities.filter(community =>
      community.name.toLowerCase().includes(lowerQuery) ||
      community.description.toLowerCase().includes(lowerQuery)
    );

    return {
      posts: postResults,
      users: userResults,
      communities: communityResults
    };
  };

  const value = {
    // Data
    currentUser,
    users,
    communities,
    companies,
    resources,
    posts,
    joinedCommunities,
    bookmarkedPosts,
    
    // Helper functions
    getUserById,
    getCommunityById,
    getCompanyById,
    getPostById,
    
    // Actions
    toggleUpvote,
    addComment,
    deleteComment,
    toggleCommentUpvote,
    toggleCommunityMembership,
    createPost,
    toggleBookmark,
    searchAll
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};