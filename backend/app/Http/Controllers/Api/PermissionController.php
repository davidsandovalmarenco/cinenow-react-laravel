<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        // Retornamos la lista de permisos disponibles
        return response()->json(Permission::all());
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'name' => ['required', 'string', 'unique:permissions,name', 'max:255'],
        ]);

        $permission = Permission::create(['name' => $datos['name']]);

        return response()->json($permission, 201);
    }
}
