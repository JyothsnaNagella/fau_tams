import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StaffNavigation from "./StaffNavigation";

const basePath = process.env.REACT_APP_URL_PATH || '';
const StaffDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${basePath}/dashboard/staff/applications`);
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <header className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
      </header>

      <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <StaffNavigation />
      </main>
    </div>
  );
};

export default StaffDashboard;
