import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

import { utiliserDB } from './connection';

export const modifierPiece = (requete, reponse) => {
    const { authorization } = requete.headers;
    const { titre, artiste, categorie } = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined) {
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
                        reponse.status(500).send("Erreur: l'utilisateur n'a pas les droits nécessaires");
                    }
                }
            })
        }
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categorie: ${categorie}`);
    }
};