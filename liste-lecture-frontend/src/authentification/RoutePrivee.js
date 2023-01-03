import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUtilisateur } from './useUtilisateur.js';

export const RoutePrivee = ({ children }) => {
    const utilisateur = useUtilisateur();

    if (!utilisateur) {
        return <Navigate to="/seConnecter" />;
    }
    else {
        return children;
    }
}