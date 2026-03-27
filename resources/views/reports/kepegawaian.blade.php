<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Laporan Penilaian Pegawai</title>
    <style>
    body {
        font-family: DejaVu Sans, sans-serif;
        font-size: 12px;
    }

    h1 {
        text-align: center;
        font-size: 16px;
        margin-bottom: 2px;
    }

    .sub {
        text-align: center;
        font-size: 11px;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 13px;
        margin-top: 18px;
        border-bottom: 1px solid #000;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 6px;
    }

    th,
    td {
        border: 1px solid #000;
        padding: 4px;
        text-align: center;
    }
    </style>
</head>

<body>

    <h1>LAPORAN HASIL PENILAIAN PEGAWAI</h1>
    <div class="sub">
        Metode MOORA<br>
        Tanggal: {{ $tanggal }}
    </div>

    <h2>Pendahuluan</h2>
    <p>
        Laporan ini disusun sebagai bahan pertimbangan Kasubag TU dalam pengambilan keputusan penilaian pegawai secara
        objektif dan terukur.
    </p>

    <div class="section">
        <div class="section-title">Matriks Keputusan</div>
        @include('reports.partials.decision-matrix')
    </div>

    <div class="section">
        <div class="section-title">Nilai Penyebut (√ΣX²)</div>
        @include('reports.partials.denominator')
    </div>

    <div class="section">
        <div class="section-title">Normalisasi Data</div>
        @include('reports.partials.normalization')
    </div>

    <div class="section">
        <div class="section-title">Nilai Optimasi</div>
        @include('reports.partials.optimization')
    </div>

    <div class="section">
        <div class="section-title">Hasil Akhir dan Peringkat Pegawai</div>
        @include('reports.partials.ranking')
    </div>


    <br><br>

    <table width="100%" style="border:none">
        <tr>
            <td style="border:none"></td>
            <td style="border:none" align="center">
                Kasubag TU<br><br><br><br>
                <strong>( ____________________ )</strong>
            </td>
        </tr>
    </table>

</body>

</html>