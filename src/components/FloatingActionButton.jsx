import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useState, useRef, useEffect } from "react";
import '../styles/Styles.css';

const FloatingActionButton = () =>{
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fab-container" ref={ref}>
      {open && (
        <div className="fab-menu">
          <button onClick={() => console.log("Create new post")}>
            📝 New Post
          </button>
          <button onClick={() => console.log("Upload resource")}>
            📎 Upload Resource
          </button>
        </div>
      )}

      <button
        className={`fab-button ${open ? "open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        +
      </button>
    </div>
  );
}

export default FloatingActionButton;
