<table>
    <tr>
        <th>Peringkat</th>
        <th>Nama Pegawai</th>
        <th>Nilai Akhir</th>
    </tr>

    @forelse ($ranking as $row)
    <tr class="{{ ($row['rank'] ?? null) == 1 ? 'rank-1' : '' }}">
        <td>{{ $row['rank'] ?? '-' }}</td>
        <td>{{ $alternatives[$row['alternative_id']]->name ?? '-' }}</td>
        <td>{{ number_format($row['score'] ?? 0, 6) }}</td>
    </tr>
    @empty
    <tr>
        <td colspan="3">Data tidak tersedia</td>
    </tr>
    @endforelse
</table>