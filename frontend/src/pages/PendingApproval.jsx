import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function PendingApproval() {
  const { user, refreshUser, logout } = useAuth();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function checkApproval() {
    setBusy(true);
    setMessage('');
    try {
      await refreshUser();
      setMessage('Si sigues viendo esta pantalla, tu cuenta aún no tiene permisos asignados.');
    } catch {
      setMessage('No se pudo consultar tu acceso. Intenta nuevamente.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="login-container">
      <section className="login-box">
        <h2>Cuenta pendiente de aprobación</h2>
        <p className="login-subtitle">Hola, {user?.name}. Tu cuenta está registrada, pero todavía no tiene permisos. Espera a que David o un administrador te asigne un rol para acceder.</p>
        {message && <p role="status" className="login-subtitle">{message}</p>}
        <button className="submit login-submit" onClick={checkApproval} disabled={busy}>
          {busy ? 'Consultando...' : 'Comprobar aprobación'}
        </button>
        <button className="submit login-submit" onClick={logout}>Cerrar sesión</button>
      </section>
    </main>
  );
}
