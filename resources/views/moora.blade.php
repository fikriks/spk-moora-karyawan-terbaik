<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan MOORA</title>

    <style>
    body {
        font-family: DejaVu Sans, sans-serif;
        font-size: 11px;
        color: #333;
        margin: 30px;
    }

    /* ===== Header ===== */
    .header {
        text-align: center;
        margin-bottom: 25px;
        border-bottom: 2px solid #2c7be5;
        padding-bottom: 10px;
    }

    .header h2 {
        margin: 0;
        font-size: 18px;
        letter-spacing: 1px;
    }

    .header p {
        margin: 4px 0 0;
        font-size: 11px;
        color: #666;
    }

    /* ===== Section Card ===== */
    .section {
        margin-bottom: 25px;
    }

    .section-title {
        background: #2c7be5;
        color: #fff;
        padding: 6px 10px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 8px;
    }

    /* ===== Table ===== */
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10.5px;
    }

    th,
    td {
        border: 1px solid #ccc;
        padding: 6px;
        text-align: center;
    }

    th {
        background: #f2f5f9;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background: #fafafa;
    }

    /* ===== Ranking Highlight ===== */
    .rank-1 {
        background: #e6f4ea;
        font-weight: bold;
    }

    .rank-1 td {
        border-color: #9bd3ae;
    }

    /* ===== Footer ===== */
    .footer {
        margin-top: 40px;
        font-size: 10px;
        text-align: right;
        color: #777;
    }
    </style>
</head>

<body>

    <!-- HEADER -->
    <div class="header">
        <h2>LAPORAN HASIL PERHITUNGAN METODE MOORA</h2>
        <p>Sistem Pendukung Keputusan</p>
    </div>

    <!-- 1. Matriks Keputusan -->
    <div class="section">
        <div class="section-title">1. Matriks Keputusan (X)</div>
        <table>
            <tr>
                <th>Alternatif</th>
                @foreach($criteria as $c)
                <th>{{ $c->code }}</th>
                @endforeach
            </tr>
            @foreach($decisionMatrix as $altId => $values)
            <tr>
                <td>{{ $alternatives[$altId]->name }}</td>
                @foreach($criteria as $c)
                <td>{{ $values[$c->id] ?? 0 }}</td>
                @endforeach
            </tr>
            @endforeach
        </table>
    </div>

    <!-- 2. Normalisasi -->
    <div class="section">
        <div class="section-title">2. Normalisasi Matriks (X*)</div>
        <table>
            <tr>
                <th>Alternatif</th>
                @foreach($criteria as $c)
                <th>{{ $c->code }}</th>
                @endforeach
            </tr>
            @foreach($normalization as $altId => $values)
            <tr>
                <td>{{ $alternatives[$altId]->name }}</td>
                @foreach($criteria as $c)
                <td>{{ number_format($values[$c->id] ?? 0, 6) }}</td>
                @endforeach
            </tr>
            @endforeach
        </table>
    </div>

    <!-- 3. Nilai Optimasi -->
    <div class="section">
        <div class="section-title">3. Nilai Optimasi (Yi)</div>
        <table>
            <tr>
                <th>Alternatif</th>
                <th>Nilai Yi</th>
            </tr>
            @foreach($optimization as $altId => $value)
            <tr>
                <td>{{ $alternatives[$altId]->name }}</td>
                <td>{{ number_format($value, 6) }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <!-- 4. Ranking -->
    <div class="section">
        <div class="section-title">4. Hasil Ranking Akhir</div>
        <table>
            <tr>
                <th>Peringkat</th>
                <th>Alternatif</th>
                <th>Skor</th>
            </tr>
            @foreach($ranking as $row)
            <tr class="{{ $row['rank'] == 1 ? 'rank-1' : '' }}">
                <td>{{ $row['rank'] }}</td>
                <td>{{ $alternatives[$row['alternative_id']]->name }}</td>
                <td>{{ number_format($row['score'], 6) }}</td>
            </tr>
            @endforeach
        </table>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        Dicetak pada {{ date('d-m-Y') }}
    </div>

</body>

</html>