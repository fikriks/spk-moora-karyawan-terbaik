<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\MooraSteps;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function index()
    {
        /* ================= SUMMARY ================= */
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

        /* ================= HASIL AKHIR MOORA ================= */
        $rankingStep = MooraSteps::where('step', 'ranking')->latest()->first();

        $finalRanking = [];

        if ($rankingStep && is_array($rankingStep->data)) {
            $alternativeMap = Alternative::pluck('name', 'id');
            $jabatanMap     = Alternative::pluck('jabatan', 'id');

            $finalRanking = collect($rankingStep->data)
                ->sortBy('rank')
                ->map(function ($row) use ($alternativeMap, $jabatanMap) {
                    return [
                        'id' => $row['alternative_id'],
                        'name' => $alternativeMap[$row['alternative_id']] ?? '-',
                        'jabatan' => $jabatanMap[$row['alternative_id']] ?? '-',
                        'nilai_akhir' => round($row['score'], 6),
                        'rank' => $row['rank'],
                    ];
                })
                ->values();
        }

        return Inertia::render('Ketua/Index', [
            'summary' => [
                'totalAlternatif' => $totalAlternatif,
                'totalKriteria'   => $totalKriteria,
                'nilaiMasuk'      => $totalNilaiMasuk,
                'nilaiIdeal'      => $totalNilaiIdeal,
                'statusProses'    => $statusProses,
            ],
            'finalRanking' => $finalRanking,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}