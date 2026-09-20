import { useNavigate } from 'react-router';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const navigate = useNavigate();
  const { authenticated, loadingAuth, permissions, hasRole } = useAuth();

  if (loadingAuth) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Cargando sesión...</div>;
  }

  return (
    <AppRoutes
      authenticated={authenticated}
      permissions={permissions}
      hasRole={hasRole}
      onLogin={() => navigate('/login')}
      onRegister={() => navigate('/register')}
    />
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
