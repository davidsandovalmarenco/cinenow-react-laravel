const API_URL_ROLES = 'http://127.0.0.1:8000/api/roles';
const API_URL_PERMISSIONS = 'http://127.0.0.1:8000/api/permissions';

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

export async function listarRoles() {
  const respuesta = await fetch(API_URL_ROLES, {
    headers: {
      Accept: 'application/json',
    },
  });

  return procesarRespuesta(respuesta);
}

export async function crearRol(rol) {
  const respuesta = await fetch(API_URL_ROLES, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rol),
  });

  return procesarRespuesta(respuesta);
}

export async function actualizarRol(id, rol) {
  const respuesta = await fetch(`${API_URL_ROLES}/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rol),
  });

  return procesarRespuesta(respuesta);
}

export async function eliminarRol(id) {
  const respuesta = await fetch(`${API_URL_ROLES}/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
    },
  });

  return procesarRespuesta(respuesta);
}

export async function listarPermisos() {
  const respuesta = await fetch(API_URL_PERMISSIONS, {
    headers: {
      Accept: 'application/json',
    },
  });

  return procesarRespuesta(respuesta);
}

export async function crearPermiso(permiso) {
  const respuesta = await fetch(API_URL_PERMISSIONS, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(permiso),
  });

  return procesarRespuesta(respuesta);
}
