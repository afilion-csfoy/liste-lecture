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
                    acompteVerifie: false
                }

                const resultat = await db.collection('utilisateurs').insertOne({
                    nomUtilisateur,
                    motDePasseHash,
                    infos: infosNouvelUtilisateur
                });
                const { insertedId } = resultat;

                reponse.status(200).send("Utilisateur ajouté");
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