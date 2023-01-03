import { useState, useEffect } from 'react';

import { useToken } from './useToken.js';

export const useUtilisateur = () => {
    const [token] = useToken();

    const lirePayloadDuToken = token => {
        const payloadEncode = token.split('.')[1];
        return JSON.parse(atob(payloadEncode));
    }

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