import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './pages/game';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
