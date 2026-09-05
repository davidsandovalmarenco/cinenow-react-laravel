import { useEffect, useState } from 'react';
import { listarUsuarios, asignarRoles } from '../services/usersApi';
import { listarRoles } from '../services/rolesApi';
import { useAuth } from '../context/AuthContext';
import './Peliculas.css';

export default function Usuarios({ cambiarPagina }) {
  const { user, roles: userRoles, logout, hasPermission } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');

  async function cargar() {
    try {
      setCargando(true);
      setErrorGeneral('');
      const dataUsuarios = await listarUsuarios();
      const dataRoles = await listarRoles();
      setUsuarios(dataUsuarios);
      setRolesList(dataRoles);
    } catch (error) {
      if (error.status === 401) logout();
      setErrorGeneral(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function editarUsuario(u) {
    setEditandoId(u.id);
    setSelectedRoles(u.roles ? u.roles.map(r => r.name) : []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setEditandoId(null);
    setSelectedRoles([]);
    setErrorGeneral('');
  }

  function toggleRole(roleName, checked) {
    if (checked) {
      setSelectedRoles(prev => [...prev, roleName]);
    } else {
      setSelectedRoles(prev => prev.filter(r => r !== roleName));
    }
  }

  async function guardar(e) {
    e.preventDefault();
    if (!editandoId) return;

    setGuardando(true);
    setErrorGeneral('');

    try {
      await asignarRoles(editandoId, selectedRoles);
      setEditandoId(null);
      setSelectedRoles([]);
      await cargar();
    } catch (error) {
      if (error.status === 401) logout();
      else if (error.status === 403) setErrorGeneral('No tienes permiso.');
      else setErrorGeneral(error.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <div className="logo">
            <div className="logo-symbol">C</div>
            <div className="logo-text">Cine<span>Now</span></div>
          </div>
          <p className="nav-title">GENERAL</p>
          <nav>
            <button className="nav-item" onClick={() => cambiarPagina?.('peliculas')}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"/><path d="M8 8h8M8 12h8M8 16h5" /></svg>
              Películas
            </button>
            {hasPermission('roles.ver') && (
              <button className="nav-item" onClick={() => cambiarPagina?.('roles')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                Roles y permisos
              </button>
            )}
            {userRoles.includes('Administrador') && (
              <button className="nav-item active" onClick={() => cambiarPagina?.('usuarios')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Usuarios
              </button>
            )}
            <div className="nav-item muted">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m10 9 5 3-5 3V9Z" /></svg>
              Módulo activo
            </div>
          </nav>
        </div>
        <div className="sidebar-footer">
          <div className="user-profile" style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <strong style={{ fontSize: '14px', color: '#fff' }}>{user?.name}</strong>
            <small style={{ color: 'var(--text-muted)' }}>{userRoles.join(', ')}</small>
            <button onClick={logout} style={{ marginTop: '8px', padding: '6px 12px', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start' }}>Cerrar sesión</button>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <div className="breadcrumb">CineNow <span>/</span> Usuarios</div>
            <h1>Usuarios</h1>
            <p>Gestiona los usuarios registrados y asígnales roles.</p>
          </div>
        </header>

        <div className="workspace">
          {editandoId && (
            <section className="panel form-panel">
              <div className="panel-header">
                <div>
                  <span className="section-label">ASIGNAR ROLES</span>
                  <h2>Modificar permisos de usuario</h2>
                </div>
              </div>
              
              {errorGeneral && <div className="alert">{errorGeneral}</div>}

              <form className="form" onSubmit={guardar}>
                <div className="field">
                  <label>Roles disponibles</label>
                  <div className="permissions-grid" style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
                    {rolesList.map(rol => (
                      <label key={rol.id} className="switch-field" style={{ padding: '10px', background: 'var(--surface-color)', borderRadius: '8px' }}>
                        <div><strong>{rol.name}</strong></div>
                        <input type="checkbox" checked={selectedRoles.includes(rol.name)} onChange={(e) => toggleRole(rol.name, e.target.checked)} />
                        <span className="switch"><i></i></span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                  <button className="submit" type="submit" disabled={guardando} style={{ flex: 1 }}>
                    {guardando ? 'Guardando...' : 'Asignar roles →'}
                  </button>
                  <button type="button" onClick={cancelarEdicion} style={{ padding: '0 20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}>
                    Cancelar
                  </button>
                </div>
              </form>
            </section>
          )}

          <section className="panel movies-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">BASE DE DATOS</span>
                <h2>Listado de Usuarios</h2>
              </div>
            </div>

            {cargando ? (
              <div className="state"><span className="loader"></span><strong>Cargando...</strong></div>
            ) : (
              <div className="movie-list">
                {usuarios.map(u => (
                  <article className="movie" key={u.id}>
                    <div className="movie-body">
                      <div className="movie-top">
                        <h3>{u.name}</h3>
                        <span className="status active"><i></i>{u.email}</span>
                      </div>
                      <p className="synopsis" style={{ marginTop: '15px' }}>
                        <strong>Roles:</strong> {u.roles?.map(r => r.name).join(', ') || 'Ninguno'}
                      </p>
                      <div className="movie-actions" style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <button onClick={() => editarUsuario(u)} style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', width: '100%' }}>
                          Asignar Roles
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
