# 🎬 CineNow

Sistema web de gestión cinematográfica desarrollado como proyecto Full Stack con **React**, **Laravel** y **MySQL**.

CineNow implementa un primer módulo funcional para la gestión de películas, conectando el frontend con una API REST desarrollada en Laravel y almacenando la información de forma persistente en MySQL.

---

## ✨ Características

Actualmente el proyecto incluye el módulo **Películas**.

- 🎞️ Registro de películas
- 📋 Listado de películas almacenadas
- 🔄 Comunicación React → Laravel mediante Fetch API
- 🗄️ Persistencia de datos en MySQL
- ✅ Validación de datos desde Laravel
- ⚠️ Manejo de errores HTTP y validaciones
- ⏳ Estados de carga y procesamiento
- 🌐 API REST
- 🎨 Interfaz responsive estilo dashboard

La API también dispone de operaciones CRUD para futuras ampliaciones del frontend.

---

## 🧱 Arquitectura

```text
React
  │
  │ HTTP / JSON
  ▼
Laravel REST API
  │
  ▼
PeliculaController
  │
  ▼
Eloquent ORM
  │
  ▼
MySQL
```

Cuando se registra una película desde React, los datos son enviados en formato JSON a Laravel.  
El backend valida la información, utiliza Eloquent ORM para almacenarla en MySQL y devuelve una respuesta JSON al frontend.

---

## 🛠️ Tecnologías

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Laravel
- PHP
- Eloquent ORM
- REST API
- Laravel Sanctum instalado para soporte API

### Base de datos

- MySQL / MariaDB

### Herramientas utilizadas

- Laragon
- Composer
- Node.js / npm
- phpMyAdmin
- Postman
- Git
- GitHub
- Visual Studio Code

---

## 📂 Estructura del proyecto

```text
cinenow-react-laravel/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           └── PeliculaController.php
│   │   │
│   │   └── Models/
│   │       └── Pelicula.php
│   │
│   ├── database/
│   │   └── migrations/
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   ├── .env.example
│   └── artisan
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Peliculas.jsx
│   │   │   └── Peliculas.css
│   │   │
│   │   ├── services/
│   │   │   └── peliculasApi.js
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# 🚀 Instalación después de clonar

Estas instrucciones permiten reconstruir el proyecto en un equipo nuevo.

## 1. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
```

Entrar al proyecto:

```bash
cd cinenow-react-laravel
```

---

# ⚙️ Backend — Laravel

## 2. Entrar al backend

```bash
cd backend
```

## 3. Instalar dependencias PHP

```bash
composer install
```

Composer utilizará el archivo `composer.lock` para instalar las dependencias del proyecto.

---

## 4. Crear el archivo `.env`

En Windows:

```powershell
copy .env.example .env
```

En Linux/macOS:

```bash
cp .env.example .env
```

---

## 5. Generar la clave de Laravel

```bash
php artisan key:generate
```

Resultado esperado:

```text
INFO  Application key set successfully.
```

---

# 🗄️ Base de datos

## 6. Crear la base de datos

Iniciar **MySQL** desde Laragon, XAMPP o el entorno correspondiente.

Crear una base de datos llamada:

```text
cinenow
```

Puede hacerse desde phpMyAdmin.

---

## 7. Configurar MySQL en `.env`

Editar:

```text
backend/.env
```

y configurar:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cinenow
DB_USERNAME=root
DB_PASSWORD=
```

> Si MySQL utiliza otra contraseña, usuario o puerto, deben colocarse los valores correspondientes.

---

## 8. Limpiar la configuración de Laravel

```bash
php artisan config:clear
```

---

## 9. Crear las tablas

```bash
php artisan migrate
```

Esto creará las tablas necesarias, incluyendo:

```text
peliculas
users
cache
jobs
migrations
personal_access_tokens
```

La tabla principal de CineNow es:

```text
peliculas
```

---

# ▶️ Ejecutar Laravel

Desde:

```text
cinenow-react-laravel/backend
```

ejecutar:

```bash
php artisan serve
```

Laravel estará disponible normalmente en:

```text
http://127.0.0.1:8000
```

No cerrar esta terminal mientras se utiliza la aplicación.

---

# ⚛️ Frontend — React

Abrir una **segunda terminal**.

## 10. Entrar al frontend

```bash
cd frontend
```

Si estás ubicado en `backend`:

```bash
cd ../frontend
```

---

## 11. Instalar dependencias

```bash
npm install
```

---

## 12. Ejecutar Vite

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

# ✅ Comprobación

Debe haber dos servidores ejecutándose simultáneamente:

```text
Laravel API
http://127.0.0.1:8000

React + Vite
http://localhost:5173
```

---

# 🌐 API REST

Endpoint principal:

```text
/api/peliculas
```

URL completa en desarrollo:

```text
http://127.0.0.1:8000/api/peliculas
```

## Rutas disponibles

| Método | Endpoint | Acción |
|---|---|---|
| GET | `/api/peliculas` | Listar películas |
| POST | `/api/peliculas` | Registrar película |
| GET | `/api/peliculas/{pelicula}` | Consultar película |
| PUT / PATCH | `/api/peliculas/{pelicula}` | Actualizar película |
| DELETE | `/api/peliculas/{pelicula}` | Eliminar película |

Las rutas pueden comprobarse ejecutando:

```bash
php artisan route:list --path=api
```

---

# 🎞️ Entidad Película

La tabla `peliculas` contiene los siguientes campos principales:

| Campo | Tipo | Descripción |
|---|---|---|
| `titulo` | string | Nombre de la película |
| `sinopsis` | text | Descripción de la película |
| `genero` | string | Género cinematográfico |
| `duracion` | integer | Duración en minutos |
| `clasificacion` | string | Clasificación de edad |
| `activo` | boolean | Estado de disponibilidad |

Laravel también administra automáticamente:

```text
id
created_at
updated_at
```

---

# 🧪 Probar la API

## GET

Abrir:

```text
http://127.0.0.1:8000/api/peliculas
```

Laravel devolverá los registros en formato JSON.

---

## POST con Postman

Método:

```text
POST
```

Endpoint:

```text
http://127.0.0.1:8000/api/peliculas
```

Headers:

```text
Accept: application/json
Content-Type: application/json
```

Ejemplo de Body JSON:

```json
{
  "titulo": "Interstellar",
  "sinopsis": "Un grupo de exploradores viaja a través del espacio en busca de un nuevo hogar para la humanidad.",
  "genero": "Ciencia ficción",
  "duracion": 169,
  "clasificacion": "PG-13",
  "activo": true
}
```

Si el registro es válido, Laravel responde con:

```text
201 Created
```

---

# 🔒 Validación

La validación se realiza en el backend mediante Laravel.

Por ejemplo:

```php
'titulo' => ['required', 'string', 'max:150'],
'genero' => ['required', 'string', 'max:80'],
'duracion' => ['required', 'integer', 'min:1'],
'clasificacion' => ['required', 'string', 'max:30'],
'activo' => ['required', 'boolean'],
```

Si Laravel recibe información inválida, responde normalmente con:

```text
422 Unprocessable Content
```

React procesa esta respuesta y muestra los errores correspondientes al usuario.

---

# 🔄 Flujo de datos

Cuando el usuario registra una película:

```text
1. Usuario completa el formulario
               ↓
2. React almacena los valores en el estado
               ↓
3. Fetch envía un POST con JSON
               ↓
4. Laravel recibe /api/peliculas
               ↓
5. PeliculaController valida la información
               ↓
6. Modelo Pelicula utiliza Eloquent
               ↓
7. MySQL almacena el registro
               ↓
8. Laravel devuelve JSON
               ↓
9. React vuelve a consultar la API
               ↓
10. El catálogo se actualiza
```

---

# 📌 Estado actual

Actualmente CineNow cuenta con su **primer módulo funcional: Películas**.

El objetivo del proyecto en esta etapa no es desarrollar un sistema completo de cine, sino demostrar correctamente la integración:

```text
React ↔ Laravel ↔ MySQL
```

Futuras versiones podrían incorporar nuevos módulos como funciones, salas, reservas o boletos.

---

## 👨‍💻 Autor

**David Sandoval Marenco**

Proyecto académico desarrollado para:

**Electiva PPF II**

---

## 📄 Licencia

Proyecto desarrollado con fines educativos.