import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Layout from './components/Layout';
import Menu from './components/Menu';
import ListManager from './components/ListManager';
import Paquetes from './components/Paquetes';
import PaquetesEdit from './components/PaquetesEdit';
import Eventos from './components/Eventos';
import EventosEdit from './components/EventosEdit';
import Usuarios from './components/Usuarios';

import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 'user',
  'Admin': 'admin'
}

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="/" element={<Menu />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="paquetes" element={<ListManager listName={'Paquetes'} />} />
        <Route path="paquetes/:id" element={<Paquetes />} />
        <Route path="eventos" element={<ListManager listName={'Eventos'} />} />
        <Route path="eventos/:id" element={<Eventos />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>\
          <Route path="usuarios" element={<ListManager listName={'Usuarios'} />} />
          <Route path="paquetes/:id/editor" element={<PaquetesEdit />} />
          <Route path="eventos/:id/editor" element={<EventosEdit />} />
          <Route path="Usuarios/:id" element={<Usuarios />} />
          {/* <Route path="Usuarios/:id/editor" element={<Register />} /> */}
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;