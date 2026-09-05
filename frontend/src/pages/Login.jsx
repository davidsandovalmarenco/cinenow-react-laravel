import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login({ alRegistro }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  function cambiarCampo(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setCargando(true);
    
    try {
      await login(form);
    } catch (err) {
      if (err.validation && err.validation.login) {
        setError(err.validation.login[0]);
      } else {
        setError(err.message || 'Error al iniciar sesión');
      }
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo login-logo">
          <div className="logo-symbol">C</div>
          <div className="logo-text">Cine<span>Now</span></div>
        </div>
        
        <h2>Iniciar Sesión</h2>
        <p className="login-subtitle">Accede a tu cuenta para continuar</p>

        {error && (
          <div className="login-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>Email o Nombre de usuario</label>
            <input
              type="text"
              name="login"
              value={form.login}
              onChange={cambiarCampo}
              placeholder="Ej. david o correo@ejemplo.com"
              required
            />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={cambiarCampo}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="submit login-submit" disabled={cargando}>
            {cargando ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>

          <p style={{textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)'}}>
            ¿No tienes cuenta? <button type="button" onClick={alRegistro} style={{background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', fontWeight: 'bold'}}>Regístrate</button>
          </p>
        </form>
      </div>
    </div>
  );
}
