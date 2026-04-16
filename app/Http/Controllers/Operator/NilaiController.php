<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Models\Criterion;
use App\Models\Nilai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $q = $request->string('q')->trim();
    $perPage = $request->integer('per_page', 10);

    $query = Nilai::with([
            'alternative:id,name',
            'criteria:id,name'
        ])
        ->when(
            $q->isNotEmpty(),
            function ($qb) use ($q) {
                $qb->whereHas('alternative', function ($sub) use ($q) {
                    $sub->where('name', 'like', "%{$q}%");
                })
                ->orWhereHas('criteria', function ($sub) use ($q) {
                    $sub->where('name', 'like', "%{$q}%");
                });
            }
        );

    $nilai = $query
        ->orderByDesc('id')
        ->paginate($perPage)
        ->withQueryString();

    return Inertia::render('Operator/Nilai/Index', [
        'nilaiAlternatives' => $nilai,
        'filters' => $request->only(['q', 'per_page']),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
    return Inertia::render('Operator/Nilai/Create', [
        'alternatifs' => Alternative::select('id', 'name')->get(),
        'kriterias' => Criterion::select('id', 'name')->get(),
    ]);
}


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alternative_id' => 'required|exists:alternative,id',
            'scores'         => 'required|array',
            'scores.*'       => 'nullable|numeric',
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['scores'] as $criteriaId => $value) {
                if ($value === null || $value === '') continue;

                Nilai::updateOrCreate(
                    [
                        'alternative_id' => $validated['alternative_id'],
                        'criteria_id'    => $criteriaId,
                    ],
                    [
                        'value' => $value,
                    ]
                );
            }

            DB::commit();

            return redirect()->route('operator.nilai.index')->with('success', 'Nilai berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()])->withInput();
        }
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
   public function edit(Nilai $nilai)
{
    $nilai->load([
        'alternative:id,name',
        'criteria:id,name'
    ]);
    // dd($nilai);

    return Inertia::render('Operator/Nilai/Edit', [
        'nilai' => $nilai,
        'alternatifs' => Alternative::select('id', 'name')->get(),
        'kriterias' => Criterion::select('id', 'name')->get(),
    ]);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Nilai $nilai)
{
    try {
        $validated = $request->validate([
            'alternative_id' => 'required|exists:alternative,id',
            'scores'         => 'required|array',
            'scores.*'       => 'nullable|numeric',
        ]);

        DB::beginTransaction();

        foreach ($validated['scores'] as $criteriaId => $value) {
            if ($value === null || $value === '') continue;

            Nilai::updateOrCreate(
                [
                    'alternative_id' => $validated['alternative_id'],
                    'criteria_id'    => $criteriaId,
                ],
                [
                    'value' => $value,
                ]
            );
        }

        DB::commit();

        return redirect()
            ->route('operator.nilai.index')
            ->with('success', 'Nilai berhasil diperbarui');

    } catch (ValidationException $e) {
        DB::rollBack();
        throw $e;
    } catch (\Throwable $e) {
        DB::rollBack();
        report($e);
        return back()->withErrors([
            'error' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage(),
        ]);
    }
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Nilai $nilai)
{
    try {
        DB::beginTransaction();

        $nilai->delete();

        DB::commit();

        return redirect()
            ->route('operator.nilai.index')
            ->with('success', 'Nilai berhasil dihapus');

    } catch (\Throwable $e) {
        DB::rollBack();

        report($e); // log error

        return back()->withErrors([
            'error' => 'Terjadi kesalahan saat menghapus data. Silakan coba lagi.',
        ]);
    }
}
}