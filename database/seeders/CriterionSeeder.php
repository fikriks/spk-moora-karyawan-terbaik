<?php

namespace Database\Seeders;

use App\Models\Criterion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CriterionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['code'=>'C1','name'=>'Kehadiran','type'=>'benefit','weight'=>0.30,'order'=>1],
            ['code'=>'C2','name'=>'Kinerja','type'=>'benefit','weight'=>0.20,'order'=>2],
            ['code'=>'C3','name'=>'Disiplin','type'=>'benefit','weight'=>0.20,'order'=>3],
            ['code'=>'C4','name'=>'Tanggung Jawab','type'=>'benefit','weight'=>0.10,'order'=>4],
            ['code'=>'C5','name'=>'Kerja Sama Tim','type'=>'benefit','weight'=>0.10,'order'=>5],
            ['code'=>'C6','name'=>'Inovasi','type'=>'benefit','weight'=>0.10,'order'=>6],
        ];

        foreach ($items as $it) {
            Criterion::updateOrCreate(['code'=>$it['code']], $it);
        }
    }
}