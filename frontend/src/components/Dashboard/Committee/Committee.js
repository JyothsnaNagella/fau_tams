import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";
import ApplicationModal from "../../ApplicationModal";

const Committee = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const courses = [
    "Software Engineering",
    "Intro to Data Science",
    "Database Implementation",
    "Machine Learning",
    "Deep Learning",
  ];

  useEffect(() => {
    axiosInstance
      .get("/committee")
      .then((response) => {
        setApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching applications");
        setLoading(false);
      });
  }, []);

  
  const openModal = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const closeModal = (closeStatus) => {
      setIsModalOpen(false);
      if (closeStatus === "Recommended" || closeStatus === "Rejected") {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.applicant_id === selectedApplication.applicant_id
              ? { ...app, status: closeStatus }
              : app
          )
        );
      }
      setSelectedApplication(null);
  };


  const handleRecommend = (applicant_id) => {
    axiosInstance
      .put(`/committee/recommend/${applicant_id}`)
      .then(() => {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.applicant_id === applicant_id
              ? { ...app, status: "Recommended" }
              : app
          )
        );
      })
      .catch((err) => {
        setError("Error recommending application");
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
      <h1 className="text-3xl font-semibold text-center mb-6">Committee</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Email</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Z-Number</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">GPA</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Course</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Status</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Resume</th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.applicant_id} className="border-t">
                <td className="py-3 px-4 text-sm text-gray-800 text-center">
                  {application.firstname} {application.lastname}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.email}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.znumber}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.gpa}</td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">
                  {courses[application.course_id + 1]}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800 text-center">{application.status}</td>
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
                <td className="py-3 px-4 text-sm text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(application)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View Application
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Modal */}
        {isModalOpen && (
            <ApplicationModal application={selectedApplication} onClose={closeModal} />
        )}

      </div>
    </div>
  );
};

export default Committee;
