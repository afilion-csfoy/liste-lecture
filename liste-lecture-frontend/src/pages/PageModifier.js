import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { FormulaireModifierPiece } from '../composants/FormulaireModifierPiece.js';

export const PageModifier = () => {
    const { id } = useParams();
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierPiece id={id} />
            <Link to="/admin">
                <Button variant={'danger'} >Annuler</Button>    
            </Link>
        </>
    ); 
}