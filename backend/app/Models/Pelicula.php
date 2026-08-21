<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pelicula extends Model
{
    protected $fillable = [
        'titulo',
        'sinopsis',
        'genero',
        'duracion',
        'clasificacion',
        'activo',
    ];
}
