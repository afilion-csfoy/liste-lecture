import express from 'express';

import { getPiece } from './bd/getPiece.js';
import { getPieces } from './bd/getPieces.js';
import { ajouterPiece } from './bd/ajouterPiece.js';
import { supprimerPiece } from './bd/supprimerPiece.js';
import { modifierPiece } from './bd/modifierPiece.js';
import { creerUtilisateur } from './bd/creerUtilisateur.js';
import { connecterUtilisateur } from './bd/connecterUtilisateur.js';

const app = express();
app.use(express.json());

app.get('/api/pieces', getPieces);
app.get('/api/pieces/:id', getPiece);
app.post('/api/pieces/ajouter', ajouterPiece);
app.put('/api/pieces/modifier/:id', modifierPiece);
app.delete('/api/pieces/supprimer/:id', supprimerPiece);

app.post('/api/utilisateurs/creer', creerUtilisateur);
app.post('/api/utilisateurs/connecter', connecterUtilisateur);


app.listen(8000, () => console.log('Backend démarré sur le port 8000'));