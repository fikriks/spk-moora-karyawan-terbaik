<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // permissions (contoh)
        Permission::firstOrCreate(['name' => 'manage users']);
        Permission::firstOrCreate(['name' => 'approve alternatives']);
        Permission::firstOrCreate(['name' => 'manage criteria']);
        Permission::firstOrCreate(['name' => 'manage alternatives']);
        Permission::firstOrCreate(['name' => 'manage assessments']);

        // roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $operator = Role::firstOrCreate(['name' => 'operator_simpeg']);
        $penilai = Role::firstOrCreate(['name' => 'pengelola_jkn']);
        $kasubag = Role::firstOrCreate(['name' => 'kasubag_tu']);
        $ketua = Role::firstOrCreate(['name' => 'bendahara_pengeluaran']);
        $kepala = Role::firstOrCreate(['name' => 'kepala_puskesmas']);

        // assign permission ke role
        $admin->givePermissionTo(['manage users', 'manage criteria', 'approve alternatives']);
        $operator->givePermissionTo(['manage alternatives']);
        $penilai->givePermissionTo(['manage assessments']);
        $penilai->givePermissionTo(['manage alternatives']);
        $kasubag->givePermissionTo(['approve alternatives']);
        $kasubag->givePermissionTo(['manage alternatives']);
        $kasubag->givePermissionTo(['manage assessments']);
        $ketua->givePermissionTo(['approve alternatives']);
        $ketua->givePermissionTo(['manage assessments']);
        $kepala->givePermissionTo(['approve alternatives']); // Biar bisa lihat hasil akhir / approve
        $kepala->givePermissionTo(['manage assessments']); // Menyesuaikan agar bisa akses laporan yang mungkin butuh permission ini
    }
}
