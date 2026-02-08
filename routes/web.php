<?php

use App\Http\Controllers\Admin\AlternativeController as AdminAlternativeController;
use App\Http\Controllers\Admin\DashboardController as DashboardAdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\Admin\LeaveController as AdminLeaveController;
use App\Http\Controllers\CriterionController;
use App\Http\Controllers\Operator\DashboardController as DashboardOperatorController;
use App\Http\Controllers\Penilai\DashboardController as DashboardPenilaiController;
use App\Http\Controllers\Kasubag\DashboardController as DashboardKasubagController;
use App\Http\Controllers\Kasubag\LaporanController;
use App\Http\Controllers\Ketua\DashboardController as DashboardKetuaController;
use App\Http\Controllers\Operator\AlternativeController;
use App\Http\Controllers\Operator\NilaiController;
use App\Http\Controllers\Kasubag\NilaiController as KasubagNilaiController;
use App\Http\Controllers\Ketua\LaporanController as KetuaLaporanController;
use App\Http\Controllers\Ketua\NilaiController as KetuaNilaiController;
use App\Http\Controllers\MooraController;
use App\Http\Controllers\MooraReportController;
use App\Http\Controllers\Penilai\NilaiController as PenilaiNilaiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

// group auth + verified (semua route di dalam memerlukan login)
Route::middleware(['auth'])->group(function () {

    // Dashboard user biasa
    // Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->name('dashboard');

    Route::resource('criteria', CriterionController::class)->middleware('permission:manage criteria');

    /**
     * AREA ADMIN
     *
     * - Gunakan middleware 'role:admin' (spatie) untuk membatasi akses hanya untuk role admin.
     * - Untuk proteksi lebih granular (mis. manage users), kita tambahkan permission middleware
     *   pada resource users. Jika kamu ingin admin tetap bisa semua aksi, cukup pakai role:admin.
     */
    Route::middleware(['role:operator'])->prefix('operator')->group(function () {

        Route::get('/', [DashboardOperatorController::class, 'index'])->name('operator.index');
        Route::resource('/alternative', AlternativeController::class)->names('operator.alternative');
        Route::post('/import', [AlternativeController::class, 'import'])->name('operator.alternative.import');
        Route::get('/template', [AlternativeController::class, 'downloadTemplate'])->name('operator.alternative.template');
        Route::resource('/nilai', NilaiController::class)->names('operator.nilai');
    });

    Route::middleware(['role:penilai'])->prefix('penilai')->group(function () {

        Route::get('/', [DashboardPenilaiController::class, 'index'])->name('penilai.index');
        Route::resource('/nilai', PenilaiNilaiController::class)->names('penilai.nilai');
    });

    Route::middleware(['role:kasubag_kepegawaian'])->prefix('kasubag')->group(function () {

        Route::get('/', [DashboardKasubagController::class, 'index'])->name('kasubag.index');
        Route::resource('/nilai', KasubagNilaiController::class)->names('kasubag.nilai');
        Route::get('/laporan', [LaporanController::class, 'index'])->name('kasubag.laporan.index');
        Route::get('/laporan/penilaian-pegawai/pdf', [LaporanController::class, 'exportPdf'])
        ->name('laporan.kepegawaian.pdf');
    });

    Route::middleware(['role:ketua_pengadilan'])->prefix('ketua')->group(function () {

        Route::get('/', [DashboardKetuaController::class, 'index'])->name('ketua.index');
        Route::resource('/nilai', KetuaNilaiController::class)->names('ketua.nilai');
        Route::get('/laporan', [KetuaLaporanController::class, 'index'])->name('ketua.laporan.index');
        Route::get('/laporan/ketua-pengadilan/pdf', [KetuaLaporanController::class, 'exportPdf'])
        ->name('laporan.ketua-pengadilan.pdf');
    });
    
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {

        Route::get('/', [DashboardAdminController::class, 'index'])->name('admin.index');

        // Jika semua action users hanya boleh dilakukan admin:
        // Route::resource('users', UserController::class);

        // Jika ingin proteksi lebih granular: admin tetap harus role admin,
        // tapi tiap aksi resource juga butuh permission 'manage users' (opsional).
        Route::resource('users', UserController::class)
            ->middleware(['permission:manage users']);
        Route::resource('alternative', AdminAlternativeController::class)->names('admin.alternative');
        // halaman tombol / index
    Route::get('/moora', [MooraController::class, 'index'])
        ->name('moora.index');

    // EKSEKUSI PERHITUNGAN
    Route::post('/moora/process', [MooraController::class, 'process'])
        ->name('moora.process');

    // TAMPIL HASIL
    Route::get('/moora/result', [MooraController::class, 'result'])
        ->name('moora.result');
        Route::get('/moora/report/pdf', [MooraReportController::class, 'export'])
    ->name('moora.report.pdf');


    });

});

// Profil personal (semua user terautentikasi)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';