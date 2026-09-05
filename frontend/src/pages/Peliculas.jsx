import { useEffect, useState } from 'react';
import {
  crearPelicula,
  listarPeliculas,
  actualizarPelicula,
  eliminarPelicula,
} from '../services/peliculasApi';
import { useAuth } from '../context/AuthContext';

import './Peliculas.css';

const formularioInicial = {
  titulo: '',
  sinopsis: '',
  genero: '',
  duracion: '',
  clasificacion: '',
  activo: true,
};

export default function Peliculas({ cambiarPagina }) {
  const { user, roles, logout, hasPermission } = useAuth();
  const [peliculas, setPeliculas] = useState([]);
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

      const datos = await listarPeliculas();
      setPeliculas(datos);
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

    setForm((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function guardar(e) {
    e.preventDefault();

    setGuardando(true);
    setErrorGeneral('');
    setErrores({});

    try {
      const datosPelicula = {
        ...form,
        duracion: Number(form.duracion),
      };

      if (editandoId) {
        await actualizarPelicula(editandoId, datosPelicula);
      } else {
        await crearPelicula(datosPelicula);
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

  function editarPelicula(pelicula) {
    setForm({
      titulo: pelicula.titulo,
      sinopsis: pelicula.sinopsis || '',
      genero: pelicula.genero,
      duracion: pelicula.duracion,
      clasificacion: pelicula.clasificacion,
      activo: pelicula.activo,
    });
    setEditandoId(pelicula.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setForm(formularioInicial);
    setEditandoId(null);
    setErrorGeneral('');
    setErrores({});
  }

  async function borrarPelicula(id) {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta película?')) return;
    
    try {
      await eliminarPelicula(id);
      await cargar();
    } catch (error) {
      if (error.status === 401) logout();
      else if (error.status === 403) alert('No tienes permiso para eliminar.');
      else alert('Error al eliminar: ' + error.message);
    }
  }

  const activas = peliculas.filter(
    (pelicula) => pelicula.activo
  ).length;

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
            <button className="nav-item active" onClick={() => cambiarPagina?.('peliculas')}>
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

              <span className="nav-count">
                {peliculas.length}
              </span>
            </button>

            {hasPermission('roles.ver') && (
              <button className="nav-item" onClick={() => cambiarPagina?.('roles')}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>

                Roles y permisos
              </button>
            )}

            {roles.includes('Administrador') && (
              <button className="nav-item" onClick={() => cambiarPagina?.('usuarios')}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Usuarios
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
            <small style={{ color: 'var(--text-muted)' }}>{roles.join(', ')}</small>
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
              Películas
            </div>

            <h1>Películas</h1>

            <p>
              Gestiona el catálogo registrado en la
              base de datos.
            </p>
          </div>

          <div className="stack">
            <span>React</span>
            <span>Laravel</span>
            <span>MySQL</span>
          </div>
        </header>

        <section className="stats">
          <article className="stat-card">
            <div className="stat-header">
              <span>Total de películas</span>

              <div className="stat-icon">
                <svg viewBox="0 0 24 24">
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="14"
                    rx="2"
                  />
                  <path d="M8 5v14M16 5v14M4 9h4M16 9h4M4 15h4M16 15h4" />
                </svg>
              </div>
            </div>

            <strong>{peliculas.length}</strong>

            <small>
              Registros almacenados
            </small>
          </article>

          <article className="stat-card">
            <div className="stat-header">
              <span>Películas activas</span>

              <div className="stat-icon green">
                <svg viewBox="0 0 24 24">
                  <path d="m7 12 3 3 7-7" />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                </svg>
              </div>
            </div>

            <strong>{activas}</strong>

            <small>
              Disponibles actualmente
            </small>
          </article>

          <article className="stat-card">
            <div className="stat-header">
              <span>Estado API</span>

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
              /api/peliculas
            </small>
          </article>
        </section>

        <div className="workspace">
          {hasPermission('peliculas.crear') && (
            <section className="panel form-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">
                  {editandoId ? 'EDITAR REGISTRO' : 'NUEVO REGISTRO'}
                </span>

                <h2>{editandoId ? 'Editar película' : 'Agregar película'}</h2>
              </div>

              <span className="panel-id">
                01
              </span>
            </div>

            <p className="panel-description">
              Los datos serán validados por Laravel
              antes de almacenarse en MySQL.
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
                <label>Título</label>

                <input
                  name="titulo"
                  value={form.titulo}
                  onChange={cambiarCampo}
                  placeholder="Ej. Interstellar"
                />

                {errores.titulo && (
                  <small>
                    {errores.titulo[0]}
                  </small>
                )}
              </div>

              <div className="field">
                <label>Sinopsis</label>

                <textarea
                  name="sinopsis"
                  value={form.sinopsis}
                  onChange={cambiarCampo}
                  placeholder="Breve descripción de la película..."
                />
              </div>

              <div className="field-grid">
                <div className="field">
                  <label>Género</label>

                  <input
                    name="genero"
                    value={form.genero}
                    onChange={cambiarCampo}
                    placeholder="Acción"
                  />

                  {errores.genero && (
                    <small>
                      {errores.genero[0]}
                    </small>
                  )}
                </div>

                <div className="field">
                  <label>Duración</label>

                  <div className="duration">
                    <input
                      type="number"
                      name="duracion"
                      value={form.duracion}
                      onChange={cambiarCampo}
                      placeholder="120"
                    />

                    <span>min</span>
                  </div>

                  {errores.duracion && (
                    <small>
                      {errores.duracion[0]}
                    </small>
                  )}
                </div>
              </div>

              <div className="field">
                <label>Clasificación</label>

                <input
                  name="clasificacion"
                  value={form.clasificacion}
                  onChange={cambiarCampo}
                  placeholder="PG-13"
                />

                {errores.clasificacion && (
                  <small>
                    {errores.clasificacion[0]}
                  </small>
                )}
              </div>

              <label className="switch-field">
                <div>
                  <strong>
                    Película activa
                  </strong>

                  <span>
                    Disponible en el catálogo
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="activo"
                  checked={form.activo}
                  onChange={cambiarCampo}
                />

                <span className="switch">
                  <i></i>
                </span>
              </label>

              <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button
                  className="submit"
                  type="submit"
                  disabled={guardando}
                  style={{ flex: 1 }}
                >
                  {guardando ? (
                    <>
                      <span className="spinner"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      {editandoId ? 'Actualizar película' : 'Registrar película'}
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

                <h2>Catálogo</h2>
              </div>

              <span className="panel-id">
                02
              </span>
            </div>

            <div className="catalog-toolbar">
              <p>
                Información recibida desde
                <code> GET /api/peliculas</code>
              </p>

              <span>
                {peliculas.length}
                {' '}
                registros
              </span>
            </div>

            {cargando ? (
              <div className="state">
                <span className="loader"></span>

                <strong>
                  Cargando películas
                </strong>

                <p>
                  Consultando Laravel...
                </p>
              </div>
            ) : peliculas.length === 0 ? (
              <div className="state">
                <strong>
                  Sin registros
                </strong>

                <p>
                  Agrega una película desde
                  el formulario.
                </p>
              </div>
            ) : (
              <div className="movie-list">
                {peliculas.map((pelicula) => (
                  <article
                    className="movie"
                    key={pelicula.id}
                  >
                    <div className="movie-number">
                      {String(
                        pelicula.id
                      ).padStart(2, '0')}
                    </div>

                    <div className="movie-body">
                      <div className="movie-top">
                        <div>
                          <span className="genre">
                            {pelicula.genero}
                          </span>

                          <h3>
                            {pelicula.titulo}
                          </h3>
                        </div>

                        <span
                          className={
                            pelicula.activo
                              ? 'status active'
                              : 'status'
                          }
                        >
                          <i></i>

                          {pelicula.activo
                            ? 'Activa'
                            : 'Inactiva'}
                        </span>
                      </div>

                      <p className="synopsis">
                        {pelicula.sinopsis ||
                          'Sin sinopsis registrada.'}
                      </p>

                      <div className="metadata">
                        <div>
                          <span>Duración</span>

                          <strong>
                            {pelicula.duracion}
                            {' '}
                            min
                          </strong>
                        </div>

                        <div>
                          <span>
                            Clasificación
                          </span>

                          <strong>
                            {
                              pelicula.clasificacion
                            }
                          </strong>
                        </div>

                        <div>
                          <span>ID</span>

                          <strong>
                            #{pelicula.id}
                          </strong>
                        </div>
                      </div>

                      <div className="movie-actions" style={{ display: 'flex', gap: '10px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        {hasPermission('peliculas.editar') && (
                          <button onClick={() => editarPelicula(pelicula)} style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', flex: 1 }}>
                            Editar
                          </button>
                        )}
                        {hasPermission('peliculas.eliminar') && (
                          <button onClick={() => borrarPelicula(pelicula.id)} style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', border: '1px solid rgba(220, 38, 38, 0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', flex: 1 }}>
                            Eliminar
                          </button>
                        )}
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