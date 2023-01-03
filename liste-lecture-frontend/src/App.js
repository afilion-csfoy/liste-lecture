import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { BarreNavigation } from './composants/BarreNavigation.js';
import { OutilConnection } from './authentification/OutilConnection.js';
import { PageAccueil } from './pages/PageAccueil.js';
import { PageAdmin } from './pages/PageAdmin.js';
import { PageAjouter } from './pages/PageAjouter.js';
import { PageCreerUtilisateur } from './pages/PageCreerUtilisateur.js';
import { PageModifier } from './pages/PageModifier.js';
import { PageRepertoire } from './pages/PageRepertoire.js';
import { PageSeConnecter } from './pages/PageSeConnecter.js';
import { PageSupprimer } from './pages/PageSupprimer.js';
import { Page404 } from './pages/Page404.js';
import { RoutePrivee } from './authentification/RoutePrivee.js';
import { ContexteAuth } from './authentification/auth';
import { useUtilisateur } from './authentification/useUtilisateur.js';

function App() {
  const utilisateur = useUtilisateur();
  const [utilisateurConnecte, setUtilisateurConnecte] = useState(utilisateur);
  return (
    <ContexteAuth.Provider value={{
      utilisateurConnecte, setUtilisateurConnecte
    }}>
    <BrowserRouter>
      <Container>
        <Row className="text-end">
          <Col>
            <OutilConnection />
          </Col>
        </Row>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<PageAccueil />} exact />
          <Route path="/repertoire" element={<PageRepertoire />} />
          <Route path="/admin" element={
            <RoutePrivee>
              <PageAdmin />
            </RoutePrivee>
          } />
          <Route path="/ajouter" element={
            <RoutePrivee>
              <PageAjouter />
            </RoutePrivee>
          } />
          <Route path="/seConnecter" element={<PageSeConnecter />} />
          <Route path="/creerUtilisateur" element={<PageCreerUtilisateur />} />
          <Route path="/modifier/:id" element={
            <RoutePrivee>
              <PageModifier />
            </RoutePrivee>
          } />
          <Route path="/supprimer/:id" element={
            <RoutePrivee>
              <PageSupprimer />
            </RoutePrivee>
          } />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </BrowserRouter>
    </ContexteAuth.Provider>
  );
}

export default App;
