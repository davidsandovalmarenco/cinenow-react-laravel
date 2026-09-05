<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@cinenow.test'],
            [
                'name' => 'Administrador CineNow',
                'username' => 'admin',
                'password' => Hash::make('password'),
            ]
        );
        if (!$admin->hasRole('Administrador')) {
            $admin->assignRole('Administrador');
        }

        $editor = User::firstOrCreate(
            ['email' => 'editor@cinenow.test'],
            [
                'name' => 'Editor CineNow',
                'username' => 'editor',
                'password' => Hash::make('password'),
            ]
        );
        if (!$editor->hasRole('Editor')) {
            $editor->assignRole('Editor');
        }

        $consulta = User::firstOrCreate(
            ['email' => 'consulta@cinenow.test'],
            [
                'name' => 'Consulta CineNow',
                'username' => 'consulta',
                'password' => Hash::make('password'),
            ]
        );
        if (!$consulta->hasRole('Consulta')) {
            $consulta->assignRole('Consulta');
        }

        $david = User::firstOrCreate(
            ['email' => 'david@cinenow.test'],
            [
                'name' => 'David',
                'username' => 'david',
                'password' => Hash::make('12345'),
            ]
        );
        if (!$david->hasRole('Administrador')) {
            $david->assignRole('Administrador');
        }
    }
}
