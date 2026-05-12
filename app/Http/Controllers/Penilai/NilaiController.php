<?php

namespace App\Http\Controllers\Penilai;

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

        // Ambil kriteria untuk header tabel
        $kriterias = Criterion::orderBy('id')->get();

        // Query Alternatif yang memiliki nilai (atau semua alternatif jika ingin matrix penuh)
        // Kita gunakan Alternatif sebagai base agar bisa grouping per orang
        $query = Alternative::with(['nilais.criteria'])
            ->when(
                $q->isNotEmpty(),
                function ($qb) use ($q) {
                    $qb->where('name', 'like', "%{$q}%");
                }
            );

        $alternatifs = $query
            ->orderBy('name')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('Penilai/Nilai/Index', [
            'alternatifs' => $alternatifs,
            'kriterias' => $kriterias,
            'filters' => $request->only(['q', 'per_page']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Penilai/Nilai/Create', [
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

        try {
            DB::beginTransaction();

            Nilai::updateOrCreate(
                [
                    'alternative_id' => $validated['alternative_id'],
                    'criteria_id'    => $validated['criteria_id'],
                ],
                [
                    'value' => $validated['nilai'],
                ]
            );

            DB::commit();

            return redirect()
                ->route('penilai.nilai.index')
                ->with('success', 'Nilai berhasil disimpan.');

        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan: ' . $e->getMessage())
                ->withInput();
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
    public function edit($id)
    {
        $alternative = Alternative::with('nilais')->findOrFail($id);
        
        return Inertia::render('Penilai/Nilai/Edit', [
            'alternative' => $alternative,
            'alternatifs' => Alternative::select('id', 'name')->get(),
            'kriterias'   => Criterion::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'scores'   => 'required|array',
            'scores.*' => 'nullable|numeric',
        ]);

        try {
            DB::beginTransaction();

            foreach ($validated['scores'] as $criteriaId => $value) {
                if ($value === null || $value === '') continue;

                Nilai::updateOrCreate(
                    [
                        'alternative_id' => $id,
                        'criteria_id'    => $criteriaId,
                    ],
                    [
                        'value' => $value,
                    ]
                );
            }

            DB::commit();

            return redirect()
                ->route('penilai.nilai.index')
                ->with('success', 'Nilai berhasil diperbarui.');

        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            // Jika dipanggil dari index baru (grouping), $id adalah alternative_id
            // Kita hapus semua nilai untuk alternatif tersebut
            Nilai::where('alternative_id', $id)->delete();

            DB::commit();

            return redirect()
                ->route('penilai.nilai.index')
                ->with('success', 'Seluruh nilai alternatif berhasil dihapus.');

        } catch (\Exception $e) {
            DB::rollBack();
            report($e);
            return redirect()
                ->back()
                ->with('error', 'Terjadi kesalahan saat menghapus data.');
        }
    }
}