import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-8 bg-white shadow rounded">
                <h2 className="text-2xl text-red-600 font-bold">Access Denied</h2>
                <p className="mt-2 text-gray-700">You do not have permission to access this page.</p>
                <a href="/" className="text-blue-500 hover:underline mt-4 inline-block">Go Home</a>
            </div>
        </div>
    );
};

export default UnauthorizedPage;