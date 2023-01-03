import React from 'react';
import { Link } from 'react-router-dom';

import { useToken } from './useToken.js';
import { UtiliseAuth } from './auth.js';

export const OutilConnection = () => {
    const [, setToken] = useToken();
    const {
        utilisateurConnecte,
        setUtilisateurConnecte
    } = UtiliseAuth();

    function handleDeconnecter() {
        setUtilisateurConnecte(null);
        setToken(null);
    }

    return (
        <>
            {!utilisateurConnecte ?
                <Link to="/seConnecter" className="mr-2" >Se connecter</Link> :
                <>
                    Bienvenue {utilisateurConnecte.nomUtilisateur}!
                    <Link to="/" onClick={handleDeconnecter} className="ml-3">Se déconnecter</Link>
                </>
            }
        </>
    );
}