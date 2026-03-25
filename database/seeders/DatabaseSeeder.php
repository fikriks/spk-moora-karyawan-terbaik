<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil seeder peran terlebih dahulu
        $this->call([
            RolesAndPermissionsSeeder::class,
            CriterionSeeder::class,
            AlternativeSeeder::class,
            NilaiSeeder::class,
        ]);

        // Daftar role dan nama tampilan
        $users = [
            ['role' => 'admin', 'name' => 'Administrator'],
            ['role' => 'operator', 'name' => 'Operator'],
            ['role' => 'penilai', 'name' => 'Penilai'],
            ['role' => 'kasubag_kepegawaian', 'name' => 'Kasubag Kepegawaian', 'email_prefix' => 'kasubag'],
            ['role' => 'ketua_pengadilan', 'name' => 'Ketua Pengadilan', 'email_prefix' => 'ketua'],
        ];

        foreach ($users as $userData) {
            $roleName = $userData['role'];
            $emailPrefix = $userData['email_prefix'] ?? $roleName;
            $password = ucfirst($emailPrefix) . '123';

            $user = User::firstOrCreate(
                ['email' => $emailPrefix . '@example.com'],
                [
                    'name' => $userData['name'],
                    'password' => bcrypt($password),
                ]
            );

            // Berikan role ke user
            $user->syncRoles([$roleName]);
        }
    }
}