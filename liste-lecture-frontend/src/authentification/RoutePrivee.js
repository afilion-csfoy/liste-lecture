import React from 'react';
import { Navigate } from 'react-router-dom';

import { UtiliseAuth } from './auth.js';

export const RoutePrivee = ({ children }) => {
    const { utilisateurConnecte } = UtiliseAuth();

    if (!utilisateurConnecte) {
        return <Navigate to="/seConnecter" />;
    }
    else {
        return children;
    }
}