import { useEffect, useState } from 'react';
import {
  listarRoles,
  listarPermisos,
  crearRol,
  actualizarRol,
  eliminarRol,
} from '../services/rolesApi';
import { useAuth } from '../context/AuthContext';

import './Peliculas.css';

const formularioInicial = {
  name: '',
  permissions: [],
};

export default function RolesPermisos({ cambiarPagina }) {
  const { user, roles: userRoles, logout, hasPermission } = useAuth();
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [form, setForm] = useState(formularioInicial);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [errorGeneral, setErrorGeneral] = useState('');
  const [errores, setErrores] = useState({});

  async function cargar() {
    try {
      setCargando(true);
      setErrorGeneral('');

      const datosRoles = await listarRoles();
      const datosPermisos = await listarPermisos();
      setRoles(datosRoles);
      setPermisos(datosPermisos);
    } catch (error) {
      if (error.status === 401) {
        logout();
      }
      setErrorGeneral(error.message);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function cambiarCampo(e) {
    const { name, value, type, checked } = e.target;
    
    if (name === 'permissions') {
      const permisoId = value;
      setForm((anterior) => {
        const nuevosPermisos = checked
          ? [...anterior.permissions, permisoId]
          : anterior.permissions.filter((p) => p !== permisoId);
        return { ...anterior, permissions: nuevosPermisos };
      });
    } else {
      setForm((anterior) => ({
        ...anterior,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  }

  async function guardar(e) {
    e.preventDefault();

    setGuardando(true);
    setErrorGeneral('');
    setErrores({});

    try {
      if (editandoId) {
        await actualizarRol(editandoId, form);
      } else {
        await crearRol(form);
      }

      setForm(formularioInicial);
      setEditandoId(null);
      await cargar();
    } catch (error) {
      if (error.status === 401) {
        logout();
      } else if (error.status === 403) {
        setErrorGeneral('No tienes permiso para realizar esta acción.');
      } else {
        setErrorGeneral(error.message);
      }
      setErrores(error.validation || {});
    } finally {
      setGuardando(false);
    }
  }

  function editarRol(rol) {
    setForm({
      name: rol.name,
      permissions: rol.permissions ? rol.permissions.map(p => p.name) : [],
    });
    setEditandoId(rol.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setForm(formularioInicial);
    setEditandoId(null);
    setErrorGeneral('');
    setErrores({});
  }

  async function borrarRol(id) {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este rol?')) return;
    
    try {
      await eliminarRol(id);
      await cargar();
    } catch (error) {
      if (error.status === 401) logout();
      else if (error.status === 403) alert('No tienes permiso para eliminar.');
      else alert('Error al eliminar: ' + error.message);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div>
          <div className="logo">
            <div className="logo-symbol">
              C
            </div>

            <div className="logo-text">
              Cine<span>Now</span>
            </div>
          </div>

          <p className="nav-title">
            GENERAL
          </p>

          <nav>
            <button className="nav-item" onClick={() => cambiarPagina?.('peliculas')}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z"
                />
                <path d="M8 8h8M8 12h8M8 16h5" />
              </svg>

              Películas
            </button>

            {hasPermission('roles.ver') && (
              <button className="nav-item active" onClick={() => cambiarPagina?.('roles')}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>

                Roles y permisos

                <span className="nav-count">
                  {roles.length}
                </span>
              </button>
            )}

            <div className="nav-item muted">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="8" />
                <path d="m10 9 5 3-5 3V9Z" />
              </svg>

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
          <div className="backend-status">
            <span></span>

            <div>
              <strong>Backend conectado</strong>
              <small>Laravel API · :8000</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <div className="breadcrumb">
              CineNow
              <span>/</span>
              Roles y Permisos
            </div>

            <h1>Roles y Permisos</h1>

            <p>
              Gestiona el control de acceso de los usuarios del sistema.
            </p>
          </div>

          <div className="stack">
            <span>React</span>
            <span>Laravel</span>
            <span>Spatie</span>
          </div>
        </header>

        <section className="stats">
          <article className="stat-card">
            <div className="stat-header">
              <span>Total de roles</span>

              <div className="stat-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
            </div>

            <strong>{roles.length}</strong>

            <small>
              Registrados en sistema
            </small>
          </article>

          <article className="stat-card">
            <div className="stat-header">
              <span>Total de permisos</span>

              <div className="stat-icon green">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
            </div>

            <strong>{permisos.length}</strong>

            <small>
              Disponibles para asignar
            </small>
          </article>

          <article className="stat-card">
            <div className="stat-header">
              <span>Estado API Roles</span>

              <div className="stat-icon green">
                <svg viewBox="0 0 24 24">
                  <path d="M8 12h8M12 8v8" />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                </svg>
              </div>
            </div>

            <strong className="api-online">
              Online
            </strong>

            <small>
              /api/roles
            </small>
          </article>
        </section>

        <div className="workspace">
          {hasPermission('roles.crear') && (
            <section className="panel form-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">
                  {editandoId ? 'EDITAR REGISTRO' : 'NUEVO REGISTRO'}
                </span>

                <h2>{editandoId ? 'Editar Rol' : 'Crear Rol'}</h2>
              </div>

              <span className="panel-id">
                01
              </span>
            </div>

            <p className="panel-description">
              Asigna un nombre al rol y selecciona los permisos que tendrá disponibles.
            </p>

            {errorGeneral && (
              <div className="alert">
                <div className="alert-icon">
                  !
                </div>

                <div>
                  <strong>
                    Revisa la información
                  </strong>

                  <p>
                    {errorGeneral}
                  </p>
                </div>
              </div>
            )}

            <form
              className="form"
              onSubmit={guardar}
            >
              <div className="field">
                <label>Nombre del Rol</label>

                <input
                  name="name"
                  value={form.name}
                  onChange={cambiarCampo}
                  placeholder="Ej. Moderador"
                />

                {errores.name && (
                  <small>
                    {errores.name[0]}
                  </small>
                )}
              </div>

              <div className="field" style={{ marginTop: '20px' }}>
                <label>Permisos Asignados</label>
                <div className="permissions-grid" style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
                  {permisos.map((permiso) => (
                    <label key={permiso.id} className="switch-field" style={{ padding: '10px', background: 'var(--surface-color)', borderRadius: '8px' }}>
                      <div>
                        <strong>{permiso.name}</strong>
                      </div>
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permiso.name}
                        checked={form.permissions.includes(permiso.name)}
                        onChange={cambiarCampo}
                      />
                      <span className="switch">
                        <i></i>
                      </span>
                    </label>
                  ))}
                </div>
                {errores.permissions && (
                  <small>
                    {errores.permissions[0]}
                  </small>
                )}
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
                <button
                  className="submit"
                  type="submit"
                  disabled={guardando}
                  style={{ flex: 1, marginTop: 0 }}
                >
                  {guardando ? (
                    <>
                      <span className="spinner"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      {editandoId ? 'Actualizar rol' : 'Registrar rol'}
                      <span>→</span>
                    </>
                  )}
                </button>

                {editandoId && (
                  <button
                    type="button"
                    onClick={cancelarEdicion}
                    style={{ padding: '0 20px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </section>
          )}

          <section className="panel movies-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">
                  BASE DE DATOS
                </span>

                <h2>Listado de Roles</h2>
              </div>

              <span className="panel-id">
                02
              </span>
            </div>

            <div className="catalog-toolbar">
              <p>
                Información recibida desde
                <code> GET /api/roles</code>
              </p>

              <span>
                {roles.length}
                {' '}
                registros
              </span>
            </div>

            {cargando ? (
              <div className="state">
                <span className="loader"></span>

                <strong>
                  Cargando roles
                </strong>

                <p>
                  Consultando Laravel...
                </p>
              </div>
            ) : roles.length === 0 ? (
              <div className="state">
                <strong>
                  Sin registros
                </strong>

                <p>
                  Agrega un rol desde
                  el formulario.
                </p>
              </div>
            ) : (
              <div className="movie-list">
                {roles.map((rol) => (
                  <article
                    className="movie"
                    key={rol.id}
                  >
                    <div className="movie-number">
                      {String(
                        rol.id
                      ).padStart(2, '0')}
                    </div>

                    <div className="movie-body">
                      <div className="movie-top">
                        <div>
                          <h3>
                            {rol.name}
                          </h3>
                        </div>

                        <span className="status active">
                          <i></i>
                          Activo
                        </span>
                      </div>

                      <p className="synopsis" style={{ marginTop: '15px' }}>
                        <strong>Permisos ({rol.permissions?.length || 0}):</strong><br/>
                        {rol.permissions?.map(p => p.name).join(', ') || 'Sin permisos asignados.'}
                      </p>

                      <div className="movie-actions" style={{ display: 'flex', gap: '10px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <button onClick={() => editarRol(rol)} style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', flex: 1 }}>
                          Editar
                        </button>
                        <button onClick={() => borrarRol(rol.id)} style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', flex: 1 }}>
                          Eliminar
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
