<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DavidAdminSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::firstOrCreate(
            ['username' => 'david'],
            ['name' => 'David', 'email' => 'david@cinenow.test', 'password' => '12345'],
        );
        $user->assignRole('Administrador');
    }
}
