<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Genero extends Model
{
    protected $fillable = [
        'nombre',
    ];

    /**
     * Relationship: Genero has many Peliculas.
     */
    public function peliculas(): HasMany
    {
        return $this->hasMany(Pelicula::class);
    }
}
