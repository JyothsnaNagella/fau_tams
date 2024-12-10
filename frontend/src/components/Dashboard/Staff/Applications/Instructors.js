import React, { useState, useEffect } from "react";
import StaffNavigation from "../StaffNavigation";
import axiosInstance from "../../../../api/axios";

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [newInstructor, setNewInstructor] = useState({
        firstname: "",
        lastname: "",
        email: "",
        course_name: "",
    });
    const [loading, setLoading] = useState(true);

    // Fetch instructors
    useEffect(() => {
        axiosInstance
            .get("/staff/instructors")
            .then((response) => {
                setInstructors(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching instructors:", error);
                setLoading(false);
            });
    }, []);

    // Add new instructor
    const handleAddInstructor = async () => {
        try {
            const response = await axiosInstance.post("/staff/instructors", newInstructor);
            setInstructors([...instructors, response.data]);
            setNewInstructor({ firstname: "", lastname: "", email: "", course_name: "" });
        } catch (error) {
            console.error("Error adding instructor:", error);
        }
    };

    // Remove instructor
    const handleRemoveInstructor = async (id) => {
        try {
            await axiosInstance.delete(`/staff/instructors/${id}`);
            setInstructors(instructors.filter((instructor) => instructor.id !== id));
        } catch (error) {
            console.error("Error removing instructor:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-xl font-bold mb-4">Instructors</h1>

            <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <StaffNavigation />

                {/* Instructor List */}
                <h2 className="text-lg font-semibold mb-4">Instructor List</h2>
                {instructors.length === 0 ? (
                    <p>No instructors available.</p>
                ) : (
                    <ul className="space-y-4">
                        {instructors.map((instructor) => (
                            <li
                                key={instructor.id}
                                className="flex justify-between items-center border p-4 rounded-lg"
                            >
                                <div>
                                    <p>
                                        <strong>Name:</strong> {instructor.firstname} {instructor.lastname}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {instructor.email}
                                    </p>
                                    <p>
                                        <strong>Course:</strong> {instructor.course_name}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemoveInstructor(instructor.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Add New Instructor */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Add New Instructor</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddInstructor();
                    }}
                    className="space-y-4"
                >
                    <div className="flex flex-col">
                        <label htmlFor="firstname" className="font-medium">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={newInstructor.firstname}
                            onChange={(e) =>
                                setNewInstructor({ ...newInstructor, firstname: e.target.value })
                            }
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="lastname" className="font-medium">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={newInstructor.lastname}
                            onChange={(e) =>
                                setNewInstructor({ ...newInstructor, lastname: e.target.value })
                            }
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={newInstructor.email}
                            onChange={(e) =>
                                setNewInstructor({ ...newInstructor, email: e.target.value })
                            }
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="course_name" className="font-medium">
                            Course Name
                        </label>
                        <input
                            type="text"
                            id="course_name"
                            value={newInstructor.course_name}
                            onChange={(e) =>
                                setNewInstructor({ ...newInstructor, course_name: e.target.value })
                            }
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Instructor
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Instructors;
