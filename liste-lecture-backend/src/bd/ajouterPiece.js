import jwt from 'jsonwebtoken';

import { utiliserDB } from './connection';

export function ajouterPiece(requete, reponse) {
    const { authorization } = requete.headers;
    const { titre, artiste, categorie } = requete.body;

    if (validerParametres(titre, artiste, categorie) === true) {
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
                            await db.collection('pieces').insertOne({ titre, artiste, categorie });
    
                            reponse.status(200).send("La pièce a été ajoutée")
                        }, reponse).catch(
                            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
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
}

function validerParametres(titre, artiste, categorie) {
    let resultat = false;

    if (titre !== undefined && artiste !== undefined && categorie !== undefined
        && titre !== "" && artiste !== "" && categorie !== "") {
        resultat = true;
    }
    return resultat;
}
