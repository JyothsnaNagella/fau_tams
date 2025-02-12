import React from 'react';
import { Navigate } from 'react-router-dom';

const basePath = process.env.REACT_APP_URL_PATH || '';
const ProtectedRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem('jwtToken'); // Get the token from localStorage

  if (!token) {
    return <Navigate to={basePath + "/login"} />;
  }

  return <Element {...rest} />;
};

export default ProtectedRoute;
