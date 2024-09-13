import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // import your logo

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 4000); // 5-second timeout before navigation
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#282c34',
        opacity: loading ? 1 : 0,
        transition: 'opacity 3s ease-in-out',
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: '60vw',
          maxWidth: '150px',
          height: 'auto',
          marginBottom: '20px',
          animation: loading ? 'rotateZoomIn 2.5s ease-in-out forwards' : '',
        }}
      />
      <h1
  style={{
    fontSize: '3vh', // Base font size for large screens
    maxWidth: '80%',
    color: '#ffffff',
    animation: loading ? 'fadeUp 3s ease-in-out forwards' : '',
    textAlign: 'center',
    margin: '20px',
    fontFamily: 'cursive'
  }}
>
  Guessing Game Shram
</h1>
<style>{`
  @keyframes rotateZoomIn {
    0% {
      transform: scale(0) rotate(0deg);
    }
    50% {
      transform: scale(1.3) rotate(180deg);
    }
    100% {
      transform: scale(1) rotate(360deg);
    }
  }

  @keyframes fadeUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}</style>

    </div>
  );
};

export default SplashScreen;
