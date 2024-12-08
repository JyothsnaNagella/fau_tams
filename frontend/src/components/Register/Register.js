import React, { useState } from 'react';
import axiosInstance from '../../api/axios';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [znumber, setZnumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation for password match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    try {
      const response = await axiosInstance.post('/register', {
        firstname,
        lastname,
        email,
        znumber,
        password
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);
      
      if (response.status === 201) {
        window.location.href = '/login';
      }

    } catch (error) {
      setError('Email already exists');
      console.log(error);
    }

  };

  const goBack = () => {
    window.location.href = document.referrer;  // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="absolute top-4 left-4 px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Go Back
      </button>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleRegister} className="space-y-4 flex-1">
          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">First Name</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Last Name</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Z-Number</label>
            <input
              type="text"
              value={znumber}
              onChange={(e) => setZnumber(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-left">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
