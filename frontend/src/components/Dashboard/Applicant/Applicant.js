/**
 * @TODO Course dates came across as null need to finish implementing
 * @TODO Need to get the applicant id (user id creating the app)
 * @TODO Implement verifyToken
 */
import React, { useState } from "react";
import axiosInstance from '../../../api/axios';

const Applicant = () => {
  const [isPrevTA, setIsPrevTA] = useState(false);
  const [coursesDates, setCoursesDates] = useState([]);
  const [qualifiedCourses, setQualifiedCourses] = useState(-1);
  const [cvFile, setCVFile] = useState(null);  // Track the selected CV file

  // Course options based on your data
  const courses = [
    { id: 1, name: "Software Engineering", status: "Open" },
    { id: 2, name: "Intro to Data Science", status: "Open" },
    { id: 3, name: "Database Implementation", status: "Open" },
    { id: 4, name: "Machine Learning", status: "Open" },
    { id: 5, name: "Deep Learning", status: "Open" },
  ];

  const openCourses = courses.filter((course) => course.status === "Open");

  const handlePrevTAChange = (e) => {
    setIsPrevTA(e.target.value === "yes");
  };

  const handleCvChange = (e) => {
    setCVFile(e.target.files[0]);  // Store the selected file
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      console.error("CV file is required.");
      return;
    }

    const data = {
      prevTA: isPrevTA,
      coursesDates: isPrevTA ? coursesDates : null,
      qualifiedCourses,
      cv: cvFile,
    }
    try {
      // Send the form data to the backend
      // @TODO We need to get the applicant id (user id creating the app)
      const response = await axiosInstance.post('/applicant/1/apply', data, {
        headers: {
          "Content-Type": "multipart/form-data",  // This is important for file uploads
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Handle successful submission (e.g., show a success message)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">TA Application Form</h2>
      <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
        {/* CV Upload */}
        <div className="flex flex-col">
          <label htmlFor="cv" className="text-gray-700 font-medium mb-2">
            Upload CV
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            className="border rounded-lg p-2 text-gray-600"
            onChange={handleCvChange}  // Handle file change
            required
          />
        </div>

        {/* Previously a TA? */}
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-2">
            Have you previously served as a TA at North University?
          </label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="prevTA"
                value="yes"
                onChange={handlePrevTAChange}
                className="text-blue-500"
                required
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="prevTA"
                value="no"
                onChange={handlePrevTAChange}
                className="text-blue-500"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Relevant Course(s) and Dates */}
        {isPrevTA && (
          <div className="flex flex-col">
            <label htmlFor="coursesDates" className="text-gray-700 font-medium mb-2">
              Relevant Course(s) and Dates
            </label>
            <textarea
              id="coursesDates"
              name="coursesDates"
              placeholder="Enter relevant course(s) and dates here Ex: Software Engineering - Fall 2023, Intro to Data Science - Spring 2024" 
              className="border rounded-lg p-2 text-gray-600"
              rows="4"
              onChange={(e) => setCoursesDates(e.target.value)}  // Update the courses dates
            ></textarea>
          </div>
        )}

        {/* Courses Qualified to Assist With */}
        <div className="flex flex-col">
          <label htmlFor="qualifiedCourses" className="text-gray-700 font-medium mb-2">
            Courses You Are Qualified to Assist With
          </label>
          <select
            id="qualifiedCourses"
            name="qualifiedCourses"
            className="border rounded-lg p-2 text-gray-600"
            onChange={(e) => setQualifiedCourses(e.target.value)}
          >
            <option value="">Select Course</option>
            {openCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default Applicant;
