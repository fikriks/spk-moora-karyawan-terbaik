<?php

namespace App\Services;

use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\MooraSteps;

class MooraService
{
    public function process(): array
    {
        MooraSteps::truncate(); // reset proses lama (opsional)

        $matrix = $this->decisionMatrix();
        $normalized = $this->normalization($matrix);
        $optimization = $this->optimization($normalized);
        $ranking = $this->ranking($optimization);

        return compact('matrix', 'normalized', 'optimization', 'ranking');
    }

    /**
     * (1) Matriks Keputusan
     */
    private function decisionMatrix(): array
    {
        $matrix = [];

        $alternatives = Alternative::with('nilais')->get();

        foreach ($alternatives as $alt) {
            foreach ($alt->nilais as $nilai) {
                $matrix[$alt->id][$nilai->criteria_id] = $nilai->value;
            }
        }

        MooraSteps::create([
            'step' => 'decision_matrix',
            'data' => $matrix
        ]);

        return $matrix;
    }

    /**
     * (2) Normalisasi Matriks
     * Xij* = Xij / sqrt(Σ Xij²)
     */
    private function normalization(array $matrix): array
    {
        $denominator = [];
        $normalized = [];

        foreach ($matrix as $values) {
            foreach ($values as $criteriaId => $value) {
                $denominator[$criteriaId] =
                    ($denominator[$criteriaId] ?? 0) + pow($value, 2);
            }
        }

        foreach ($denominator as $criteriaId => $value) {
            $denominator[$criteriaId] = sqrt($value);
        }

        foreach ($matrix as $altId => $values) {
            foreach ($values as $criteriaId => $value) {
                $normalized[$altId][$criteriaId] =
                    $value / $denominator[$criteriaId];
            }
        }

        MooraSteps::create([
            'step' => 'normalization',
            'data' => $normalized
        ]);

        return $normalized;
    }

    /**
     * (4) Optimasi MOORA
     * Yi = Σ(wj * x*) benefit − Σ(wj * x*) cost
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

                if ($criterias[$criteriaId]->type === 'benefit') {
                    $benefit += $weight * $value;
                } else {
                    $cost += $weight * $value;
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
     * Ranking Yi
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
            'score' => round($score, 6),
        ];
    }

    MooraSteps::create([
        'step' => 'ranking',
        'data' => $ranked
    ]);

    return $ranked;
}
}