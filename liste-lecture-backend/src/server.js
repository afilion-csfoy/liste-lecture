import express from 'express';

const app = express();

app.get('/hello', (requete, reponse) => {
    reponse.send("Hello world");
})

app.listen(8000, () => console.log('Backend démarré sur le port 8000'));