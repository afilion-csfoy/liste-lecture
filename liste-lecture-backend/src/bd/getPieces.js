import { utiliserDB } from './connection';

export function getPieces (requete, reponse) {
    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find().toArray();
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
}