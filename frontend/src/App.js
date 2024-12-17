import './App.css';
import Auth from './pages/Auth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CadastroEvento from './pages/Cadastro/Evento';
import Container from './components/Layout/Container';
import LayoutWithoutLayout from './components/Layout/LayoutWithoutNav';
import LayoutWithLayout from './components/Layout/LayoutWithNav';
import CadastroAcoes from './pages/Cadastro/SubEventos';
import Evento from './pages/Eventos';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          
          <Route element={<LayoutWithoutLayout />}>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Route>

          <Route element={<LayoutWithLayout />} >
          <Route path="/eventos" element={<Evento />} />
          <Route path="/cadastro/evento" element={<CadastroEvento />} />
          <Route path="/cadastro/curso" element={<CadastroAcoes categorie="Curso" />} />
          <Route path="/cadastro/seminario" element={<CadastroAcoes categorie="Seminário" />} />
          <Route path="/cadastro/palestra" element={<CadastroAcoes categorie="Palestra" />} />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
