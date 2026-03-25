<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlternativeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('alternative')->delete();

        $faker = \Faker\Factory::create('id_ID');
        $jabatans = [
            'Staf Administrasi',
            'Sekretaris Tingkat Pertama',
            'Analis Pengelolaan Keuangan',
            'Panitera Muda',
            'Pengelola Perkara',
            'Staf IT',
            'Jurusita',
            'Pranata Komputer',
        ];

        $data = [];
        for ($i = 1; $i <= 34; $i++) {
            // Generate Tanggal Lahir (rentang 1970 - 2000)
            $birthDate = $faker->dateTimeBetween('-55 years', '-25 years');
            $tglLahir = $birthDate->format('Ymd');

            // Generate TMT CPNS (asumsi diangkat umur 20-30 tahun)
            $cpnsYear = (int)$birthDate->format('Y') + $faker->numberBetween(20, 30);
            $cpnsMonth = str_pad($faker->numberBetween(1, 12), 2, '0', STR_PAD_LEFT);
            $tmtCpns = $cpnsYear . $cpnsMonth;

            // Jenis Kelamin (1 atau 2) & Nomor Urut
            $gender = $faker->randomElement([1, 2]);
            $sequence = str_pad($i, 3, '0', STR_PAD_LEFT);

            $nip = $tglLahir . $tmtCpns . $gender . $sequence;

            $data[] = [
                'nip' => $nip,
                'name' => strtoupper($faker->name($gender == 1 ? 'male' : 'female')),
                'jabatan' => $faker->randomElement($jabatans),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('alternative')->insert($data);
    }
}