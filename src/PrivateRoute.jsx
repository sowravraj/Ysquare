import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('auth') === 'true';

    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
