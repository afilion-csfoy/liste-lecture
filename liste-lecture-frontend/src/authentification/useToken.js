import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInterne] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = nouveauToken => {
        localStorage.setItem('token', nouveauToken);
        setTokenInterne(nouveauToken);

        if (!nouveauToken) {
            localStorage.removeItem('token');
        }
    } 

    return [token, setToken];
};

export const lirePayloadDuToken = token => {
    const payloadEncode = token.split('.')[1];
    return JSON.parse(atob(payloadEncode));
}