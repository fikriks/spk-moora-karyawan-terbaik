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
        $validated =$request->validate([
            'alternative_id' => 'required|exists:alternative,id',
            'criteria_id' => 'required|exists:criteria,id',
            'nilai' => 'required|numeric',
        ]);

        // dd($validated);

        try {
            Nilai::create([
                'alternative_id' => $validated['alternative_id'],
                'criteria_id' => $validated['criteria_id'],
                'value' => $validated['nilai'],
            ]);
            return redirect()->route('operator.nilai.index')->with('success', 'Nilai berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.' . $e])->withInput();
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
        // VALIDASI
        $validated = $request->validate([
            'alternative_id' => 'required|exists:alternative,id',
            'criteria_id'   => 'required|exists:criteria,id',
            'nilai'         => 'required|numeric',
        ]);
        // dd($validated);

        DB::beginTransaction();

        // CEK DUPLIKASI alternatif + kriteria (kecuali data ini)
        $exists = Nilai::where('alternative_id', $validated['alternative_id'])
            ->where('criteria_id', $validated['criteria_id'])
            ->where('id', '!=', $nilai->id)
            ->exists();

        if ($exists) {
            throw ValidationException::withMessages([
                'criteria_id' => 'Nilai untuk alternatif dan kriteria ini sudah ada.',
            ]);
        }

        // UPDATE
        $nilai->update([
            'alternative_id' => $validated['alternative_id'],
            'criteria_id'   => $validated['criteria_id'],
            'value'         => $validated['nilai'],
        ]);

        DB::commit();

        return redirect()
            ->route('operator.nilai.index')
            ->with('success', 'Nilai berhasil diperbarui');

    } catch (ValidationException $e) {
        DB::rollBack();
        throw $e; // biarkan Inertia handle error validasi

    } catch (\Throwable $e) {
        DB::rollBack();

        report($e); // log error

        return back()->withErrors([
            'error' => 'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.',
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