import { useEffect, useState } from 'react';
import {
  crearPelicula,
  listarPeliculas,
} from '../services/peliculasApi';

import './Peliculas.css';

const formularioInicial = {
  titulo: '',
  sinopsis: '',
  genero: '',
  duracion: '',
  clasificacion: '',
  activo: true,
};

export default function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [form, setForm] = useState(formularioInicial);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState('');
  const [errores, setErrores] = useState({});

  async function cargar() {
    try {
      setCargando(true);
      setErrorGeneral('');

      const datos = await listarPeliculas();
      setPeliculas(datos);
    } catch (error) {
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
      await crearPelicula({
        ...form,
        duracion: Number(form.duracion),
      });

      setForm(formularioInicial);
      await cargar();
    } catch (error) {
      setErrorGeneral(error.message);
      setErrores(error.validation || {});
    } finally {
      setGuardando(false);
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
            <button className="nav-item active">
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
          <section className="panel form-panel">
            <div className="panel-header">
              <div>
                <span className="section-label">
                  NUEVO REGISTRO
                </span>

                <h2>Agregar película</h2>
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

              <button
                className="submit"
                type="submit"
                disabled={guardando}
              >
                {guardando ? (
                  <>
                    <span className="spinner"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    Registrar película
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </section>

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