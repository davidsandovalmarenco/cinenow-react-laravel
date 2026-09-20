import { Navigate, Route, Routes } from 'react-router';
import Peliculas from '../pages/Peliculas';
import RolesPermisos from '../pages/RolesPermisos';
import Usuarios from '../pages/Usuarios';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PendingApproval from '../pages/PendingApproval';

export default function AppRoutes({
  authenticated,
  permissions,
  hasRole,
  onLogin,
  onRegister,
}) {
  const requiereAprobacion = permissions.length === 0 && !hasRole('Administrador');

  if (!authenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login alRegistro={onRegister} />} />
        <Route path="/register" element={<Register alLogin={onLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (requiereAprobacion) {
    return (
      <Routes>
        <Route path="/pendiente" element={<PendingApproval />} />
        <Route path="*" element={<Navigate to="/pendiente" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/peliculas" element={<Peliculas />} />
      <Route path="/roles" element={<RolesPermisos />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/" element={<Navigate to="/peliculas" replace />} />
      <Route path="*" element={<Navigate to="/peliculas" replace />} />
    </Routes>
  );
}
