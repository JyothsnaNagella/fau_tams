import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('jwtToken'); // Get the token from localStorage

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
