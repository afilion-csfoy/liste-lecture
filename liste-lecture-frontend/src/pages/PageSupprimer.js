import {
    React,
    useState
} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router';

export const PageSupprimer = () => {
    const { id } = useParams();
    const [rediriger, setRediriger] = useState(false);

    const confirmerSuppression = async () => {
        await fetch(`/api/pieces/supprimer/${id}`, {
            method: 'delete',
        });
        
        setRediriger(true);
    };

    return (
    <>
        { rediriger ? <Navigate to="/admin" /> : null }
        <h1>Supprimer</h1>
        <Alert variant={'danger'} >
            Êtes-vous certain de vouloir supprimer cette pièce?
        </Alert>

        <Button variant={'primary'} className={'me-2'} onClick={confirmerSuppression} >Supprimer</Button>

        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>  
        </Link>
        
    </>
    );
}