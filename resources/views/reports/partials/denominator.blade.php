<!-- 2. Nilai Penyebut -->
<div class="section">
    <table>
        <tr>
            @foreach($criteria as $c)
            <th>{{ $c->code }}</th>
            @endforeach
        </tr>
        <tr>
            @foreach($criteria as $c)
            <td>
                {{ number_format($denominator[$c->id] ?? 0, 6) }}
            </td>
            @endforeach
        </tr>
    </table>
</div>