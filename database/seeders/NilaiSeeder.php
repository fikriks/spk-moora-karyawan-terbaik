<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NilaiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nilai')->truncate();

        $alternatives = DB::table('alternative')->orderBy('id')->get();
        $criterias = DB::table('criteria')->orderBy('id')->get();

        $nilaiData = [
            [5, 4, 5, 4, 4, 5, 4, 5],
            [4, 5, 4, 5, 4, 4, 5, 4],
            [5, 5, 4, 4, 5, 4, 4, 5],
            [4, 4, 5, 5, 4, 5, 4, 4],
            [5, 4, 4, 5, 5, 4, 5, 4],
            [4, 5, 5, 4, 4, 5, 4, 5],
            [5, 4, 5, 5, 4, 4, 5, 4],
            [4, 5, 4, 4, 5, 5, 4, 5],
            [5, 5, 4, 5, 4, 5, 4, 4],
            [4, 4, 5, 4, 5, 4, 5, 5],
            [5, 4, 4, 5, 4, 5, 5, 4],
            [4, 5, 5, 4, 5, 4, 4, 5],
            [5, 5, 5, 4, 4, 4, 5, 4],
            [4, 4, 4, 5, 5, 5, 4, 5],
            [5, 4, 5, 4, 5, 4, 5, 4],
            [4, 5, 4, 5, 4, 5, 4, 5],
            [5, 3, 4, 5, 4, 5, 4, 5],
            [4, 5, 3, 4, 5, 4, 5, 4],
            [5, 4, 5, 3, 4, 5, 4, 4],
            [4, 4, 5, 4, 3, 5, 4, 5],
            [5, 5, 4, 4, 5, 3, 4, 4],
            [4, 4, 4, 5, 4, 5, 3, 5],
            [5, 4, 5, 4, 4, 4, 5, 3],
            [3, 5, 4, 5, 4, 4, 5, 4],
            [4, 3, 5, 4, 5, 4, 4, 5],
            [5, 4, 3, 5, 4, 5, 4, 4],
            [4, 5, 4, 3, 5, 4, 5, 4],
            [5, 4, 5, 4, 3, 4, 5, 4],
            [4, 5, 4, 5, 4, 3, 4, 5],
            [5, 3, 5, 4, 5, 4, 3, 4],
            [3, 4, 4, 5, 4, 5, 4, 5],
            [4, 3, 4, 5, 5, 4, 5, 4],
            [5, 4, 3, 4, 5, 5, 4, 4],
            [4, 5, 4, 3, 4, 5, 5, 4],
            [5, 4, 5, 4, 3, 4, 4, 5],
            [4, 5, 4, 5, 4, 3, 5, 4],
            [3, 4, 5, 4, 5, 4, 5, 3],
            [4, 3, 4, 5, 4, 5, 3, 5],
            [5, 4, 3, 4, 5, 3, 5, 4],
            [3, 5, 4, 3, 5, 4, 4, 5],
            [4, 3, 5, 4, 3, 5, 5, 4],
            [5, 4, 3, 5, 4, 3, 4, 5],
        ];

        $data = [];

        foreach ($alternatives as $index => $alt) {
            foreach ($criterias as $cIndex => $cri) {
                $data[] = [
                    'alternative_id' => $alt->id,
                    'criteria_id' => $cri->id,
                    'value' => $nilaiData[$index][$cIndex],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('nilai')->insert($data);
    }
}
