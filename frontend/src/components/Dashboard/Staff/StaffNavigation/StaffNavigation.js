import React from 'react';
import { useNavigate } from "react-router-dom";

const basePath = process.env.REACT_APP_URL_PATH || '';
const StaffNavigation = () => {
    const navigate = useNavigate();

    const handleButtonClick = (type) => {
      console.log(`Button clicked: ${type}`);
      // Navigate to the corresponding page
      navigate(`${basePath}/dashboard/staff/${type}`);
    };
  
  
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("applications")}
          >
            Applications
          </button>
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("courses")}
          >
            Courses
          </button>
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("instructors")}
          >
            Instructors
          </button>
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("committee")}
          >
            Committee
          </button>
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("approvedApplications")}
          >
            Approved Applications
          </button>
          <button
            className="bg-purple-200 text-gray-700 font-medium py-2 px-4 rounded hover:bg-purple-300 focus:outline-none"
            onClick={() => handleButtonClick("departments")}
          >
            Departments
          </button>
        </div>
    );
};

export default StaffNavigation;
