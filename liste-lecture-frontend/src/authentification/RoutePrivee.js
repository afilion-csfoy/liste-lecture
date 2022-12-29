import React from 'react';
import { Navigate, Route } from 'react-router-dom';

export const RoutePrivee = ({ children }) => {
    const utilisateur = null;

    if (!utilisateur) {
        return <Navigate to="/seConnecter" />;
    }
    else {
        return children;
    }
}