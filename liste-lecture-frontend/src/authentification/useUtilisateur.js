import { useState, useEffect } from 'react';

import { useToken, lirePayloadDuToken } from './useToken.js';

export const useUtilisateur = () => {
    const [token] = useToken();

    const [utilisateur, setUtilisateur] = useState(() => {
        if (!token) {
            return null;
        }
        else {
            return lirePayloadDuToken(token);
        }
    });

    useEffect(() => {
        if (!token) {
            setUtilisateur(null);
        }
        else {
            setUtilisateur(lirePayloadDuToken(token));
        }
    }, [token]);

    return utilisateur;
}