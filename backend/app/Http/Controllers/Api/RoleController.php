<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        // Retornamos todos los roles junto con sus permisos asignados
        return response()->json(Role::with('permissions')->get());
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'name' => ['required', 'string', 'unique:roles,name', 'max:255'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name']
        ]);

        $role = Role::create(['name' => $datos['name']]);

        // Si se envían permisos en la petición, los asignamos
        if (!empty($datos['permissions'])) {
            $role->syncPermissions($datos['permissions']);
        }

        $role->load('permissions');

        return response()->json($role, 201);
    }

    public function show(Role $role)
    {
        $role->load('permissions');
        return response()->json($role);
    }

    public function update(Request $request, Role $role)
    {
        $datos = $request->validate([
            'name' => ['required', 'string', 'unique:roles,name,' . $role->id, 'max:255'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,name']
        ]);

        $role->update(['name' => $datos['name']]);

        // Sincronizamos permisos solo si la llave está presente en el request
        if (array_key_exists('permissions', $datos)) {
            $role->syncPermissions($datos['permissions']);
        }

        $role->load('permissions');

        return response()->json($role);
    }

    public function destroy(Role $role)
    {
        $role->delete();
        return response()->json(null, 204);
    }
}
