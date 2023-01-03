import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

import { utiliserDB } from './connection.js';

export const supprimerPiece = (requete, reponse) => {
    const { authorization } = requete.headers;
    const id = requete.params.id;

    if (!authorization) {
        reponse.status(401).json({ message: 'Aucune autorisation recue' })
    }
    else {
        // L'autorisation est de la forme 'Bearer jgbrd.grdgrdg.grdngrd'
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (erreur, utilisateurDecode) => {
            if (erreur) {
                reponse.status(401).json({ message: 'Utilisateur non authentifié' })
            }
            else {
                const { nomUtilisateur } = utilisateurDecode;

                if (nomUtilisateur === 'admin') {
                    utiliserDB(async (db) => {
                        var objectId = ObjectId.createFromHexString(id);
                        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });
                        
                        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
                    }, reponse).catch(
                        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
                    );  
                }
                else {
                    reponse.status(500).send("Erreur: l'utilisateur n'a pas les droits nécessaires");
                }
            }
        })
    }
};