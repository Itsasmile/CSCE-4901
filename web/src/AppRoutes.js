// AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import GameDetail from './GameDetail';
import PostGame from './PostGame';
import ChangeProfile from './ChangeProfile';
import ChangeName from './ChangeName';




const AppRoutes = () => {
  return (
    <Routes>
    
      <Route path="/" element={<Dashboard />} />
      

      <Route path="/change-profile" element={<ChangeProfile />} />
      <Route path="/change-name" element={<ChangeName />} />
      <Route path="/post" element={<PostGame />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/game/:id" element={<GameDetail />} />
    </Routes>
  );
};

export default AppRoutes;
