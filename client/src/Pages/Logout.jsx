import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../Store/Auth';

export const Logout = () => {
    const { logoutUser } = useAuth(); // Corrected function name

    useEffect(() => {
        logoutUser(); // Call the logout function
    }, [logoutUser]);

    return <Navigate to="/login" replace />; // Redirect to login page after logout
};
