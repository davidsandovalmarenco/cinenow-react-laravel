<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pelicula extends Model
{
    protected $fillable = [
        'titulo',
        'sinopsis',
        'genero_id',
        'duracion',
        'clasificacion',
        'activo',
    ];

    /**
     * Relationship: Pelicula belongs to Genero.
     */
    public function genero(): BelongsTo
    {
        return $this->belongsTo(Genero::class);
    }
}
