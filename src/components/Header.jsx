import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">LostFound</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/lost">Lost</Link>
        <Link to="/found">Found</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="auth-buttons">
        <Link to="/login"><button className="login">Log in</button></Link>
        <Link to="/signup"><button className="signup">Sign up</button></Link>
      </div>
    </nav>
  );
};

export default Header;