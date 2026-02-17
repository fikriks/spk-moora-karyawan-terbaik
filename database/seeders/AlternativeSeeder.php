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

            // A1
            ['nip'=>'AUTO001','name'=>'EVI SETIA PERMANA, SH','jabatan'=>'Staf Administrasi'],

            // A2
            ['nip'=>'197906292005021001','name'=>'JUNDY EKA SAPUTRA, SE','jabatan'=>'Sekretaris Tingkat Pertama Klas II'],

            // A3
            ['nip'=>'198411072009041007','name'=>'ANDRI HENDRIANA, S.Kom.','jabatan'=>'Analis Pengelolaan Keuangan APBN/Pengawas Keuangan Negara Ahli Muda'],

            // A4
            ['nip'=>'197205111993031002','name'=>'MOHAMAD SADIKIN, SH','jabatan'=>'Panitera Muda PN II'],

            // A5
            ['nip'=>'198306302009121003','name'=>'IMAN SAEDIMAN, SH','jabatan'=>'Panitera Muda PN II'],

            // A6
            ['nip'=>'AUTO006','name'=>'ENDRASWORO GHURITNO, SH','jabatan'=>'Staf Administrasi'],

            // A7
            ['nip'=>'AUTO007','name'=>'IMAN KURNIAWAN, SE','jabatan'=>'Staf Administrasi'],

            // A8
            ['nip'=>'AUTO008','name'=>'ARMELIA NOVIYANTI, SH.','jabatan'=>'Staf Administrasi'],

            // A9
            ['nip'=>'199002282019031003','name'=>'KIKI FAUZI, S.E','jabatan'=>'Pengelola Perkara'],

            // A10
            ['nip'=>'AUTO010','name'=>'ERNA RACHMANIA, SE','jabatan'=>'Staf Administrasi'],

            // A11
            ['nip'=>'AUTO011','name'=>'MAMAN HENDARMAN, S.H.','jabatan'=>'Staf Administrasi'],

            // A12
            ['nip'=>'AUTO012','name'=>'DENI ANGGARAWATI, S.H.','jabatan'=>'Staf Administrasi'],

            // A13
            ['nip'=>'AUTO013','name'=>'DARYONO, SH','jabatan'=>'Staf Administrasi'],

            // A14
            ['nip'=>'AUTO014','name'=>'TATIK RUSMIATI','jabatan'=>'Staf Administrasi'],

            // A15
            ['nip'=>'AUTO015','name'=>'NURJAMAN','jabatan'=>'Staf Administrasi'],

            // A16
            ['nip'=>'AUTO016','name'=>'SUANDI','jabatan'=>'Staf Administrasi'],

            // A17
            ['nip'=>'AUTO017','name'=>'NURVIAN ZURYATI MONOARFA, S.Psi','jabatan'=>'Staf Administrasi'],

            // A18
            ['nip'=>'AUTO018','name'=>'DEDE ADI SUCIPTO','jabatan'=>'Staf Administrasi'],

            // A19
            ['nip'=>'AUTO019','name'=>'EKA YANA','jabatan'=>'Staf Administrasi'],

            // A20
            ['nip'=>'AUTO020','name'=>'IPAH DWI RAHMAWATI MIKASA','jabatan'=>'Staf Administrasi'],

            // A21
            ['nip'=>'AUTO021','name'=>'ARIF BUDI NUGROHO, S.H.','jabatan'=>'Staf Administrasi'],

            // A22
            ['nip'=>'AUTO022','name'=>'KIKI ANGELINA HUTASOIT, A.Md.','jabatan'=>'Staf Administrasi'],

            // A23
            ['nip'=>'AUTO023','name'=>'DEA ANGGRAINI','jabatan'=>'Staf Administrasi'],

            // A24
            ['nip'=>'AUTO024','name'=>'DZAKA DIRGANTARA, A.Md.','jabatan'=>'Staf Administrasi'],

            // A25
            ['nip'=>'AUTO025','name'=>'DADANG KUSNANDAR','jabatan'=>'Staf Administrasi'],

            // A26
            ['nip'=>'AUTO026','name'=>'YADI HERYANA, SH','jabatan'=>'Staf Administrasi'],

            // A27
            ['nip'=>'AUTO027','name'=>'EKA PURNAMA S.Kom','jabatan'=>'Staf IT'],

            // A28
            ['nip'=>'AUTO028','name'=>'HENDRA, S.Kom','jabatan'=>'Staf IT'],

            // A29
            ['nip'=>'AUTO029','name'=>'NOVINDA SITI ZAHRA, SE','jabatan'=>'Staf Administrasi'],

            // A30
            ['nip'=>'AUTO030','name'=>'INOVIA SANTA BLACIA SINAGA, A.Md.','jabatan'=>'Staf Administrasi'],

            // A31
            ['nip'=>'AUTO031','name'=>'NURFIRAHMAN','jabatan'=>'Staf Administrasi'],

            // A32
            ['nip'=>'AUTO032','name'=>'EVA YANTI NUR AHDININGSIH','jabatan'=>'Staf Administrasi'],

            // A33
            ['nip'=>'AUTO033','name'=>'SANUDIN','jabatan'=>'Staf Administrasi'],

            // A34
            ['nip'=>'AUTO034','name'=>'ENGKOS KOSASIH','jabatan'=>'Staf Administrasi'],
        ];

        foreach ($data as &$row) {
            $row['created_at'] = now();
            $row['updated_at'] = now();
        }

        DB::table('alternative')->insert($data);
    }
}