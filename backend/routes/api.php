<?php

use App\Http\Controllers\Api\PeliculaController;
use Illuminate\Support\Facades\Route;

Route::apiResource('peliculas', PeliculaController::class);