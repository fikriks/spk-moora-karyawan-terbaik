<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\Nilai;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ===== BASIC COUNT =====
        $totalAlternatif = Alternative::count();
        $totalKriteria   = Criterion::count();
        $totalNilaiMasuk = Nilai::count();

        $totalNilaiIdeal = $totalAlternatif * $totalKriteria;

        // ===== STATUS DATA =====
        if ($totalNilaiMasuk === 0) {
            $statusData = 'Belum Ada Nilai';
        } elseif ($totalNilaiMasuk < $totalNilaiIdeal) {
            $statusData = 'Belum Lengkap';
        } else {
            $statusData = 'Siap Diproses';
        }

        // ===== STATUS PER PEGAWAI =====
        $statusPegawai = Alternative::withCount('nilais')
            ->get()
            ->map(function ($alt) use ($totalKriteria) {
                return [
                    'id' => $alt->id,
                    'name' => $alt->name,
                    'jabatan' => $alt->jabatan,
                    'nilai_masuk' => $alt->nilais_count,
                    'status' => $alt->nilais_count >= $totalKriteria
                        ? 'Lengkap'
                        : 'Belum Lengkap',
                ];
            });

        return Inertia::render('Operator/Index', [
            'summary' => [
                'totalAlternatif' => $totalAlternatif,
                'totalKriteria'   => $totalKriteria,
                'nilaiMasuk'      => $totalNilaiMasuk,
                'nilaiIdeal'      => $totalNilaiIdeal,
                'statusData'      => $statusData,
            ],
            'statusPegawai' => $statusPegawai,
        ]);
    }
}