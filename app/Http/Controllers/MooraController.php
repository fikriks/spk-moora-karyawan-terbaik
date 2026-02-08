<?php

namespace App\Http\Controllers;

use App\Models\MooraSteps;
use App\Services\MooraService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MooraController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Proses/Index');
    }
    public function process()
    {
        // jalankan perhitungan MOORA
        $steps = app(MooraService::class)->process();

        // simpan ke session / cache
        session(['moora_steps' => $steps]);

        return redirect()->route('moora.result');
    }
    public function result()
    {
        return Inertia::render('Admin/Proses/Result', [
            'steps' => MooraSteps::all()
        ]);
    }
}