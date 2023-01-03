import {
    React,
    useState
} from 'react';
import { Navigate } from "react-router-dom";

import { FormulairePiece } from './FormulairePiece.js';
import { useToken } from '../authentification/useToken.js';

export const FormulaireAjouterPiece = () => {
    const [token] = useToken();

    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');

    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'post',
            body: JSON.stringify({ titre, artiste, categorie }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setRediriger(true);
    };

    return (
        <>
            {rediriger ? <Navigate to="/admin" /> : null}
            <FormulairePiece
                titre={titre} setTitre={setTitre}
                artiste={artiste} setArtiste={setArtiste}
                categorie={categorie} setCategorie={setCategorie}
                texteBouton={"Ajouter"} fonctionEnvoyer={envoyerFormulaire}
            />
        </>
    );
}