const API_URL = 'http://127.0.0.1:8000/api';

async function procesarRespuesta(respuesta) {
  const datos = respuesta.status === 204 ? null : await respuesta.json();

  if (!respuesta.ok) {
    const error = new Error(datos?.message || 'Error en la solicitud');
    error.validation = datos?.errors || {};
    error.status = respuesta.status;
    throw error;
  }

  return datos;
}

export function getAuthToken() {
  return localStorage.getItem('auth_token');
}

export function getAuthHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(credenciales) {
  const respuesta = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credenciales),
  });

  const data = await procesarRespuesta(respuesta);
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  return data;
}

export async function register(datos) {
  const respuesta = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  const data = await procesarRespuesta(respuesta);
  if (data.token) {
    localStorage.setItem('auth_token', data.token);
  }
  return data;
}

export async function logout() {
  const respuesta = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  localStorage.removeItem('auth_token');
  return procesarRespuesta(respuesta);
}

export async function getCurrentUser() {
  if (!getAuthToken()) {
    throw new Error('No token found');
  }

  const respuesta = await fetch(`${API_URL}/me`, {
    headers: {
      Accept: 'application/json',
      ...getAuthHeaders(),
    },
  });

  return procesarRespuesta(respuesta);
}
