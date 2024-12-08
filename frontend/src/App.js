import React from 'react';

/* Routing */
import ProtectedRoute from './util/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* Components */
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Register from './components/Register';

/* Styles */
import './App.css';

const App = () => {
  return (
      <Router>
          <Layout>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protected Route */}
                <Route
                path="/dashboard"
                element={<ProtectedRoute element={Dashboard} />}
                />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/login" />} />

              </Routes>
          </Layout>
      </Router>
  );
};

export default App;
