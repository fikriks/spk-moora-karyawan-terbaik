<?php

namespace App\Http\Controllers\Kasubag;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\Nilai;
use App\Models\MooraSteps;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /* ================= BASIC COUNT ================= */
        $totalAlternatif = Alternative::count();
        $totalKriteria   = Criterion::count();
        $totalNilaiMasuk = Nilai::count();

        $totalNilaiIdeal = $totalAlternatif * $totalKriteria;

        if ($totalNilaiMasuk === 0) {
            $statusProses = 'Belum Dimulai';
        } elseif ($totalNilaiMasuk < $totalNilaiIdeal) {
            $statusProses = 'Belum Selesai';
        } else {
            $statusProses = 'Selesai';
        }

        /* ================= STATUS PER PEGAWAI ================= */
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

        /* ================= RANKING (DARI MOORA STEPS) ================= */
        $rankingStep = MooraSteps::where('step', 'ranking')->latest()->first();

        $topRanking = [];

        if ($rankingStep && is_array($rankingStep->data)) {
            $altMap = Alternative::all()->keyBy('id');

            $topRanking = collect($rankingStep->data)
                ->sortBy('rank')
                ->take(5)
                ->map(function ($row) use ($altMap) {
                    $alt = $altMap[$row['alternative_id']] ?? null;

                    return [
                        'id' => $row['alternative_id'],
                        'name' => $alt?->name ?? '-',
                        'jabatan' => $alt?->jabatan ?? '-',
                        'nilai_akhir' => round($row['score'], 6),
                        'rank' => $row['rank'],
                    ];
                })
                ->values();
        }

        return Inertia::render('Kasubag/Index', [
            'summary' => [
                'totalAlternatif' => $totalAlternatif,
                'totalKriteria'   => $totalKriteria,
                'nilaiMasuk'      => $totalNilaiMasuk,
                'nilaiIdeal'      => $totalNilaiIdeal,
                'statusProses'    => $statusProses,
            ],
            'statusPegawai' => $statusPegawai,
            'topRanking' => $topRanking,
        ]);
    }
}