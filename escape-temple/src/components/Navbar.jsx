import React from "react";
import "./Navbar.css";

export default function Navbar({ onShowInstructions, onHome }) {
  return (
    <nav className="navbar">
      <div className="navbar-title" style={{ cursor: 'pointer' }} onClick={onHome}>
        Escape Temple
      </div>
      <div className="navbar-links">
        <button className="navbar-link-btn" onClick={onShowInstructions}>
          Instructions
        </button>
      </div>
    </nav>
  );
} 