<?php

namespace Database\Seeders;

use App\Models\Criterion;
use Illuminate\Database\Seeder;

class CriterionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['code' => 'C1', 'name' => 'Kehadiran', 'type' => 'benefit', 'weight' => 0.15, 'order' => 1],
            ['code' => 'C2', 'name' => 'Berorientasi Pelayanan', 'type' => 'benefit', 'weight' => 0.15, 'order' => 2],
            ['code' => 'C3', 'name' => 'Akuntabel', 'type' => 'benefit', 'weight' => 0.10, 'order' => 3],
            ['code' => 'C4', 'name' => 'Kompeten', 'type' => 'benefit', 'weight' => 0.15, 'order' => 4],
            ['code' => 'C5', 'name' => 'Harmonis', 'type' => 'benefit', 'weight' => 0.10, 'order' => 5],
            ['code' => 'C6', 'name' => 'Loyal', 'type' => 'benefit', 'weight' => 0.15, 'order' => 6],
            ['code' => 'C7', 'name' => 'Adaptif', 'type' => 'benefit', 'weight' => 0.10, 'order' => 7],
            ['code' => 'C8', 'name' => 'Kolaboratif', 'type' => 'benefit', 'weight' => 0.10, 'order' => 8],
        ];

        foreach ($items as $it) {
            Criterion::updateOrCreate(['code' => $it['code']], $it);
        }
    }
}
