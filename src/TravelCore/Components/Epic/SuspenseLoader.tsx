import React, { useEffect } from 'react';
import NProgress from 'nprogress';

const SuspenseLoader: React.FC = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className="flex items-center justify-center w-full h-full">
            {/* Loader */}
            <svg
                className="animate-spin h-16 w-16 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                ></path>
            </svg>
        </div>
    );
};

export default SuspenseLoader;
