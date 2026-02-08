<?php

namespace App\Http\Controllers;

use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\MooraSteps;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class MooraReportController extends Controller
{
    public function export()
    {
        $steps = MooraSteps::all()->keyBy('step');

        $alternatives = Alternative::all()->keyBy('id');
        $criteria = Criterion::orderBy('order')->get()->keyBy('id');

        $pdf = Pdf::loadView('moora', [
            'decisionMatrix' => $steps['decision_matrix']->data ?? [],
            'normalization'  => $steps['normalization']->data ?? [],
            'optimization'   => $steps['optimization']->data ?? [],
            'ranking'        => $steps['ranking']->data ?? [],
            'alternatives'   => $alternatives,
            'criteria'       => $criteria,
        ])->setPaper('A4', 'portrait');

        return $pdf->download('Laporan_Hasil_Perhitungan_MOORA.pdf');
    }
}