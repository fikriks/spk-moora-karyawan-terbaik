<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\Admin\LeaveController as AdminLeaveController;
use App\Http\Controllers\CriterionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// group auth + verified (semua route di dalam memerlukan login)
Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard user biasa
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('criteria', CriterionController::class)->middleware('permission:manage criteria');

    /**
     * AREA ADMIN
     *
     * - Gunakan middleware 'role:admin' (spatie) untuk membatasi akses hanya untuk role admin.
     * - Untuk proteksi lebih granular (mis. manage users), kita tambahkan permission middleware
     *   pada resource users. Jika kamu ingin admin tetap bisa semua aksi, cukup pakai role:admin.
     */
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {

        Route::get('/', function () {
            return Inertia::render('Admin/Index');
        })->name('admin.index');

        // Jika semua action users hanya boleh dilakukan admin:
        // Route::resource('users', UserController::class);

        // Jika ingin proteksi lebih granular: admin tetap harus role admin,
        // tapi tiap aksi resource juga butuh permission 'manage users' (opsional).
        Route::resource('users', UserController::class)
            ->middleware(['permission:manage users']);
    });

});

// Profil personal (semua user terautentikasi)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';