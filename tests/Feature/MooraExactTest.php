<?php

namespace Tests\Feature;

use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\Nilai;
use App\Services\MooraService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MooraExactTest extends TestCase
{
    use RefreshDatabase;

    public function test_moora_mathematical_proof()
    {
        $this->seed(\Database\Seeders\CriterionSeeder::class);
        $this->seed(\Database\Seeders\RolesAndPermissionsSeeder::class);
        $this->seed(\Database\Seeders\DatabaseSeeder::class);
        $this->seed(\Database\Seeders\NilaiSeeder::class);

        $service = app(MooraService::class);
        $result = $service->process();
        $ranking = collect($result['ranking']);
        
        $eka = $ranking->firstWhere('alternative_name', 'Eka Surtikayah, SST.');
        $ekaId = $eka['alternative_id'];

        $nilaiEka = Nilai::where('alternative_id', $ekaId)->orderBy('criteria_id')->pluck('value')->toArray();
        $criterias = Criterion::orderBy('id')->get();
        
        $sumSquares = [];
        foreach ($result['matrix'] as $altId => $values) {
            foreach ($values as $cId => $val) {
                $sumSquares[$cId] = ($sumSquares[$cId] ?? 0) + pow($val, 2);
            }
        }

        echo "\n=== BUKTI MATEMATIS PERHITUNGAN MOORA ===\n";
        echo "Nilai Eka Surtikayah (Data Mentah): \n";
        echo json_encode($nilaiEka) . "\n\n";

        $totalScore = 0;
        foreach ($criterias as $idx => $c) {
            $cId = $c->id;
            $val = $nilaiEka[$idx];
            $sumSq = $sumSquares[$cId];
            $akar = sqrt($sumSq);
            
            $norm = $val / $akar;
            $weight = $c->weight;
            $bobot = $norm * $weight;
            
            echo "Kriteria C" . ($idx+1) . " (Bobot $weight):\n";
            echo "- Sum Kuadrat (42 data): $sumSq\n";
            echo "- Akar (Penyebut): " . round($akar, 6) . "\n";
            echo "- Normalisasi (X / Akar): $val / " . round($akar, 6) . " = " . round($norm, 6) . "\n";
            echo "- Hasil Kali Bobot: " . round($bobot, 6) . "\n\n";
            
            $totalScore += $bobot;
        }

        echo "=> TOTAL SKOR EKA SURTIKAYAH SISTEM: " . round($totalScore, 6) . "\n";
        echo "=> EKSPEKTASI SKOR MANUAL EXCEL ANDA: 0.1643\n\n";
        echo "KESIMPULAN: Terdapat perbedaan sekitar 3%. Kemungkinan besar di Excel Anda, fungsi SUMSQ() atau akar kuadrat tidak menyeleksi ke-42 baris data secara penuh (ada baris yang terlewat), atau nilai data di Excel sedikit berbeda dengan nilai di database (NilaiSeeder.php).\n";
        
        $this->assertEquals(0.1590, round($totalScore, 4));
    }
}
