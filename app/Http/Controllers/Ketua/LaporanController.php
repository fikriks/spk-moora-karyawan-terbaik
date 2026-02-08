<?php

namespace App\Http\Controllers\Ketua;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\MooraSteps;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Halaman laporan (React / Inertia)
     */
    public function index()
    {
        return Inertia::render('Ketua/Laporan/Index', [
            'steps' => MooraSteps::select('step', 'data')
                ->orderBy('id')
                ->get()
        ]);
    }

    /**
     * Export laporan ke PDF
     */
    public function exportPdf()
    {
        $steps = MooraSteps::all()->keyBy('step');

        return Pdf::loadView('reports.ketua-pengadilan', [
                'decisionMatrix' => $steps['decision_matrix']->data ?? [],
                'normalization'  => $steps['normalization']->data ?? [],
                'optimization'   => $steps['optimization']->data ?? [],
                'ranking'        => $steps['ranking']->data ?? [],
                'alternatives'   => Alternative::all()->keyBy('id'),
                'criteria'       => Criterion::orderBy('order')->get()->keyBy('id'),
                'tanggal'        => now()->translatedFormat('d F Y'),
            ])
            ->setPaper('A4', 'portrait')
            ->download('Laporan_Penilaian_Pegawai.pdf');
    }
}