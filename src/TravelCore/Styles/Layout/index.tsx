import { Outlet } from 'react-router-dom';

import {Header} from '../../Components/Epic/Header.tsx';
import {Footer} from '../../Components/Epic/Footer.tsx';

const Layout = () => {
    return (
        <div className="flex min-h-screen flex-col flex-1">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="overflow-auto flex-1 flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Layout;
