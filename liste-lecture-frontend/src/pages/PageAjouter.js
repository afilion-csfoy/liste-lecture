import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

import { FormulaireAjouterPiece } from '../composants/FormulaireAjouterPiece.js';

export const PageAjouter = () => {
    return (
    <>
        <h1>Ajouter une nouvelle pièce</h1>
        <FormulaireAjouterPiece />
        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}