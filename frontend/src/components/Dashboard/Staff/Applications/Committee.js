import React, { useState, useEffect } from "react";
import StaffNavigation from "../StaffNavigation";
import axiosInstance from "../../../../api/axios";

const Committee = () => {
    const [committee, setCommittee] = useState([]);
    const [newMember, setNewMember] = useState({
        firstname: "",
        lastname: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);

    // Fetch committee members
    useEffect(() => {
        axiosInstance
            .get("/staff/committee")
            .then((response) => {
                setCommittee(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching committee members:", error);
                setLoading(false);
            });
    }, []);

    // Add new committee member
    const handleAddMember = async () => {
        try {
            const response = await axiosInstance.post("/staff/committee", newMember);
            setCommittee([...committee, response.data]);
            setNewMember({ firstname: "", lastname: "", email: "" });
        } catch (error) {
            console.error("Error adding committee member:", error);
        }
    };

    // Remove committee member
    const handleRemoveMember = async (id) => {
        try {
            await axiosInstance.delete(`/staff/committee/${id}`);
            setCommittee(committee.filter((member) => member.id !== id));
        } catch (error) {
            console.error("Error removing committee member:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-xl font-bold mb-4">Committee</h1>

            <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
                <StaffNavigation />

                {/* Committee List */}
                <h2 className="text-lg font-semibold mb-4">Committee Members</h2>
                {committee.length === 0 ? (
                    <p>No committee members available.</p>
                ) : (
                    <ul className="space-y-4">
                        {committee.map((member) => (
                            <li
                                key={member.id}
                                className="flex justify-between items-center border p-4 rounded-lg"
                            >
                                <div>
                                    <p>
                                        <strong>Name:</strong> {member.firstname} {member.lastname}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {member.email}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemoveMember(member.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Add New Member */}
                <h2 className="text-lg font-semibold mt-6 mb-2">Add New Member</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddMember();
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
                            value={newMember.firstname}
                            onChange={(e) =>
                                setNewMember({ ...newMember, firstname: e.target.value })
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
                            value={newMember.lastname}
                            onChange={(e) =>
                                setNewMember({ ...newMember, lastname: e.target.value })
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
                            value={newMember.email}
                            onChange={(e) =>
                                setNewMember({ ...newMember, email: e.target.value })
                            }
                            className="border rounded-lg p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Member
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Committee;
