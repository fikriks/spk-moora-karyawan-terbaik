<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->route('admin.index');
        } elseif ($user->hasRole('ketua_pengadilan')) {
            return redirect()->route('ketua.index');
        } elseif ($user->hasRole('kasubag_kepegawaian')) {
            return redirect()->route('kasubag.index');
        } elseif ($user->hasRole('penilai')) {
            return redirect()->route('penilai.index');
        } elseif ($user->hasRole('operator')) {
            return redirect()->route('operator.index');
        }

        return redirect()->intended(route('dashboard', absolute: false));
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
