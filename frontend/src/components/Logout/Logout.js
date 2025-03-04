import React, { } from 'react';

const basePath = process.env.REACT_APP_URL_PATH || '';
const Logout = () => {
  const jwtToken = localStorage.getItem('jwtToken');

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = basePath + '/';
  };

  return (
    <button
    style={{ display: jwtToken ? 'block' : 'none' }}
    onClick={handleLogout}
    className="bg-gray-100 hover:bg-gray-200 text-blue-600 px-4 py-2 rounded-md text-sm font-medium shadow-md transition"
>
    Logout
</button>
  );
};

export default Logout;
