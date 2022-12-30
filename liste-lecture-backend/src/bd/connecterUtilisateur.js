import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { utiliserDB } from './connection';

export function connecterUtilisateur(requete, reponse) {
    const { nomUtilisateur, motDePasse } = requete.body;

    if (validerParametres(nomUtilisateur, motDePasse) === true) {
        utiliserDB(async (db) => {
            const utilisateur = await db.collection('utilisateurs').findOne({ nomUtilisateur });

            if (!utilisateur) {
                // L'utilisateur n'existe pas
                reponse.sendStatus(401);
            }
            else {
                const { _id: id, motDePasseHash, infos } = utilisateur;

                const estCorrect = await bcrypt.compare(motDePasse, motDePasseHash);

                if (estCorrect) {
                    jwt.sign({
                        id,
                        nomUtilisateur,
                        infos
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2d',
                    },
                    (erreur, token) => {
                        if (erreur) {
                            reponse.status(500).send(erreur);
                        }
                        else {
                            reponse.status(200).json({ token });
                        }
                    });
                }
                else {
                    reponse.sendStatus(401);
                }
            }

        }, reponse).catch(
            () => reponse.status(500).send("Erreur : l'utilisateur n'a pas été ajouté")
        );
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nomUtilisateur: ${nomUtilisateur}
            - motDePasse: ${motDePasse}`);
    }
}

function validerParametres(nomUtilisateur, motDePasse) {
    let resultat = false;

    if (nomUtilisateur !== undefined && motDePasse !== undefined
        && nomUtilisateur !== "" && motDePasse !== "") {
        resultat = true;
    }
    return resultat;
}