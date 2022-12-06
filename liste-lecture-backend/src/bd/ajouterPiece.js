import { utiliserDB } from './connection';

export function ajouterPiece(requete, reponse) {
    const {titre, artiste, categorie} = requete.body;

    if (validerParametres(titre, artiste, categorie) === true) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({titre, artiste, categorie});
            
            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );        
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
