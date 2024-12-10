import React, { useState, useEffect } from "react";
import StaffNavigation from "../StaffNavigation";
import axiosInstance from "../../../../api/axios";

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axiosInstance.get("/staff/department");
            setDepartments(response.data);
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const handleAddDepartment = async () => {
        if (newDepartment.trim() === "") return;
        setLoading(true);
        try {
            await axiosInstance.post("/staff/department", { name: newDepartment });
            setNewDepartment("");
            fetchDepartments();
        } catch (error) {
            console.error("Error adding department:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveDepartment = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`/staff/department/${id}`);
            fetchDepartments();
        } catch (error) {
            console.error("Error removing department:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Departments</h1>

            <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <StaffNavigation />

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Department</h2>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            placeholder="Department Name"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                        />
                        <button
                            onClick={handleAddDepartment}
                            disabled={loading}
                            className={`px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 ${
                                loading && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Add
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                    ID
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700">
                                    Name
                                </th>
                                <th className="px-4 py-2 border border-gray-300 text-center font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((department) => (
                                <tr key={department.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                        {department.id}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-700">
                                        {department.name}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                        <button
                                            onClick={() => handleRemoveDepartment(department.id)}
                                            disabled={loading}
                                            className={`px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 ${
                                                loading && "opacity-50 cursor-not-allowed"
                                            }`}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default Departments;
