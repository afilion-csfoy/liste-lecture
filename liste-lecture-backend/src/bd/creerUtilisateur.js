import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { utiliserDB } from './connection';

export function creerUtilisateur(requete, reponse) {
    const { nomUtilisateur, motDePasse } = requete.body;

    if (validerParametres(nomUtilisateur, motDePasse) === true) {
        utiliserDB(async (db) => {
            const utilisateur = await db.collection('utilisateurs').findOne({ nomUtilisateur });

            if (utilisateur) {
                // L'utilisateur existe déjà
                reponse.sendStatus(409);
            }
            else {
                // Encryption du mot de passe
                const motDePasseHash = await bcrypt.hash(motDePasse, 10);

                // Les informations complémentaires pour les utilisateurs
                const infosNouvelUtilisateur = {
                    age: '',
                    pays: '',
                    compteVerifie: false
                }

                const resultat = await db.collection('utilisateurs').insertOne({
                    nomUtilisateur,
                    motDePasseHash,
                    infos: infosNouvelUtilisateur
                });
                const { insertedId } = resultat;

                // Génère un JSON web token à partir des informations de l'utilisateur
                // sauf le mot de passe
                jwt.sign({
                    id: insertedId,
                    nomUtilisateur,
                    infos: infosNouvelUtilisateur
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2d',
                },
                (erreur, token) => {
                    if (erreur) {
                        return reponse.status(500).send(erreur);
                    }
                    reponse.status(200).json({ token });
                }
                )
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