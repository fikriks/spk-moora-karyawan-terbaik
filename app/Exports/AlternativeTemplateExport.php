<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\Exportable;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class AlternativeTemplateExport implements FromArray, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    use Exportable;

    public function array(): array
    {
        return [
            [
                '199001012020011001',
                'Nama Pegawai Contoh',
                'Staff Administrasi',
                'III/a',
                'Tenaga Umum'
            ],
        ];
    }

    public function headings(): array
    {
        return [
            'nip',
            'name',
            'jabatan',
            'golongan',
            'jenis_ketenagakerjaan'
        ];
    }

    public function title(): string
    {
        return 'Template Import Pegawai';
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold
            1    => ['font' => ['bold' => true]],
        ];
    }
}
