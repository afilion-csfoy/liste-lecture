
import { MongoClient } from 'mongodb';

export const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('liste-lecture');

        await operations(db);

        client.close();
    }
    catch(erreur) {
        reponse.status(500).send("Erreur de konnexion à la bd");
    }
};

export const initialiserCollectionVide = async (collection) => {
    const nombreDocuments = await collection.countDocuments();
    console.log(nombreDocuments)
    if (nombreDocuments > 0) {
        console.log('drop')
        await collection.drop();
    }
};