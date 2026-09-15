# Restaurar roles y acceso

Después de importar un SQL antiguo, ejecutar desde `backend`:

```sh
php artisan migrate
php artisan db:seed
```

Esto añade las tablas pendientes sin borrar películas ni usuarios y crea los
roles Administrador, Editor y Consulta con sus permisos. También crea al
administrador local `david`, correo `david@cinenow.test`, contraseña inicial
`12345`. Si el usuario ya existe, conserva su contraseña.

Las cuentas registradas desde la aplicación no reciben permisos automáticamente.
David puede entrar en **Usuarios**, editar la cuenta y guardar un rol:

- Consulta: ver películas.
- Editor: ver, crear y editar películas.
- Administrador: todos los permisos y gestión de usuarios y roles.

La cuenta sin permisos ve una pantalla de espera. Después de asignarle un rol,
puede pulsar **Comprobar aprobación** para actualizar su acceso.

Para guardar una copia SQL actualizada, exportar la base de datos completa desde
phpMyAdmin, incluyendo `roles`, `permissions`, `role_has_permissions`,
`model_has_roles`, `model_has_permissions`, `users` y `migrations`.
