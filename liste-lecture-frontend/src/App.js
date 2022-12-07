import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import { BarreNavigation } from './composants/BarreNavigation';
import { PageAccueil } from './pages/PageAccueil';
import { PageAdmin } from './pages/PageAdmin';
import { PageAjouter } from './pages/PageAjouter';
import { PageModifier } from './pages/PageModifier';
import { PageRepertoire } from './pages/PageRepertoire';
import { PageSupprimer } from './pages/PageSupprimer';
import { Page404 } from './pages/Page404';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<PageAccueil />} exact />
          <Route path="/repertoire" element={<PageRepertoire />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/ajouter" element={<PageAjouter />} />
          <Route path="/modifier/:id" element={<PageModifier />} />
          <Route path="/supprimer/:id" element={<PageSupprimer />} />
          <Route path="*" element={<Page404 />} />
        </Routes>        
      </Container>
    </BrowserRouter>
  );
}

export default App;
