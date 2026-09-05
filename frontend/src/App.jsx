import { useState } from 'react';
import Peliculas from './pages/Peliculas';
import RolesPermisos from './pages/RolesPermisos';

function App() {
  const [paginaActual, setPaginaActual] = useState('peliculas');

  return (
    <>
      {paginaActual === 'peliculas' && <Peliculas cambiarPagina={setPaginaActual} />}
      {paginaActual === 'roles' && <RolesPermisos cambiarPagina={setPaginaActual} />}
    </>
  );
}

export default App;