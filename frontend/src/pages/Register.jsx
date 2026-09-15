import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Register({ alLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  function cambiarCampo(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setErrores({});
    setCargando(true);
    
    try {
      await register(form);
    } catch (err) {
      if (err.validation) {
        setErrores(err.validation);
      } else {
        setError(err.message || 'Error al registrarse');
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
        
        <h2>Crear Cuenta</h2>
        <p className="login-subtitle">Únete para explorar nuestras películas</p>

        {error && (
          <div className="login-alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label>Nombre completo</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={cambiarCampo}
              placeholder="Tu nombre completo"
              required
            />
            {errores.name && <small style={{color: '#ef4444'}}>{errores.name[0]}</small>}
          </div>

          <div className="field">
            <label>Nombre de usuario (Username)</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={cambiarCampo}
              placeholder="Ej. cinenow_fan"
              required
            />
            {errores.username && <small style={{color: '#ef4444'}}>{errores.username[0]}</small>}
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={cambiarCampo}
              placeholder="correo@ejemplo.com"
              required
            />
            {errores.email && <small style={{color: '#ef4444'}}>{errores.email[0]}</small>}
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={cambiarCampo}
              placeholder="Mínimo 4 caracteres"
              required
            />
            {errores.password && <small style={{color: '#ef4444'}}>{errores.password[0]}</small>}
          </div>

          <button type="submit" className="submit login-submit" disabled={cargando}>
            {cargando ? (
              <>
                <span className="spinner"></span>
                Registrando...
              </>
            ) : (
              'Crear cuenta'
            )}
          </button>

          <p style={{textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--text-muted)'}}>
            ¿Ya tienes cuenta? <button type="button" onClick={alLogin} style={{background: 'none', border: 'none', color: '#e50914', cursor: 'pointer', fontWeight: 'bold'}}>Inicia sesión</button>
          </p>
        </form>
      </div>
    </div>
  );
}
