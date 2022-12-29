import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { BarreNavigation } from './composants/BarreNavigation.js';
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

function App() {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<PageAccueil />} exact />
          <Route path="/repertoire" element={<PageRepertoire />} />
          <Route path="/admin" element={
            <RoutePrivee>
              <PageAdmin />
            </RoutePrivee>
          } />
          <Route path="/ajouter" element={<PageAjouter />} />
          <Route path="/seConnecter" element={<PageSeConnecter />} />
          <Route path="/creerUtilisateur" element={<PageCreerUtilisateur />} />
          <Route path="/modifier/:id" element={<PageModifier />} />
          <Route path="/supprimer/:id" element={<PageSupprimer />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
