import {
    React,
    useState,
    useEffect
} from 'react';
import { Navigate } from 'react-router-dom';

import { FormulairePiece } from './FormulairePiece.js';

export const FormulaireModifierPiece = ({ id }) => {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategorie] = useState('');

    const [rediriger, setRediriger] = useState(false);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces/${id}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setTitre(body.titre);
            setArtiste(body.artiste);
            setCategorie(body.categorie);
        };
        chercherDonnees();
    }, [id]);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/modifier/${id}`, {
            method: 'put',
            body: JSON.stringify({ titre, artiste, categorie }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };
    
    return (
    <>
        { rediriger ? <Navigate to="/admin" /> : null }
        <FormulairePiece 
            titre={titre} setTitre={setTitre}
            artiste={artiste} setArtiste={setArtiste}
            categorie={categorie} setCategorie={setCategorie}
            texteBouton={"Modifier"} fonctionEnvoyer={envoyerFormulaire}
        />
    </>
    );
}