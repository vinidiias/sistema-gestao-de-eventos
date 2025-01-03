import './App.css';
import Auth from './pages/Auth'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CadastroEvento from './pages/Cadastro/Evento';
import Container from './components/Layout/Container';
import LayoutWithoutLayout from './components/Layout/LayoutWithoutNav';
import LayoutWithLayout from './components/Layout/LayoutWithNav';
import CadastroAcoes from './pages/Cadastro/SubEventos';
import Evento from './pages/Eventos';
import Contact from './pages/Contact';
import Empresa from './pages/Empresa';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          
          <Route element={<LayoutWithoutLayout />}>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Route>

          <Route element={<LayoutWithLayout />} >
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* PASSAR URL DA API POR PROPS */}

            <Route path="/eventos" element={<Evento />} />
            <Route path="/eventos/abertos" element={<Evento title="Eventos Abertos" txtBtn="Cadastrar Evento" type="open" />} />
            <Route path="/eventos/inscritos" element={<Evento title="Eventos Inscritos" type="subscribe" />} />
            <Route path="/eventos/inscritos/atividades/abertos" element={<Evento title="Atividades Abertas" txtBtn="Cadastrar Atividades" type="open" />} />
            <Route path="/eventos/inscritos/atividades/inscritos" element={<Evento title="Atividades Inscritas" type="subscribe" />} />
            
            <Route path="/admin/eventos/cadastro/evento" element={<CadastroEvento />} />
            <Route path="/admin/eventos/:id/cadastro/curso" element={<CadastroAcoes categorie="Curso" />} />
            <Route path="/admin/eventos/:id/cadastro/seminario" element={<CadastroAcoes categorie="Seminário" />} />
            <Route path="/admin/eventos/:id/cadastro/palestra" element={<CadastroAcoes categorie="Palestra" />} />
          </Route>

        </Routes>
    </BrowserRouter>
  );
}

export default App;
