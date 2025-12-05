<?php

namespace App\Services;

class MooraService
{
    // contoh method sederhana: untuk testing alur
    public function runForLeave($leave)
    {
        // contoh output struktur yang diharapkan oleh controller admin
        return [
            'input_snapshot' => [
                'duration_days' => $leave->duration_days,
                // tambahkan kriteria lain di sini
            ],
            'scores' => [
                // detail per langkah jika perlu
            ],
            'final_score' => rand(1,100) / 100, // contoh nilai sementara
            'decision' => 'recommended', // or 'need_review'
        ];
    }
}