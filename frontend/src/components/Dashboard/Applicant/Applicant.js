import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axios";



const Applicant = () => {
  const [isPrevTA, setIsPrevTA] = useState(false);
  const [coursesDates, setCoursesDates] = useState([]);
  const [qualifiedCourses, setQualifiedCourses] = useState(-1);
  const [cvFile, setCVFile] = useState(null);  // Track the selected CV file
  const [gpa, setGpa] = useState(""); // GPA state
  const [levelOfEducation, setLevelOfEducation] = useState(""); // Level of Education state
  const [graduationDate, setGraduationDate] = useState(""); // Graduation Date state
  const [previousExperience, setPreviousExperience] = useState(""); // Previous Experience state
  const [duration, setDuration] = useState(""); // Duration state
  const [department, setDepartment] = useState(""); // Department  state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createNewApplication, setCreateNewApplication] = useState(false);
  const [applications, setApplications] = useState([
    {
      "id": 1,
      "courseName": "Software Engineering",
      "status": "Accepted"
    },
    {
      "id": 2,
      "courseName": "Intro to Data Science",
      "status": "Pending"
    }
  ]);

  useEffect(() => {
    const fetchApplications = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axiosInstance.get('/applicant/' + userId + '/applications');
        
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);


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
      gpa,
      levelOfEducation,
      graduationDate,
      cv: cvFile,
      previousExperience,
      duration,
      department,
    };

    try {
      // Send the form data to the backend
      const response = await axiosInstance.post('/applicant/1/apply', data, {
        headers: {
          "Content-Type": "multipart/form-data",  // This is important for file uploads
        },
      });

      console.log("File uploaded successfully:", response.data);
      // Handle successful submission (e.g., show a success message)
      if (response.status === 201) {
        setFormSubmitted(true);
      }

    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-800">Application Status</h3>
        {applications.length > 0 ? (
          <ul className="mt-4">
            {applications.map((app) => (
              <li key={app.id} className="mb-4 border p-4 rounded-lg">
                <p>
                  <strong>Course:</strong> {courses.find(course => course.id ===  app.course_id)?.name}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      app.status === "Accepted"
                        ? "text-green-500"
                        : app.status === "Pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }
                  >
                    {app.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No applications found.</p>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">TA Application Form</h2>

      {formSubmitted ? (
        <p className="text-green-500">Form submitted successfully!</p>
      ) : (
        createNewApplication ? (
          <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
          {/* GPA */}
          <div className="flex flex-col">
            <label htmlFor="gpa" className="text-gray-700 font-medium mb-2">
              GPA
            </label>
            <input
              type="text"
              id="gpa"
              name="gpa"
              value={gpa}
              onChange={(e) => setGpa(e.target.value)} // Update GPA state
              className="border rounded-lg p-2 text-gray-600"
              placeholder="Enter your GPA"
              required
            />
          </div>
  
          {/* Level of Education */}
          <div className="flex flex-col">
            <label htmlFor="levelOfEducation" className="text-gray-700 font-medium mb-2">
              Level of Education
            </label>
            <select
              id="levelOfEducation"
              name="levelOfEducation"
              value={levelOfEducation}
              onChange={(e) => setLevelOfEducation(e.target.value)} // Update Level of Education state
              className="border rounded-lg p-2 text-gray-600"
              required
            >
              <option value="">Select Level</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
            </select>
          </div>
  
          {/* Graduation Date */}
          <div className="flex flex-col">
            <label htmlFor="graduationDate" className="text-gray-700 font-medium mb-2">
              Date of Graduation
            </label>
            <input
              type="date"
              id="graduationDate"
              name="graduationDate"
              value={graduationDate}
              onChange={(e) => setGraduationDate(e.target.value)} // Update Graduation Date state
              className="border rounded-lg p-2 text-gray-600"
              required
            />
          </div>
  
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
  
          {/* Relevant Course(s) and Dates - Show this only if "Yes" */}
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
              {/* Previous Experience */}
              <div className="flex flex-col">
              <label htmlFor="previousExperience" className="text-gray-700 font-medium mb-2">
                  Previous Experience
              </label>
              <input
                  type="text"
                  id="previousExperience"
                  name="previousExperience"
                  value={previousExperience}
                  onChange={(e) => setPreviousExperience(e.target.value)} // Update Previous Experience state
                  className="border rounded-lg p-2 text-gray-600"
                  placeholder="Enter your previous experience"
                  required
              />
              </div>
               {/* Duration */}
          <div className="flex flex-col">
            <label htmlFor="duration" className="text-gray-700 font-medium mb-2">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)} // Update Duration state
              className="border rounded-lg p-2 text-gray-600"
              placeholder="Enter duration of previous experience"
              required
            />
          </div>
  
  
            </div>
          )}
        {/* Department */}
  <div className="flex flex-col">
    <label htmlFor="department" className="text-gray-700 font-medium mb-2">
      Department 
    </label>
    <select
      id="department"
      name="department"
      value={department}
      onChange={(e) => setDepartment(e.target.value)} // Update Department  state
      className="border rounded-lg p-2 text-gray-600"
      required
    >
      <option value="">Select Department</option>
      <option value="1">Computer Science</option>
      <option value="2">Data Science</option>
      <option value="3">Artificial Intelligence</option>
      <option value="4">Electrical Engineering</option>
      <option value="5">Mechanical Engineering</option>
    </select>
  </div>
  
  
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
  
        ) : (
          <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={() => setCreateNewApplication(true)}
        >
          Create New Application
        </button>

        )
      )}

    </div>
  );
};

export default Applicant;
