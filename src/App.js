import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './pages/game';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game/:userId/:username" element={<Game />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
