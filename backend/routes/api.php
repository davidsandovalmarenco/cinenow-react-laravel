<?php

use App\Http\Controllers\Api\PeliculaController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    Route::apiResource('peliculas', PeliculaController::class)->only(['index', 'show'])->middleware('permission:peliculas.ver');
    Route::apiResource('peliculas', PeliculaController::class)->only(['store'])->middleware('permission:peliculas.crear');
    Route::apiResource('peliculas', PeliculaController::class)->only(['update'])->middleware('permission:peliculas.editar');
    Route::apiResource('peliculas', PeliculaController::class)->only(['destroy'])->middleware('permission:peliculas.eliminar');

    Route::apiResource('roles', RoleController::class)->middleware('role:Administrador');
    Route::apiResource('permissions', PermissionController::class)->only(['index', 'store'])->middleware('role:Administrador');
});