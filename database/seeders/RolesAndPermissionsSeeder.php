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
        Permission::firstOrCreate(['name' => 'approve leave']);
        Permission::firstOrCreate(['name' => 'manage criteria']);

        // roles
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $atasan = Role::firstOrCreate(['name' => 'atasan']);
        $user  = Role::firstOrCreate(['name' => 'karyawan']);

        // assign permission ke role
        $admin->givePermissionTo(['manage users','manage criteria','approve leave']);
        $atasan->givePermissionTo(['approve leave']);

        // contoh assign role ke user id=1
        $u = User::find(1);
        if ($u) {
            $u->assignRole('admin');
        }
    }
}