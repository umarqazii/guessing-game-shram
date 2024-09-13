import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.png'; 
import '../Navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* adding image to the brand */}
        <img src={logo} alt="logo" width="70" height="50" className="d-inline-block align-text-top" style={{ marginRight: '5px' }}/>
        <Link className="navbar-brand" to="/" style={{ fontFamily: 'Audiowide, sans-serif' }}>Guessing Game</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} style={{ transition: 'max-height 0.3s ease-in-out' }}>
          <ul className="navbar-nav ms-auto">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <li className="nav-item">
              <button className="nav-link btn btn-link"  style={{ fontFamily: 'Audiowide, sans-serif' }}
              onClick={() => window.history.back()}
              >Game</button>
            </li>
              </div>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard" style={{ fontFamily: 'Audiowide, sans-serif' }}>Leader Board</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontFamily: 'Audiowide, sans-serif' }}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;