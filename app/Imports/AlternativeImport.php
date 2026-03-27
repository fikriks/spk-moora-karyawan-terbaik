<?php

namespace App\Imports;

use App\Models\Alternative;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class AlternativeImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        // Skip baris kosong
        if (
            empty($row['nip']) ||
            empty($row['name'])
        ) {
            return null;
        }

        return Alternative::updateOrCreate(
            ['nip' => $row['nip']],
            [
                'name' => $row['name'],
                'jabatan' => $row['jabatan'] ?? null,
                'golongan' => $row['golongan'] ?? null,
                'jenis_ketenagakerjaan' => $row['jenis_ketenagakerjaan'] ?? null,
            ]
        );
    }
}
