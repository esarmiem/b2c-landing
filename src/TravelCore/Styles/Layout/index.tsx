import React from 'react';
import { Outlet } from 'react-router-dom';

import {Header} from '../../Components/Epic/Header.tsx';
import {Footer} from '../../Components/Epic/Footer.tsx';

const Layout: React.FC = () => {
    return (
        <div className="flex h-screen">

            {/* Main Wrapper */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="flex-1 overflow-auto mt-16 lg:ml-[240px]">
                    <Outlet />
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
