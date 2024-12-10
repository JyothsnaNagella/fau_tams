import React from "react";
import Staff from './Staff';
import Applicant from "./Applicant";
import Committee from "./Committee";
import Instructor from "./Instructor";

const Dashboard = () => {
    const userType = localStorage.getItem('userType');
    console.log(userType);
    return (
        <div>
            {/* Main content area */}
            <main className="flex-grow py-6 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto">
                    {/* Staff Section */}
                    {userType === 'applicant' && <Applicant/>}
                    {userType === 'committee' && <Committee />}
                    {userType === 'instructor' && <Instructor />}
                    {userType === 'staff' && <Staff />}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
