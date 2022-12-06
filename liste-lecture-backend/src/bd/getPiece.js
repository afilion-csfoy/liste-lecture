import { ObjectId } from 'mongodb';

import { utiliserDB } from './connection';

export const getPiece = (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectId.createFromHexString(id);

        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        
        reponse.status(200).json(infoPiece);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
};