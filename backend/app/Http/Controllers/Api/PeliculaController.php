<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pelicula;
use Illuminate\Http\Request;

class PeliculaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Pelicula::orderByDesc('id')->get()
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

        $pelicula = Pelicula::create($datos);

        return response()->json($pelicula, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pelicula $pelicula)
    {
        return response()->json($pelicula);
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

        $pelicula->update($datos);

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
