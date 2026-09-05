<?php

use App\Http\Controllers\Api\PeliculaController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PermissionController;
use Illuminate\Support\Facades\Route;

Route::apiResource('peliculas', PeliculaController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class)->only(['index', 'store']);