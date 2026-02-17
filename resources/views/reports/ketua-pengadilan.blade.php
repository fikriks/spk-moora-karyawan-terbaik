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
        text-transform: uppercase;
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
        Disampaikan kepada Ketua Pengadilan<br>
        Metode Multi-Objective Optimization on the Basis of Ratio Analysis (MOORA)<br>
        Tanggal: {{ $tanggal }}
    </div>

    <h2>Pendahuluan</h2>
    <p style="text-align: justify;">
        Laporan ini disusun sebagai bahan pertimbangan Ketua Pengadilan
        dalam rangka pelaksanaan fungsi pembinaan, pengawasan, serta
        pengambilan keputusan manajerial terhadap kinerja pegawai.
        Penilaian dilakukan secara objektif dan terukur berdasarkan
        kriteria yang telah ditetapkan.
    </p>

    <h2>Data Penilaian Pegawai</h2>
    @include('reports.partials.decision-matrix')

    <h2>Nilai Penyebut (√ΣX²)</h2>
    @include('reports.partials.denominator')

    <h2>Normalisasi Data Penilaian</h2>
    @include('reports.partials.normalization')

    <h2>Hasil Perhitungan Nilai Akhir</h2>
    @include('reports.partials.optimization')

    <h2>Hasil Akhir dan Peringkat Pegawai</h2>
    @include('reports.partials.ranking')

    <br><br>

    <table width="100%" style="border:none">
        <tr>
            <td style="border:none"></td>
            <td style="border:none" align="center">
                Ketua Pengadilan<br><br><br><br>
                <strong>( ____________________ )</strong>
            </td>
        </tr>
    </table>

</body>

</html>