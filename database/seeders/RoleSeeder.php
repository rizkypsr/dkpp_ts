<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /** Run the database seeds. */
    public function run(): void
    {
        $user = User::factory()->create([
            'nip' => '000000000000000000',
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => bcrypt('password'),
        ]);

        Role::create(['name' => 'Super Admin']);

        $user->assignRole('Super Admin');
    }
}
