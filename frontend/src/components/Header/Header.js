import React from 'react';
import Logout from '../Logout';

const Header = () => {
    return (
        <header className="top-0 w-full py-4 bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo or Title */}
                <h1 className="text-2xl font-bold tracking-wide">
                    TA Management System
                </h1>

                {/* Logout Button */}
                <Logout />
              
            </div>
        </header>
    );
};

export default Header;
