import { ObjectId } from 'mongodb';

import { utiliserDB } from './connection.js';

export const supprimerPiece = (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectId.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });
        
        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );  
};