<table>
    <tr>
        <th>Alternatif</th>
        <th>Nilai Akhir (Yi)</th>
    </tr>

    @forelse ($optimization as $altId => $value)
    <tr>
        <td>{{ $alternatives[$altId]->name ?? '-' }}</td>
        <td>{{ number_format($value, 6) }}</td>
    </tr>
    @empty
    <tr>
        <td colspan="2">Data tidak tersedia</td>
    </tr>
    @endforelse
</table>