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
            ['code'=>'C1','name'=>'Produktivitas','type'=>'benefit','weight'=>0.30,'order'=>1],
            ['code'=>'C2','name'=>'Kedisiplinan','type'=>'benefit','weight'=>0.25,'order'=>2],
            ['code'=>'C3','name'=>'Kualitas Kerja','type'=>'benefit','weight'=>0.20,'order'=>3],
            ['code'=>'C4','name'=>'Kerjasama Tim','type'=>'benefit','weight'=>0.15,'order'=>4],
            ['code'=>'C5','name'=>'Tepat Waktu','type'=>'benefit','weight'=>0.10,'order'=>5],
        ];

        foreach ($items as $it) {
            Criterion::updateOrCreate(['code'=>$it['code']], $it);
        }
    }
}