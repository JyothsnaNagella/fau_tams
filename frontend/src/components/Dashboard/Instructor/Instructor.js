import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";

const Instructor = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/instructor/recommended")
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching recommended applications");
        setLoading(false);
      });
  }, []);

  const handleApprove = (id) => {
    axiosInstance
      .put(`/instructor/approve/${id}`)
      .then(() => {
        setApplications((prev) =>
          prev.filter((application) => application.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error approving application:", err);
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .put(`/instructor/reject/${id}`)
      .then(() => {
        setApplications((prev) =>
          prev.filter((application) => application.id !== id)
        );
      })
      .catch((err) => {
        console.error("Error rejecting application:", err);
      });
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Recommended Applications</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Z-Number</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">GPA</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Course</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Resume</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t">
                <td className="py-3 px-4 text-sm text-gray-800 text-center">
                  {application.firstname} {application.lastname}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.email}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.znumber}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.gpa}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.course}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">
                {application.resume == 'resume.pdf' ? 'No resume uploaded' : 
                        (
                        <a 
                            href={`${process.env.REACT_APP_API_BASE_URL}committee/resume/${application.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                            >
                            View Resume
                        </a>
                        )} 
                   
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleApprove(application.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(application.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructor;
