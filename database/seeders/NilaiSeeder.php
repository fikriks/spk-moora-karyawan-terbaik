<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NilaiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nilai')->truncate();

        $alternatives = DB::table('alternative')->get();
        $criterias = DB::table('criteria')->get();

        $data = [];

        foreach ($alternatives as $alt) {
            foreach ($criterias as $cri) {
                $data[] = [
                    'alternative_id' => $alt->id,
                    'criteria_id' => $cri->id,
                    'value' => rand(60, 100), // nilai realistis
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        DB::table('nilai')->insert($data);
    }
}