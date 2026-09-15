<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AccessApprovalTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_waits_for_admin_role_assignment(): void
    {
        $this->seed(DatabaseSeeder::class);
        $this->seed(DatabaseSeeder::class);
        $admin = $this->postJson('/api/login', ['login' => 'david', 'password' => '12345'])
            ->assertOk()->assertJsonPath('roles.0', 'Administrador')->json();
        foreach (['peliculas.ver', 'peliculas.crear', 'peliculas.editar', 'peliculas.eliminar'] as $permission) {
            $this->assertContains($permission, $admin['permissions']);
        }
        $account = $this->postJson('/api/register', [
            'name' => 'Pending', 'username' => 'pending',
            'email' => 'pending@example.test', 'password' => '12345',
            'roles' => ['Administrador'],
        ])->assertCreated()->assertJsonPath('permissions', [])->assertJsonPath('roles', [])->json();
        $this->assertDatabaseHas('users', ['username' => 'pending']);
        $pendingHeaders = ['Authorization' => 'Bearer '.$account['token']];
        $this->getJson('/api/peliculas', $pendingHeaders)->assertForbidden();
        $this->getJson('/api/users', $pendingHeaders)->assertForbidden();
        $this->app['auth']->forgetGuards();
        $this->putJson('/api/users/'.$account['user']['id'].'/roles', ['roles' => ['Consulta']],
            ['Authorization' => 'Bearer '.$admin['token']])->assertOk();
        $this->app['auth']->forgetGuards();
        $this->getJson('/api/me', $pendingHeaders)->assertOk()->assertJsonPath('permissions.0', 'peliculas.ver');
        $this->getJson('/api/peliculas', $pendingHeaders)->assertOk();
        $this->postJson('/api/peliculas', [], $pendingHeaders)->assertForbidden();
        $this->app['auth']->forgetGuards();
        $adminHeaders = ['Authorization' => 'Bearer '.$admin['token']];
        $movie = ['titulo' => 'Prueba', 'genero' => 'Drama', 'duracion' => 90,
            'clasificacion' => 'PG', 'activo' => true];
        $id = $this->postJson('/api/peliculas', $movie, $adminHeaders)->assertCreated()->json('id');
        $movie['titulo'] = 'Editada';
        $this->putJson('/api/peliculas/'.$id, $movie, $adminHeaders)->assertOk()->assertJsonPath('titulo', 'Editada');
        $this->deleteJson('/api/peliculas/'.$id, [], $adminHeaders)->assertNoContent();
    }
}
