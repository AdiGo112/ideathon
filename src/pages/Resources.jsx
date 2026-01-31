import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const Resources = () => {
  const { resources } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'DSA', 'Resume', 'Interview Prep', 'Career'];

  const filteredResources = filterCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === filterCategory);

  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>Resources</h1>
        <p>Curated resources for interview preparation and career growth</p>
      </div>

      <div className="resources-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filterCategory === category ? 'active' : ''}`}
            onClick={() => setFilterCategory(category)}
          >
            {category === 'all' ? 'All' : category}
          </button>
        ))}
      </div>

      <div className="resources-list">
        {filteredResources.map(resource => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <h3>{resource.title}</h3>
              <span className="resource-category">{resource.category}</span>
            </div>
            <p className="resource-description">{resource.description}</p>
            <div className="resource-footer">
              <span className="resource-upvotes">▲ {resource.upvotes}</span>
              <a 
                href={resource.url} 
                className="resource-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('This is a mock link. In a real app, this would open the resource.');
                }}
              >
                View Resource →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;