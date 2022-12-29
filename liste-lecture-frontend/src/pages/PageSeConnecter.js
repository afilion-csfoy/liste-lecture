import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Navigate } from 'react-router-dom';

export const PageSeConnecter = () => {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');

    const [messageErreur, setMessageErreur] = useState('');

    const [redirigerNouvelUtilisateur, setRedirigerNouvelUtilisateur] = useState(false);

    const onClickConnecter = async () => {
        alert('log in click')
    };

    return (
        <>
            { redirigerNouvelUtilisateur ? <Navigate to="/creerUtilisateur" /> : null }
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
                                type="submit"
                                disabled={!nomUtilisateur || !motDePasse}
                                onClick={onClickConnecter}
                            >
                                Se connecter
                            </Button>

                            <Button
                                variant="outline-primary"
                                type="button"
                                onClick={() => setRedirigerNouvelUtilisateur(true)}
                            >
                                Créer un nouvel utilisateur
                            </Button>
                        </Stack>

                    </Form>
                </Col>
            </Row>
        </>
    );
}