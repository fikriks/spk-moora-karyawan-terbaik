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
            // 🔑 Kunci pencarian (unique key)
            ['nip' => $row['nip']],

            // ✏️ Data yang diupdate / diinsert
            [
                'name'    => $row['name'],
                'jabatan' => $row['jabatan'] ?? null,
            ]
        );
    }
}