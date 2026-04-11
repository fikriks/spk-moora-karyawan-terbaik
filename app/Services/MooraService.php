<?php

namespace App\Services;

use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\MooraSteps;

class MooraService
{
    public function process(): array
    {
        MooraSteps::truncate();

        // 1. Matriks Keputusan
        $matrix = $this->decisionMatrix();

        // 2. Hitung √ΣX²
        $denominator = $this->calculateDenominator($matrix);

        // 3. Matriks Normalisasi
        $normalized = $this->normalization($matrix, $denominator);

        // 4. Optimasi Yi
        $optimization = $this->optimization($normalized);

        // 5. Ranking
        $ranking = $this->ranking($optimization);

        return compact(
            'matrix',
            'denominator',
            'normalized',
            'optimization',
            'ranking'
        );
    }

    /**
     * 1️⃣ Matriks Keputusan
     */
    private function decisionMatrix(): array
    {
        $matrix = [];

        $alternatives = Alternative::with('nilais')->get();
        $criterias = Criterion::pluck('id')->toArray();

        foreach ($alternatives as $alt) {
            foreach ($criterias as $criteriaId) {
                $nilai = $alt->nilais->firstWhere('criteria_id', $criteriaId);
                $matrix[$alt->id][$criteriaId] = $nilai->value ?? 0;
            }
        }

        MooraSteps::create([
            'step' => 'decision_matrix',
            'data' => $matrix
        ]);

        return $matrix;
    }

    /**
     * 2️⃣ Hitung Penyebut (√ΣX²)
     */
    private function calculateDenominator(array $matrix): array
    {
        $denominator = [];

        foreach ($matrix as $values) {
            foreach ($values as $criteriaId => $value) {
                $denominator[$criteriaId] =
                    ($denominator[$criteriaId] ?? 0) + pow($value, 2);
            }
        }

        foreach ($denominator as $criteriaId => $value) {
            $denominator[$criteriaId] = sqrt((float) $value);
        }

        MooraSteps::create([
            'step' => 'denominator',
            'data' => $denominator
        ]);

        return $denominator;
    }

    /**
     * 3️⃣ Matriks Normalisasi
     * Xij* = Xij / √ΣX²
     */
    private function normalization(array $matrix, array $denominator): array
    {
        $normalized = [];

        foreach ($matrix as $altId => $values) {
            foreach ($values as $criteriaId => $value) {

                $normalized[$altId][$criteriaId] =
                    $denominator[$criteriaId] != 0
                        ? $value / $denominator[$criteriaId]
                        : 0;
            }
        }

        MooraSteps::create([
            'step' => 'normalization',
            'data' => $normalized
        ]);

        return $normalized;
    }

    /**
     * 4️⃣ Optimasi Multi Objektif
     * Yi = Σ (Wj * Xij*)
     * Jika ada cost → dikurangi
     */
    private function optimization(array $normalized): array
    {
        $results = [];
        $criterias = Criterion::all()->keyBy('id');

        foreach ($normalized as $altId => $values) {

            $benefit = 0;
            $cost = 0;

            foreach ($values as $criteriaId => $value) {

                $weight = $criterias[$criteriaId]->weight;
                $weightedValue = $value * $weight;

                if ($criterias[$criteriaId]->type === 'benefit') {
                    $benefit += $weightedValue;
                } else {
                    $cost += $weightedValue;
                }
            }

            $results[$altId] = $benefit - $cost;
        }

        MooraSteps::create([
            'step' => 'optimization',
            'data' => $results
        ]);

        return $results;
    }

    /**
     * 5️⃣ Ranking
     */
    private function ranking(array $optimization): array
{
    arsort($optimization);

    $alternatives = Alternative::pluck('name', 'id');

    $ranked = [];
    $rank = 1;

    foreach ($optimization as $altId => $score) {
        $ranked[] = [
            'rank' => $rank++,
            'alternative_id' => $altId,
            'alternative_name' => $alternatives[$altId] ?? '-',
            'score' => $score,
        ];
    }

    MooraSteps::create([
        'step' => 'ranking',
        'data' => $ranked
    ]);

    return $ranked;
}

}