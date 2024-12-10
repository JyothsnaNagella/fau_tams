import React, { useState, useEffect } from "react";
import StaffNavigation from "../StaffNavigation";
import axiosInstance from "../../../../api/axios";

const ApprovedApplications = () => {
    const [approvedApplications, setApprovedApplications] = useState([]);

    useEffect(() => {
        axiosInstance
            .get("/staff/applications/approved")
            .then((response) => {
                setApprovedApplications(response.data);
            })
            .catch((error) => {
                console.error("Error fetching approved applications:", error);
            });
    }, []);

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Approved Applications</h1>

            <main className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
                <StaffNavigation />

                {approvedApplications.length > 0 ? (
                    <div className="overflow-x-auto mt-6">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                        Application ID
                                    </th>
                                    <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                        Email
                                    </th>
                                    <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                        Course
                                    </th>
                                    <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                        Instructor
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedApplications.map((application) => (
                                    <tr key={application.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                            {application.id}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                            {application.name}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                            {application.email}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                            {application.course}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                            {application.instructor}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-6">
                        No approved applications available at the moment.
                    </p>
                )}
            </main>
        </div>
    );
};

export default ApprovedApplications;
