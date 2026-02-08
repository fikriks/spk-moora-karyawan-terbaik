<table>
    <tr>
        <th>Alternatif</th>
        @foreach ($criteria as $c)
        <th>{{ $c->code }}</th>
        @endforeach
    </tr>

    @forelse ($decisionMatrix as $altId => $values)
    <tr>
        <td>{{ $alternatives[$altId]->name ?? '-' }}</td>
        @foreach ($criteria as $c)
        <td>{{ $values[$c->id] ?? 0 }}</td>
        @endforeach
    </tr>
    @empty
    <tr>
        <td colspan="{{ $criteria->count() + 1 }}">
            Data tidak tersedia
        </td>
    </tr>
    @endforelse
</table>