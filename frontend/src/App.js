import React from 'react';

/* Routing */
import ProtectedRoute from './util/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/* Components */
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Register from './components/Register';

import Applications from './components/Dashboard/Staff/Applications';
import Courses from './components/Dashboard/Staff/Applications/Courses';
import Instructors from './components/Dashboard/Staff/Applications/Instructors';
import Committee from './components/Dashboard/Staff/Applications/Committee';
import ApprovedApplications from './components/Dashboard/Staff/Applications/ApprovedApplicants';
import Departments from './components/Dashboard/Staff/Applications/Departments'; 

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

                <Route
                path="/dashboard/staff/applications"
                element={<ProtectedRoute element={Applications} />}
                />

                <Route
                path="/dashboard/staff/courses"
                element={<ProtectedRoute element={Courses} />}
                />

                <Route
                path="/dashboard/staff/instructors"
                element={<ProtectedRoute element={Instructors} />}
                />

                <Route
                path="/dashboard/staff/committee"
                element={<ProtectedRoute element={Committee} />}
                />

                <Route
                path="/dashboard/staff/ApprovedApplications"
                element={<ProtectedRoute element={ApprovedApplications} />}
                />

                <Route
                path="/dashboard/staff/Departments"
                element={<ProtectedRoute element={Departments} />}      
                />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/login" />} />

              </Routes>
          </Layout>
      </Router>
  );
};

export default App;
