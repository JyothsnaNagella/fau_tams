import React, { useState, useEffect } from "react";
import StaffNavigation from "../StaffNavigation"; 
import axiosInstance from "../../../../api/axios"; 

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCourseName, setNewCourseName] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axiosInstance.get('/staff/courses/');
                setCourses(response.data.reverse());
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setLoading(false);
            }
        };

        fetchCourses(); 
    }, []);

    const handleAddCourse = async () => {
        if (!newCourseName.trim()) return;

        try {
            let courseData = {
                coursename: newCourseName,
                status: "Open", // Default status
                department_id: 1, // Adjust as needed
                instructor_id: 1, // Adjust as needed
            }
            const response = await axiosInstance.post('/staff/courses/',courseData);
            courseData = {
                ...courseData,
                id: response.data.courseId
            }
            setCourses([courseData, ...courses]);
            setNewCourseName("");
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    const handleRemoveCourse = async (id) => {
        try {
            await axiosInstance.delete(`/staff/courses/${id}/`);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.error("Error removing course:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-xl font-bold mb-4">Courses</h1>

            <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <StaffNavigation />

                <div className="mb-4">
                    <h2 className="text-lg font-semibold">Add a New Course</h2>
                    <div className="flex items-center space-x-2 mt-2">
                        <input
                            type="text"
                            placeholder="Course Name"
                            value={newCourseName}
                            onChange={(e) => setNewCourseName(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                        />
                        <button
                            onClick={handleAddCourse}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add Course
                        </button>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">Existing Courses</h2>
                {courses.length === 0 ? (
                    <div>No courses available.</div>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="flex justify-between items-center border p-4 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium">
                                        <span className="font-semibold">Course ID:</span> {course.id}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Name:</span> {course.coursename}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Status:</span> {course.status}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemoveCourse(course.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
};

export default Courses;
