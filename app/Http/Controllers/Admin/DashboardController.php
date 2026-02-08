<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\Nilai;
use App\Models\MooraSteps;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ===== MASTER DATA =====
        $totalUser       = User::count();
        $totalAlternatif = Alternative::count();
        $totalKriteria   = Criterion::count();
        $totalNilaiMasuk = Nilai::count();

        $totalNilaiIdeal = $totalAlternatif * $totalKriteria;

        // ===== STATUS DATA NILAI =====
        if ($totalNilaiMasuk === 0) {
            $statusNilai = 'Belum Ada Nilai';
        } elseif ($totalNilaiMasuk < $totalNilaiIdeal) {
            $statusNilai = 'Belum Lengkap';
        } else {
            $statusNilai = 'Lengkap';
        }

        // ===== STATUS MOORA =====
        $mooraSteps = MooraSteps::pluck('step')->toArray();

        $statusMoora = [
            'normalisasi' => in_array('normalisasi', $mooraSteps),
            'optimasi'    => in_array('optimasi', $mooraSteps),
            'ranking'     => in_array('ranking', $mooraSteps),
        ];

        $mooraReady = $statusNilai === 'Lengkap';

        return Inertia::render('Admin/Index', [
            'summary' => [
                'totalUser'       => $totalUser,
                'totalAlternatif' => $totalAlternatif,
                'totalKriteria'   => $totalKriteria,
                'nilaiMasuk'      => $totalNilaiMasuk,
                'nilaiIdeal'      => $totalNilaiIdeal,
                'statusNilai'     => $statusNilai,
                'mooraReady'      => $mooraReady,
            ],
            'mooraStatus' => $statusMoora,
        ]);
    }
}