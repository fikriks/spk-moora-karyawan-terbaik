<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AlternativeSeeder extends Seeder
{
    public function run(): void
    {
         DB::table('alternative')->delete();

        $data = [
            [
                'nip' => '197906292005021001',
                'name' => 'JUNDY EKA SAPUTRA, SE',
                'jabatan' => 'Sekretaris Tingkat Pertama Klas II',
            ],
            [
                'nip' => '196602191987031004',
                'name' => 'Drs. DADANG SUDRAJAT',
                'jabatan' => 'Panitera PN II',
            ],
            [
                'nip' => '198411072009041007',
                'name' => 'ANDRI HENDRIANA, S.Kom.',
                'jabatan' => 'Analis Pengelolaan Keuangan APBN/Pengawas Keuangan Negara Ahli Muda',
            ],
            [
                'nip' => '197205111993031002',
                'name' => 'MOHAMAD SADIKIN, SH',
                'jabatan' => 'Panitera Muda PN II',
            ],
            [
                'nip' => '198306302009121003',
                'name' => 'IMAN SAEDIMAN, SH',
                'jabatan' => 'Panitera Muda PN II',
            ],
            [
                'nip' => '198512252009031004',
                'name' => 'DEDEN SUHERMAN',
                'jabatan' => 'Panitera Pengganti PN II',
            ],
            [
                'nip' => '197812112009041001',
                'name' => 'RUDIANSYAH',
                'jabatan' => 'Panitera Pengganti PN II',
            ],
            [
                'nip' => '198909102009041002',
                'name' => 'DADANG SUPRIADI',
                'jabatan' => 'Panitera Pengganti PN II',
            ],
            [
                'nip' => '199002282019031003',
                'name' => 'KIKI FAUZI, S.E',
                'jabatan' => 'Pengelola Perkara',
            ],
            [
                'nip' => '198901142019031002',
                'name' => 'RINA APRILIANA, S.H',
                'jabatan' => 'Pengelola Perkara',
            ],
            [
                'nip' => '199308252019031001',
                'name' => 'DEDI MULYADI',
                'jabatan' => 'Pengelola Perkara',
            ],
            [
                'nip' => '199311122019031002',
                'name' => 'NURUL HUDA',
                'jabatan' => 'Pengelola Perkara',
            ],
            [
                'nip' => '198706052019031002',
                'name' => 'MULYANA',
                'jabatan' => 'Pranata Keuangan APBN',
            ],
            [
                'nip' => '198610172019031002',
                'name' => 'SITI AISYAH',
                'jabatan' => 'Pranata Keuangan APBN',
            ],
            [
                'nip' => '199206252019031001',
                'name' => 'RISKA AMELIA',
                'jabatan' => 'Pengelola Keuangan',
            ],
            [
                'nip' => '198704202019031001',
                'name' => 'HENDRA GUNAWAN',
                'jabatan' => 'Pengelola Keuangan',
            ],
            [
                'nip' => '199010112019031002',
                'name' => 'AGUS SETIAWAN',
                'jabatan' => 'Pengelola Keuangan',
            ],
            [
                'nip' => '199405102019031001',
                'name' => 'FITRIANI',
                'jabatan' => 'Pengelola Keuangan',
            ],
            [
                'nip' => '199112072019031001',
                'name' => 'WAWAN SETIAWAN',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '198911252019031001',
                'name' => 'NURHAYATI',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '199312152019031001',
                'name' => 'YOGI PRATAMA',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '198808102019031001',
                'name' => 'SURYANA',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '199406182019031001',
                'name' => 'DIAN ANGGRAENI',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '199201082019031002',
                'name' => 'ARI SETIAWAN',
                'jabatan' => 'Pengelola Umum',
            ],
            [
                'nip' => '199309272019031001',
                'name' => 'RIZKY MAULANA',
                'jabatan' => 'Pengelola Umum',
            ],
        ];

        foreach ($data as &$row) {
            $row['created_at'] = now();
            $row['updated_at'] = now();
        }

        DB::table('alternative')->insert($data);
    }
}