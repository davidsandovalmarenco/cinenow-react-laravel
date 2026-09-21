<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Genero;
use App\Models\Pelicula;
use Illuminate\Http\Request;

class PeliculaController extends Controller
{
    /**
     * Display a listing of the resource with eager loading.
     */
    public function index()
    {
        return response()->json(
            Pelicula::with('genero')->orderByDesc('id')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $datos = $request->validate([
            'titulo' => ['required', 'string', 'max:150'],
            'sinopsis' => ['nullable', 'string'],
            'genero' => ['required', 'string', 'max:80'],
            'duracion' => ['required', 'integer', 'min:1'],
            'clasificacion' => ['required', 'string', 'max:30'],
            'activo' => ['required', 'boolean'],
        ]);

        $generoObj = Genero::firstOrCreate(['nombre' => $datos['genero']]);

        unset($datos['genero']);
        $datos['genero_id'] = $generoObj->id;

        $pelicula = Pelicula::create($datos);
        $pelicula->load('genero');

        return response()->json($pelicula, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelicula $pelicula)
    {
        return response()->json($pelicula->load('genero'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pelicula $pelicula)
    {
        $datos = $request->validate([
            'titulo' => ['required', 'string', 'max:150'],
            'sinopsis' => ['nullable', 'string'],
            'genero' => ['required', 'string', 'max:80'],
            'duracion' => ['required', 'integer', 'min:1'],
            'clasificacion' => ['required', 'string', 'max:30'],
            'activo' => ['required', 'boolean'],
        ]);

        $generoObj = Genero::firstOrCreate(['nombre' => $datos['genero']]);

        unset($datos['genero']);
        $datos['genero_id'] = $generoObj->id;

        $pelicula->update($datos);
        $pelicula->load('genero');

        return response()->json($pelicula);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pelicula $pelicula)
    {
        $pelicula->delete();

        return response()->json(null, 204);
    }
}
