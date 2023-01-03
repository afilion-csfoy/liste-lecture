import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, Navigate } from 'react-router-dom';

import { useToken } from '../authentification/useToken.js';
import { UtiliseAuth } from '../authentification/auth.js';

export const PageSeConnecter = () => {
    const [, setToken] = useToken();
    const { setUtilisateurConnecte } = UtiliseAuth();

    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const [messageErreur, setMessageErreur] = useState('');

    const [redirigerAcceuil, setRedirigerAcceuil] = useState(false);

    const lirePayloadDuToken = token => {
        const payloadEncode = token.split('.')[1];
        return JSON.parse(atob(payloadEncode));
    }

    const onClickConnecter = async () => {
        const resultat = await fetch(`/api/utilisateurs/connecter`, {
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
            setRedirigerAcceuil(true);
        }
        else {
            setMessageErreur("Le nom et le mot de passe sont incorrects.");
        }

    };

    return (
        <>
            {redirigerAcceuil ? <Navigate to="/" /> : null}
            <Row className="justify-content-md-center">
                <Col md="6" lg="4">
                    <h1>Se connecter</h1>
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
                        <Stack gap={2}>
                            <Button
                                variant="primary"
                                type="button"
                                disabled={!nomUtilisateur || !motDePasse}
                                onClick={onClickConnecter}
                            >
                                Se connecter
                            </Button>

                            <Link to="/creerUtilisateur">
                                <Button
                                    variant="outline-primary"
                                    type="button"
                                    className="w-100"
                                >
                                    Créer un nouvel utilisateur
                                </Button>
                            </Link>
                        </Stack>

                    </Form>
                </Col>
            </Row>
        </>
    );
}