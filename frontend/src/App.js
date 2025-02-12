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

const basePath = process.env.REACT_APP_URL_PATH || '';
console.log("basePath: ", basePath);
const App = () => {
  return (
      <Router>
          <Layout>
              <Routes>
		<Route path={`${basePath}/`} element={<Login />} />
		<Route path={`${basePath}/login`} element={<Login />} />
		<Route path={`${basePath}/register`} element={<Register />} />
                <Route path={basePath + "/"} element={<Login />} />
                <Route path={basePath + "/login"} element={<Login />} />
                <Route path={basePath + "/register"} element={<Register />} />

                {/* Protected Route */}
                <Route
                path={basePath + "/dashboard"}
                element={<ProtectedRoute element={Dashboard} />}
                />

                <Route
                 path={basePath + "/dashboard/staff/applications"}
		element={<ProtectedRoute element={Applications} />}
                />

                <Route
                path={basePath + "/dashboard/staff/courses"}
                element={<ProtectedRoute element={Courses} />}
                />

                <Route
                path={basePath + "/dashboard/staff/instructors"}
                element={<ProtectedRoute element={Instructors} />}
                />

                <Route
                path={basePath + "/dashboard/staff/committee"}
                element={<ProtectedRoute element={Committee} />}
                />

                <Route
                path={basePath + "/dashboard/staff/ApprovedApplications"}
                element={<ProtectedRoute element={ApprovedApplications} />}
                />

                <Route
                path={basePath + "/dashboard/staff/Departments"}
                element={<ProtectedRoute element={Departments} />}      
                />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to={basePath + "/login"} />} />

              </Routes>
          </Layout>
      </Router>
  );
};

export default App;
