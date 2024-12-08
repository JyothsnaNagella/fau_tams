import React from 'react';
import Header from '../Header';

const Layout = ({ children }) => {
    const headerHeight = "64px"; // Adjust based on your header height

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main
                className="flex-grow mt-16 px-6"
                style={{ marginTop: headerHeight }}
            >
                {children}
            </main>
        </div>
    );
};

export default Layout;
