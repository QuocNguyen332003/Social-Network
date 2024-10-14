// src/routes/ProtectedRoute.tsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage

  if (!token) {
    return <Navigate to="/login" />; // Nếu không có token, điều hướng về trang login
  }

  return <Outlet />; // Nếu có token, cho phép truy cập
};
