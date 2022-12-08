import {
    React,
    useState
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const FormulairePiece = ({
    titre, setTitre,
    artiste, setArtiste,
    categorie, setCategorie,
    texteBouton, fonctionEnvoyer }) => {
        
    const [titreEstPresent, setTitreEstPresent] = useState(true);
    const [artisteEstPresent, setArtisteEstPresent] = useState(true);
    const [categorieEstPresent, setCategorieEstPresent] = useState(true);

    function validerFormulaire() {
        setTitreEstPresent(titre !== "");
        setArtisteEstPresent(artiste !== "");
        setCategorieEstPresent(categorie !== "");

        if ((titre !== "") && (artiste !== "") && (categorie !== "")) {
            fonctionEnvoyer();
        }
    }

    return (
        <Form className="mb-1">
            <Form.Group>
                <Form.Label htmlFor="inputTitre">Titre
                    {titreEstPresent === false ?
                        <span className="text-danger"> * Vous devez entrer un titre.</span>
                        : undefined
                    }</Form.Label>
                <Form.Control type="text" value={titre} id="inputTitre"
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputArtiste">Artiste / Groupe
                    {artisteEstPresent === false ?
                        <span className="text-danger"> * Vous devez entrer un nom d'artiste.</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={artiste} id="inputArtiste"
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label htmlFor="inputCategorie">Catégorie
                    {categorieEstPresent === false ?
                        <span className="text-danger"> * Vous devez entrer une catégorie.</span>
                        : undefined
                    }
                </Form.Label>
                <Form.Control type="text" value={categorie} id="inputCategorie"
                    onChange={(event) => setCategorie(event.target.value)} />
            </Form.Group>

            <Button className="mt-2" variant="primary" onClick={validerFormulaire} >
                {texteBouton}
            </Button>
        </Form>
    )
}