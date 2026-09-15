import { useState } from 'react';
import Peliculas from './pages/Peliculas';
import RolesPermisos from './pages/RolesPermisos';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import Register from './pages/Register';
import PendingApproval from './pages/PendingApproval';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const { authenticated, loadingAuth, permissions, hasRole } = useAuth();
  const [paginaActual, setPaginaActual] = useState('peliculas');
  const [mostrandoRegistro, setMostrandoRegistro] = useState(false);

  if (loadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Cargando sesión...</div>;
  }

  if (!authenticated) {
    return mostrandoRegistro ? 
      <Register alLogin={() => setMostrandoRegistro(false)} /> : 
      <Login alRegistro={() => setMostrandoRegistro(true)} />;
  }

  if (permissions.length === 0 && !hasRole('Administrador')) {
    return <PendingApproval />;
  }

  return (
    <>
      {paginaActual === 'peliculas' && <Peliculas cambiarPagina={setPaginaActual} />}
      {paginaActual === 'roles' && <RolesPermisos cambiarPagina={setPaginaActual} />}
      {paginaActual === 'usuarios' && <Usuarios cambiarPagina={setPaginaActual} />}
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
