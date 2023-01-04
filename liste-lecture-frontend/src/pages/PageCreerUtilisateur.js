import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, Navigate } from 'react-router-dom';

import { useToken, lirePayloadDuToken } from '../authentification/useToken.js';
import { UtiliseAuth } from '../authentification/auth.js';

export const PageCreerUtilisateur = () => {
    const [, setToken] = useToken();
    const { setUtilisateurConnecte } = UtiliseAuth();

    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');

    const [messageErreur, setMessageErreur] = useState('');

    const [redirigerConnection, setRedirigerConnection] = useState(false);

    const onClickCreerUtilisateur = async () => {
        const resultat = await fetch(`/api/utilisateurs/creer`, {
            method: 'post',
            body: JSON.stringify({ nomUtilisateur, motDePasse }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (resultat.status === 200) {
            const { token: tokenRecu } = await resultat.json().catch((error) => { console.log(error) });
            setToken(tokenRecu);
            setUtilisateurConnecte(lirePayloadDuToken(tokenRecu));
            setRedirigerConnection(true);
        }
        else {
            setMessageErreur("L'utilisateur existe déjà");
        }
    };

    return (
        <>
            {redirigerConnection && <Navigate to="/repertoire" />}
            <Row className="justify-content-md-center">
                <Col md="6" lg="4">
                    <h1>Créer un nouvel utilisateur</h1>
                    {messageErreur && <Alert variant="danger">{messageErreur}</Alert>}
                    <Form>
                        <Form.Group className="mb-3" controlId="nomUtilisateur">
                            <Form.Label>Nom d'utilisateur</Form.Label>
                            <Form.Control
                                type="text"
                                value={nomUtilisateur}
                                onChange={e => setNomUtilisateur(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="motDePasse">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={motDePasse}
                                onChange={e => setMotDePasse(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="confirmationMotDePasse">
                            <Form.Label>Confirmer le mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmationMotDePasse}
                                onChange={e => setConfirmationMotDePasse(e.target.value)}
                            />
                        </Form.Group>

                        <Stack gap={2}>
                            <Button
                                variant="primary"
                                type="button"
                                disabled={!nomUtilisateur || !motDePasse
                                    || motDePasse !== confirmationMotDePasse}
                                onClick={onClickCreerUtilisateur}
                            >
                                Créer utilisateur
                            </Button>

                            <Link to="/seConnecter">
                                <Button
                                    variant="outline-primary"
                                    type="button"
                                    className="w-100"
                                >
                                    Vous avez déjà un utilisateur? Se connecter
                                </Button>
                            </Link>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </>
    );
}