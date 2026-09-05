<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar el caché de Spatie Permission antes de ejecutar para evitar problemas
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Crear Permisos (usando firstOrCreate para no duplicar si se ejecuta varias veces)
        $permisos = [
            'peliculas.ver',
            'peliculas.crear',
            'peliculas.editar',
            'peliculas.eliminar',
            'roles.ver',
            'roles.crear',
            'roles.editar',
            'roles.eliminar',
            'permisos.ver',
            'permisos.asignar',
        ];

        foreach ($permisos as $permiso) {
            Permission::firstOrCreate(['name' => $permiso]);
        }

        // 2. Crear Roles y Asignar Permisos

        // Rol: Administrador (todos los permisos)
        $adminRole = Role::firstOrCreate(['name' => 'Administrador']);
        $adminRole->syncPermissions(Permission::all());

        // Rol: Editor (puede ver, crear y editar películas)
        $editorRole = Role::firstOrCreate(['name' => 'Editor']);
        $editorRole->syncPermissions([
            'peliculas.ver',
            'peliculas.crear',
            'peliculas.editar',
        ]);

        // Rol: Consulta (solo puede ver películas)
        $consultaRole = Role::firstOrCreate(['name' => 'Consulta']);
        $consultaRole->syncPermissions([
            'peliculas.ver',
        ]);
    }
}
