import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import logo from '../assets/logo.png'; 
import MyModal from './modal';
import '../Navbar.css'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const confirmNavigation = () => {
    handleClose();
    navigate('/leaderboard'); // Navigate to the leaderboard if user confirms
  };

  const cancelNavigation = () => {
    handleClose(); // Simply close the modal if user cancels
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg " style={{ background: 'linear-gradient(to bottom, black, transparent)' }}>
      <div className="container">
        {/* adding image to the brand */}
        <img src={logo} alt="logo" width="70" height="50" className="d-inline-block align-text-top" style={{ marginRight: '5px' }}/>
        <Link className="navbar-brand" to="/" style={{ fontFamily: 'Audiowide, sans-serif',color:'white' }}>Guessing Game</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          style={{ color: 'white', borderColor: 'white' }}
        >
          <i className="pi pi-bars" style={{ color: 'white' }}></i>
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
            <Link 
            className="nav-link" 
            to="#" // Prevent default navigation until confirmed
            style={{ fontFamily: 'Audiowide, sans-serif' }}
            onClick={handleShow}
          >
            Leader Board
          </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ fontFamily: 'Audiowide, sans-serif' }}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
      <MyModal 
        show={showModal} 
        handleClose={handleClose} 
        confirmAction={confirmNavigation}
        cancelAction={cancelNavigation}
        message="Are you sure you want to leave this page? Leaving the page will reset your score."
      />
    </nav>
  );
};

export default Navbar;