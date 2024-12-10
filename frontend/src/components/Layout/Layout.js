import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => {
    const headerHeight = "64px"; // Adjust based on your header height

    return (
        <div className="overflow-hidden flex flex-col">
            <Header />
            <main
                className="flex-grow mt-4 px-6"
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
