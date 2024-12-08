import React from "react";
import Admin from './Admin';
import Applicant from "./Applicant";
import Committee from "./Committee";
import Instructor from "./Instructor";

const Dashboard = () => {
    const userType = localStorage.getItem('userType');
    console.log(userType);
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Main content area */}
            <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Dashboard Header */}
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-gray-800">Dashboard</h3>
                    </div>

                    {/* Admin Section */}
                    {userType === 'applicant' && <Applicant/>}
                    {userType === 'committee' && <Committee />}
                    {userType === 'instructor' && <Instructor />}
                    {userType === 'admin' && <Admin />}


                    
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
