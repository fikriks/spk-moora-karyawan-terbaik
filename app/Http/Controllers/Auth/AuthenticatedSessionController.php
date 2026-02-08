<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    // ambil intended (jika ada)
    $intended = session()->pull('url.intended');

    // jika ada intended, cek apakah intended mengarah ke area admin
    if ($intended) {
        $path = parse_url($intended, PHP_URL_PATH) ?: '';

        // jika intended menuju admin/* tetapi user bukan admin -> abaikan intended
            if (str_starts_with($path, '/admin') && auth()->user()?->hasRole('admin')) {
                $intended = null;
            }
    }

    // jika ada intended yang valid -> redirect ke intended
    if ($intended) {
        return redirect()->to($intended);
    }

    // jika user admin -> kirim ke admin
    if (auth()->user()?->hasRole('admin')) {
        return redirect()->route('admin.index');
    }elseif (auth()->user()?->hasRole('ketua_pengadilan')) {
        // jika user ketua -> kirim ke ketua
        return redirect()->route('ketua.index');
    }elseif (auth()->user()?->hasRole('kasubag_kepegawaian')) {
        // jika user kasubag -> kirim ke kasubag
        return redirect()->route('kasubag.index');
    }elseif (auth()->user()?->hasRole('penilai')) {
        // jika user penilai -> kirim ke penilai
        return redirect()->route('penilai.index');
    }elseif (auth()->user()?->hasRole('operator')) {
        // jika user operator -> kirim ke operator
        return redirect()->route('operator.index');
    }


    // default user biasa
    return redirect()->route('dashboard');
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}