import { getAuthHeaders } from './authApi';

const API_URL = 'http://127.0.0.1:8000/api/peliculas';

async function procesarRespuesta(respuesta) {
  const datos =
    respuesta.status === 204
      ? null
      : await respuesta.json();

  if (!respuesta.ok) {
    const error = new Error(
      datos?.message || 'Error en la solicitud'
    );

    error.validation = datos?.errors || {};
    error.status = respuesta.status;

    throw error;
  }

  return datos;
}

export async function listarPeliculas() {
  const respuesta = await fetch(API_URL, {
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  return procesarRespuesta(respuesta);
}

export async function crearPelicula(pelicula) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(pelicula),
  });

  return procesarRespuesta(respuesta);
}

export async function actualizarPelicula(id, pelicula) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(pelicula),
  });

  return procesarRespuesta(respuesta);
}

export async function eliminarPelicula(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  return procesarRespuesta(respuesta);
}