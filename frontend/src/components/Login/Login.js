import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axios';

const basePath = process.env.REACT_APP_URL_PATH || '';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      //window.location.href = '/dashboard'; // Redirect to dashboard if already logged in
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
        userType,
      });

      const { token, user } = response.data; // Extract token from response
      localStorage.setItem('jwtToken', token); // Store token in localStorage
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', user.id);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => {
        window.location.href = basePath+'/dashboard'; // Redirect to dashboard
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = '/register';
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <h3>Welcome to TAMS, pipeline was successful! Congrats</h3>
      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select User Type</option>
              <option value="applicant">Applicant</option>
              <option value="staff">Staff</option>
              <option value="committee">Committee</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <p className="text-gray-700">Don't have an account? &nbsp;
            <button
              onClick={handleRegisterRedirect}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
