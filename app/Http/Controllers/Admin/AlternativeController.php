<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlternativeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $q = $request->string('q')->trim();
    $perPage = $request->integer('per_page', 10);

    $alternatives = Alternative::query()
        ->when(
            $q->isNotEmpty(),
            fn ($query) =>
                $query->where('name', 'like', "%{$q}%")
                      ->orWhere('nip', 'like', "%{$q}%")
        )
        ->orderBy('id', 'desc')
        ->paginate($perPage)
        ->withQueryString();

    return Inertia::render('Admin/Alternative/Index', [
        'alternatives' => $alternatives,
        'filters' => $request->only(['q', 'per_page']),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        // return Inertia::render('Admin/Alternative/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}