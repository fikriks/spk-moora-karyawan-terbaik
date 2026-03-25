<?php

namespace App\Http\Controllers;

use App\Http\Requests\CriterionRequest;
use App\Models\Criterion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CriterionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = $request->string('q')->trim();
        $perPage = $request->integer('per_page', 10);

        $criteria = Criterion::query()
            ->when(
                $q->isNotEmpty(),
                fn ($query) => $query->where('name', 'like', "%{$q}%")
                    ->orWhere('code', 'like', "%{$q}%")
            )
            ->orderBy('order', 'asc')
            ->orderBy('id', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Criteria/Index', [
            'criteria' => $criteria,
            'filters' => $request->only(['q', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Criteria/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CriterionRequest $request)
    {
        $data = $request->validated();
        $criterion = Criterion::create($data);

        return redirect()->route('criteria.index')->with('success', 'Kriteria berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Criterion $criterion)
    {
        return Inertia::render('Criteria/Show', [
            'criterion' => $criterion,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Criterion $criterion)
    {
        return Inertia::render('Criteria/Edit', [
            'criterion' => $criterion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CriterionRequest $request, Criterion $criterion)
    {
        $criterion->update($request->validated());

        return redirect()->route('criteria.index')->with('success', 'Kriteria berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Criterion $criterion)
    {
        $criterion->delete();

        return redirect()->route('criteria.index')->with('success', 'Kriteria berhasil dihapus.');
    }
}
