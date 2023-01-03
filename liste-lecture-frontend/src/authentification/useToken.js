import { useState } from 'react';

export const useToken = () => {
    const [token, setTokenInterne] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = nouveauToken => {
        localStorage.setItem('token', nouveauToken);
        setTokenInterne(nouveauToken);
    } 

    return [token, setToken];
};