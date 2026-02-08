<?php

namespace App\Http\Controllers\Penilai;

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

        // ===== STATUS PROSES =====
        if ($totalNilaiMasuk === 0) {
            $statusProses = 'Belum Dimulai';
        } elseif ($totalNilaiMasuk < $totalNilaiIdeal) {
            $statusProses = 'Belum Selesai';
        } else {
            $statusProses = 'Selesai';
        }

        // ===== STATUS PEGAWAI (UNTUK PENILAI) =====
        $statusPegawai = Alternative::withCount('nilais')
            ->get()
            ->map(function ($alt) use ($totalKriteria) {
                return [
                    'id' => $alt->id,
                    'name' => $alt->name,
                    'jabatan' => $alt->jabatan,
                    'nilai_masuk' => $alt->nilais_count,
                    'status' => $alt->nilais_count >= $totalKriteria
                        ? 'Sudah Dinilai'
                        : 'Belum Lengkap',
                ];
            });

        return Inertia::render('Penilai/Index', [
            'summary' => [
                'totalAlternatif' => $totalAlternatif,
                'totalKriteria'   => $totalKriteria,
                'nilaiMasuk'      => $totalNilaiMasuk,
                'nilaiIdeal'      => $totalNilaiIdeal,
                'statusProses'    => $statusProses,
            ],
            'statusPegawai' => $statusPegawai,
        ]);
    }
}