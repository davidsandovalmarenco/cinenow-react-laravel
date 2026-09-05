<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::with('roles')->get());
    }

    public function assignRoles(Request $request, User $user)
    {
        $request->validate([
            'roles' => 'array'
        ]);

        $user->syncRoles($request->roles);

        return response()->json($user->load('roles'));
    }
}
