import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api', // Backend base URL
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
