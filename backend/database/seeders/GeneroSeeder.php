<?php

namespace Database\Seeders;

use App\Models\Genero;
use Illuminate\Database\Seeder;

class GeneroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generos = [
            'Acción',
            'Comedia',
            'Drama',
            'Terror',
            'Ciencia Ficción',
        ];

        foreach ($generos as $nombre) {
            Genero::firstOrCreate(['nombre' => $nombre]);
        }
    }
}
