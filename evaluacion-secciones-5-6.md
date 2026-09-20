# Entregable final de las Secciones 5 y 6

## Objetivo
Demostrar que el módulo trabajado quedó organizado, conectado de extremo a extremo y funcionando con React + Laravel.

## Requisitos que debe cumplir el proyecto

- Estructura de carpetas clara en src/
- Dashboard con sidebar, header y contenido principal
- Rutas públicas, privadas, dinámicas y manejo de 404
- Menú activo según la ruta actual
- Permisos aplicados a navegación y acciones
- CRUD organizado en página y lógica del módulo
- Formulario controlado con React
- Servicios HTTP reutilizables para Laravel
- Validación del backend con respuesta 422
- Listado con estados de carga, vacío y error
- Crear, editar y eliminar funcionando correctamente
- Variables de entorno para la URL de la API
- Pruebas del flujo: 401, 403, 404, 422 y caso exitoso

## Explicación breve del trabajo realizado

La aplicación está organizada como una SPA, donde la navegación se gestiona con rutas y la sesión y los permisos se manejan desde el contexto de autenticación. La app distingue entre rutas públicas y privadas, y según el usuario autenticado muestra o oculta opciones del sistema. El módulo principal se conecta con Laravel mediante servicios HTTP reutilizables, lo que permite crear, listar, editar y eliminar registros desde la interfaz.

La validación de datos se realiza también en el backend, y cuando hay un error de validación la API responde con un 422, mostrando los errores en el formulario. Además, el frontend maneja estados de carga, listado vacío y errores para mejorar la experiencia del usuario.

## Capturas que deberías sacar

### 1. Login o acceso público
Abre la app y toma una captura de la pantalla de login o registro.

Qué mostrar: la pantalla inicial antes de iniciar sesión.

### 2. Módulo principal funcionando
Inicia sesión y entra a la vista de películas o roles.

Qué mostrar: el sidebar, el header y la lista principal cargada.

### 3. Ruta privada con sesión activa
En la aplicación ya autenticada, navega dentro del panel.

Qué mostrar: la URL activa del módulo (por ejemplo /peliculas) y el contenido correspondiente.

### 4. Permisos o acceso restringido
Prueba un usuario sin permisos o intenta entrar a una acción no autorizada.

Qué mostrar: la pantalla de aprobación pendiente o el mensaje de “No tienes permiso”.

### 5. Formulario de creación o edición
Abre el formulario de crear o editar un registro.

Qué mostrar: los inputs completos y el botón de guardar.

### 6. Error de validación 422
Intenta guardar un formulario incompleto o con datos inválidos.

Qué mostrar: los errores por campo que devuelve Laravel, por ejemplo el mensaje de validación.

### 7. Ruta 404 o navegación no reconocida
Escribe una URL que no exista o navega a una ruta inválida.

Qué mostrar: la redirección o la vista por defecto de error/404.

## Cómo sacarlas realmente

- Abre la app en navegador.
- Haz una captura de pantalla completa o del área relevante.
- No es necesario sacar muchas; con 4 o 5 capturas es suficiente.
- Las mejores son: login, módulo principal, permisos, formulario y error de validación.

## Resumen de la evidencia

La idea es demostrar que:

- la app inicia correctamente,
- el usuario puede navegar entre módulos,
- el acceso está protegido,
- el CRUD funciona,
- y Laravel valida la información.

## Como presentación final

En la defensa puedes explicar que:

- el frontend está organizado por responsabilidades,
- la navegación se gestiona con rutas,
- los permisos controlan la interfaz y las acciones,
- Laravel valida los datos,
- y el módulo funciona de extremo a extremo con React y API REST.

## Explicación adicional para incluir debajo de las capturas

La evidencia visual debe acompañarse de una explicación breve de lo que se está mostrando. Por ejemplo:

- La primera captura demuestra la pantalla de login, donde el usuario puede iniciar sesión o registrarse. Esto representa la ruta pública de la aplicación.
- La segunda captura muestra el módulo principal con el panel, el sidebar y la lista de registros cargados desde Laravel. Esto evidencia que la navegación por rutas y el consumo del backend funcionan correctamente.
- La tercera captura muestra la vista autenticada y el acceso al módulo privado. Aquí se comprueba que la sesión del usuario está activa y que la app reconoce el rol y permisos del usuario.
- La cuarta captura muestra la restricción por permisos, donde un usuario sin acceso no puede realizar la acción. Esto valida la parte de autorización de frontend y backend.
- La quinta captura corresponde al formulario de creación o edición. Se observa que el formulario es controlado, ya que cada campo mantiene su valor en React y se envía al backend.
- La sexta captura corresponde a un caso de validación 422, donde Laravel rechaza la información por no cumplir las reglas. Esto demuestra que la validación está en el servidor y que el cliente maneja bien esos errores.
- La última captura corresponde a una ruta no válida o 404. Esto muestra que la navegación está controlada y que la app responde adecuadamente ante URLs inexistentes.

En conjunto, estas capturas demuestran que la aplicación realiza la integración completa entre React y Laravel: navegación, permisos, validación, CRUD y manejo de errores.

## Observación importante

La parte visual puede mejorarse más adelante, pero la evaluación principal se centra en la organización, navegación, permisos, conexión con Laravel y CRUD funcional.
