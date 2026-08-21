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

    throw error;
  }

  return datos;
}

export async function listarPeliculas() {
  const respuesta = await fetch(API_URL, {
    headers: {
      Accept: 'application/json',
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
    },
    body: JSON.stringify(pelicula),
  });

  return procesarRespuesta(respuesta);
}