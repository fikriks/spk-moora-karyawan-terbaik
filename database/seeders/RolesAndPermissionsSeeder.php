<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $operator = Role::firstOrCreate(['name' => 'operator']);
        $penilai  = Role::firstOrCreate(['name' => 'penilai']);
        $kasubag  = Role::firstOrCreate(['name' => 'kasubag_kepegawaian']);
        $ketua  = Role::firstOrCreate(['name' => 'ketua_pengadilan']);

        // assign permission ke role
        $admin->givePermissionTo(['manage users','manage criteria','approve alternatives']);
        $operator->givePermissionTo(['manage alternatives']);
        $penilai->givePermissionTo(['manage assessments']);
        $penilai->givePermissionTo(['manage alternatives']);
        $kasubag->givePermissionTo(['approve alternatives']);
        $kasubag->givePermissionTo(['manage alternatives']);
        $kasubag->givePermissionTo(['manage assessments']);
        $ketua->givePermissionTo(['approve alternatives']);
        $ketua->givePermissionTo(['manage assessments']);

        // contoh assign role ke user id=1
        $u = User::find(1);
        if ($u) {
            $u->assignRole('admin');
        }
    }
}