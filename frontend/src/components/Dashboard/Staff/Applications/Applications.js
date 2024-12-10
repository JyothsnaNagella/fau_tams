import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../api/axios";
import StaffNavigation from "../StaffNavigation";  
import ApplicationModal from "../../../ApplicationModal";

const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApplication, setSelectedApplication] = useState(null); // To store the selected application for the modal
    const [isModalOpen, setIsModalOpen] = useState(false); // To manage modal visibility

    useEffect(() => {
        axiosInstance
            .get("/staff/applications/recommended")
            .then((response) => {
                setApplications(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    const openModal = (application) => {
        setSelectedApplication(application);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApplication(null);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Applications</h1>

            <main className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <StaffNavigation />

                {/* Content Section */}
                <div className="applications-content mt-6">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading applications...</p>
                    ) : applications.length > 0 ? (
                        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Application Id</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Email</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Course Name</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.applicationId} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-700">{app.id}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{app.firstname} {app.lastname}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{app.email}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{app.course_name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">{app.status}</td>
                                        <td className="py-3 px-4 text-sm text-gray-700">
                                            <button
                                                onClick={() => openModal(app)}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                            >
                                                View Application
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-8">
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">No Applications Available</h2>
                            <p className="text-gray-600">There are currently no applications to display. Please check back later or contact support if you believe this is an error.</p>
                        </div>
                    )}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <ApplicationModal application={selectedApplication} onClose={closeModal} />
                )}
            </main>
        </div>
    );
};

export default Applications;
