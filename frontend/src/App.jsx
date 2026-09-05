import { useState } from 'react';
import Peliculas from './pages/Peliculas';
import RolesPermisos from './pages/RolesPermisos';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { authenticated, loadingAuth } = useAuth();
  const [paginaActual, setPaginaActual] = useState('peliculas');

  if (loadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Cargando sesión...</div>;
  }

  if (!authenticated) {
    return <Login />;
  }

  return (
    <>
      {paginaActual === 'peliculas' && <Peliculas cambiarPagina={setPaginaActual} />}
      {paginaActual === 'roles' && <RolesPermisos cambiarPagina={setPaginaActual} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;