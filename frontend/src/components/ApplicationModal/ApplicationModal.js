import React from "react";
import axiosInstance from "../../api/axios";

const ApplicationModal = ({ application, onClose }) => {
    const userType = localStorage.getItem('userType');

    const handleRecommendApplication = (evt, applicant_id) => {
        evt.preventDefault();
        axiosInstance
          .put(`/committee/recommend/${applicant_id}`)
          .then(() => {
            onClose('Recommended');
          })
          .catch((err) => {
            console.log("Error recommending application");
          });
      };


    const handleRejectApplication = (evt, applicant_id) => {
        evt.preventDefault();
        axiosInstance
          .put(`/committee/deny/${applicant_id}`)
          .then(() => {
            onClose('Rejected');
          })
          .catch((err) => {
            console.log("Error denying application");
          });
      };
    


    const handleNotifyApplicant = async (evt, id) => {
        evt.preventDefault();
        try {
            // @TODO Implement this endpoint
            await axiosInstance.put(`/staff/applications/${id}/notify`);
            alert("Applicant notified successfully!");  
            onClose(); 
        } catch (error) {
            console.error("Error notifying applicant:", error);
        }
    };  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Application Details</h2>
                
                <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Application Id */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Application Id:</label>
                        <input 
                            type="text"
                            value={application.id}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Applicant Name */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Applicant Name:</label>
                        <input 
                            type="text"
                            value={`${application.firstname} ${application.lastname}`}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Email:</label>
                        <input 
                            type="email"
                            value={application.email}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Z-Number */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Z-Number:</label>
                        <input 
                            type="text"
                            value={application.znumber}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* GPA */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">GPA:</label>
                        <input 
                            type="text"
                            value={application.gpa}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Level of Education */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Level of Education:</label>
                        <input 
                            type="text"
                            value={application.level_of_education}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Date of Graduation */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Date of Graduation:</label>
                        <input 
                            type="text"
                            value={new Date(application.date_of_graduation).toLocaleDateString()}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>
    
                    {/* Previous Experience */}
                    <div className="flex flex-col col-span-3">
                        <label className="font-medium text-gray-700">Previous Experience:</label>
                        <textarea 
                            value={application.previous_experience}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Duration:</label>
                        <input 
                            type="text"
                            value={application.duration}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Department Name */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Department Name:</label>
                        <input 
                            type="text"
                            value={application.department_name}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Course Name */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Course Name:</label>
                        <input 
                            type="text"
                            value={application.course_name}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Instructor Name */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Instructor Name:</label>
                        <input 
                            type="text"
                            value={`${application.instructor_firstname} ${application.instructor_lastname}`}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">Status:</label>
                        <input 
                            type="text"
                            value={application.status}
                            className="p-2 border rounded-md bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            readOnly
                        />
                    </div>
                    {/* Button container */}
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={(evt) => {
                                {userType === 'committee' ? handleRecommendApplication(evt, application.id) : handleNotifyApplicant(evt, application.id)}
                            }}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                        >
                            {userType === 'committee' ? 'Recommend' : 'Notify Applicant'}
                        </button>
                        {userType === 'committee' && (
                            <button
                                onClick={(evt) => handleRejectApplication(evt, application.id)}
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 focus:outline-none transition-colors duration-300"
                            >
                                Reject
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};           


export default ApplicationModal;