import { ObjectId } from 'mongodb';

import { utiliserDB } from './connection';

export const modifierPiece = (requete, reponse) => {
    const {titre, artiste, categorie} = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectId.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categorie: categorie
                }
            });
            
            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categorie}`);
    }
};