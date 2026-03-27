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
                'nip' => '197001011990011001',
                'name' => 'H. Tedy Heriadi, SKM.,M.M.Kes.',
                'jabatan' => 'Kepala Puskesmas',
                'golongan' => 'IV.a',
                'jenis_ketenagakerjaan' => 'Profesi Keperawatan Tenaga Kesehatan + S2 Kesehatan',
            ],
            [
                'nip' => '197502151995012002',
                'name' => 'Lis Suryani, S.Kep.,Ners.,M.Si.',
                'jabatan' => 'Kasubag TU',
                'golongan' => 'III.d',
                'jenis_ketenagakerjaan' => 'Profesi Keperawatan Tenaga Kesehatan + S2 Non Kesehatan',
            ],
            [
                'nip' => '198103101998032001',
                'name' => 'Eka Surtikayah, SST.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '198205201998032002',
                'name' => 'Rita Kartika, Am.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '197808121997031001',
                'name' => 'Eni Rohaeni, SKM',
                'jabatan' => 'Sanitarian/ Kesling',
                'golongan' => 'III.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '198506152000032003',
                'name' => 'Cicih Yunengsih, Am.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '198704182001032004',
                'name' => 'Iin Herlina, Am.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '198809201999032005',
                'name' => 'Dessy Ariani, S.Tr.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '198605221998032006',
                'name' => 'Heni Hendayani, S.Tr.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '197903251996032007',
                'name' => 'Hj. Nonoh Hasanah, S.Tr.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '198112151999031008',
                'name' => 'Opik Zaenal Ali Lukmani, S.Farm',
                'jabatan' => 'Apoteker',
                'golongan' => 'III.b',
                'jenis_ketenagakerjaan' => 'Apoteker',
            ],
            [
                'nip' => '198803101995012009',
                'name' => 'Neng Lina Marlina, A.Md.Kep',
                'jabatan' => 'Perawat',
                'golongan' => 'II.d',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan D3',
            ],
            [
                'nip' => '198706051995011010',
                'name' => 'Nandang, A.Md.Kep',
                'jabatan' => 'Perawat',
                'golongan' => 'II.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199001151998032011',
                'name' => 'Annisa, Am.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'II.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199203201999032012',
                'name' => 'Reni Sri Wahyuni, Amd.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'II.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199108252000032013',
                'name' => 'Tati Rahmawati, A.Md.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'II.d',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199305301998032014',
                'name' => 'Eli Nurlaeli, Amd.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'II.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199206101998031015',
                'name' => 'Ulfi Lutfiah, A.Md,Gz',
                'jabatan' => 'Nutrisionis',
                'golongan' => 'II.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199408151999031016',
                'name' => 'Feny Kushandayani, A.Md.Kep.',
                'jabatan' => 'Perawat',
                'golongan' => 'II.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199505202000031017',
                'name' => 'Mila Amaliah, A.Md.Kep.',
                'jabatan' => 'Perawat',
                'golongan' => 'II.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199303251999032018',
                'name' => 'Maria Umami, AMKG.',
                'jabatan' => 'Terapis Gigi dan Mulut',
                'golongan' => 'II.c',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199107101998031019',
                'name' => 'Rini Mairida Pasaribu, A.Md.Kep.',
                'jabatan' => 'Perawat',
                'golongan' => 'VII',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '198704051995032020',
                'name' => 'Tety Herawati',
                'jabatan' => 'Administrasi Umum',
                'golongan' => 'V',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan dibawah D3',
            ],
            [
                'nip' => '199002101998032021',
                'name' => 'Yuli Nurliawati, Am.Keb',
                'jabatan' => 'Bidan',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199105152000032022',
                'name' => 'Elsa Dwicahyani Fauzi, Amd.Farm',
                'jabatan' => 'Asisten Apoteker',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199208201999031023',
                'name' => 'Rohman Nulhakim, Amd.Kep',
                'jabatan' => 'Perawat',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199003251998032024',
                'name' => 'Maya Sitinuraidah, Amd.Keb',
                'jabatan' => 'Bidan',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '198001011990031025',
                'name' => 'Dr. Dea Tantiara Bontanita',
                'jabatan' => 'Dokter Umum',
                'golongan' => 'X',
                'jenis_ketenagakerjaan' => 'Medis/Dokter',
            ],
            [
                'nip' => '199304101998032026',
                'name' => 'Bella Puspa Dynesha',
                'jabatan' => 'Farmasi',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199206151999032027',
                'name' => 'Virna Yustinia, S.Kep.,Ners',
                'jabatan' => 'Perawat',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Profesi Keperawatan',
            ],
            [
                'nip' => '199107202000031028',
                'name' => 'Yoga Ady Permana, S.Kep',
                'jabatan' => 'Pengadministrasi Umum',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '199208251995032029',
                'name' => 'Dise Dwi Anggia Putri, SE.',
                'jabatan' => 'Administrasi Keuangan',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '199003301998031030',
                'name' => 'Heri Khaerudin',
                'jabatan' => 'Administrasi',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan dibawah D3',
            ],
            [
                'nip' => '199104051999032031',
                'name' => 'Rochmarina, Amd.Keb.',
                'jabatan' => 'Bidan',
                'golongan' => 'THL',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199006101998031032',
                'name' => 'Meta Agustina Sadikin, AMAK.',
                'jabatan' => 'Analis',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '199007151999031033',
                'name' => 'Rida Nurfadhilah, SKM',
                'jabatan' => 'Kesehatan Masyarakat',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '199108202000031034',
                'name' => 'Paschalies vernanda',
                'jabatan' => 'Rekam medis',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'tenaga kesehatan D3',
            ],
            [
                'nip' => '199003251998032035',
                'name' => 'Desih Ristinanni',
                'jabatan' => 'Bidan',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Kesehatan D3',
            ],
            [
                'nip' => '198505101990031036',
                'name' => 'drg. Friska Nur Rizki',
                'jabatan' => 'Dokter Gigi',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Medis/Dokter',
            ],
            [
                'nip' => '199006151995031037',
                'name' => 'Gerry Pratama Putra, SE.',
                'jabatan' => 'Pengadministrasi Umum',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan Paling Rendah S1/D4',
            ],
            [
                'nip' => '197507201980031038',
                'name' => 'Sujim',
                'jabatan' => 'Tenaga Keamanan',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan dibawah D3',
            ],
            [
                'nip' => '197808251985031039',
                'name' => 'Juju',
                'jabatan' => 'Tenaga Kebersihan',
                'golongan' => 'T-BLUD',
                'jenis_ketenagakerjaan' => 'Tenaga Non Kesehatan dibawah D3',
            ],
        ];

        $now = now();
        foreach ($data as &$row) {
            $row['created_at'] = $now;
            $row['updated_at'] = $now;
        }

        DB::table('alternative')->insert($data);
    }
}
