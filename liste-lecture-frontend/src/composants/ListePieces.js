import React from 'react';
import Alert from 'react-bootstrap/Alert'

import { PiecesDansCategorie } from './PiecesDansCategorie.js';

export const ListePieces = ({ pieces, estAdmin }) => {
    if (pieces?.length) {
        var dictionnaireCategories = Object();

        pieces.forEach(piece => {
            if (dictionnaireCategories[piece.categorie] === undefined) {
                dictionnaireCategories[piece.categorie] = true;
            }
        });

        const categories = Object.keys(dictionnaireCategories);

        return (
            <>
                {categories.map((categorie) => {
                    const piecesAssociees = pieces.filter((piece) => piece.categorie === categorie);
                    return <PiecesDansCategorie 
                                categorie={categorie} 
                                pieces={piecesAssociees} 
                                estAdmin={estAdmin}
                            />
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}