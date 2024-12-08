import React from "react";

const Instructor = () => {
    return <div>
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Total Applicants</h4>
                <p className="text-4xl text-gray-800">120</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Total Staff</h4>
                <p className="text-4xl text-gray-800">45</p>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Total Committees</h4>
                <p className="text-4xl text-gray-800">10</p>
            </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Manage Applicants</h4>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Go to Applicants</button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Manage Staff</h4>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Go to Staff</button>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-blue-500">Manage Committees</h4>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Go to Committees</button>
            </div>
        </div>
    </div>;
};

export default Instructor;