import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import '../styles/Styles.css';

const Companies = () => {
  const { companies } = useApp();

  return (
    <div className="companies-page">
      <div className="companies-header">
        <h1>Companies</h1>
        <p>Explore interview experiences, resources, and discussions for top companies</p>
      </div>

      <div className="companies-grid">
        {companies.map(company => (
          <Link 
            key={company.id} 
            to={`/company/${company.id}`}
            className="company-card"
          >
            <div className="company-logo">{company.logo}</div>
            <h3 className="company-name">{company.name}</h3>
            <p className="company-threads">
              {company.threadCount} threads
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Companies;