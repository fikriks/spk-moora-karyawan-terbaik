<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NilaiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nilai')->truncate();

        // Ambil semua alternatif dan criteria
        $alternatives = DB::table('alternative')->orderBy('id')->get();
        $criterias = DB::table('criteria')->orderBy('id')->get();

        // Mapping nilai sesuai tabel (A1 - A34)
        $nilaiData = [
            [80,70,85,75,85,70], // A1
            [90,75,85,80,70,75], // A2
            [85,80,85,70,85,70], // A3
            [80,70,75,75,80,75], // A4
            [90,75,80,80,80,70], // A5
            [85,80,85,75,75,70], // A6
            [90,85,85,90,80,75], // A7
            [90,80,90,80,90,70], // A8
            [80,70,75,80,85,75], // A9
            [85,85,80,70,80,75], // A10
            [85,80,85,75,80,70], // A11
            [80,75,80,70,75,75], // A12
            [90,85,90,85,90,75], // A13
            [75,70,75,70,75,70], // A14
            [85,75,80,75,80,75], // A15
            [80,80,85,80,85,70], // A16
            [90,85,85,90,85,75], // A17
            [75,70,75,75,70,70], // A18
            [85,80,80,75,85,75], // A19
            [90,80,90,85,90,70], // A20
            [80,75,85,80,80,75], // A21
            [75,70,75,70,75,70], // A22
            [85,85,85,80,85,75], // A23
            [90,80,90,85,85,75], // A24
            [80,75,80,75,80,70], // A25
            [85,80,85,80,85,75], // A26
            [90,85,90,90,90,75], // A27
            [75,70,75,75,75,70], // A28
            [85,80,80,75,80,75], // A29
            [90,85,85,85,85,75], // A30
            [80,75,80,75,80,70], // A31
            [85,80,85,80,85,75], // A32
            [75,70,75,70,75,70], // A33
            [90,85,90,85,90,75], // A34
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