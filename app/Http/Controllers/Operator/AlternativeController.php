<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlternativeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request$request)
    {
        $q = $request->string('q')->trim();
        $perPage = $request->integer('per_page', 10);

        $query = Alternative::query()
            ->when($q->isNotEmpty(), fn($qbuilder) => $qbuilder->where('name', 'like', "%{$q}%")
                ->orWhere('nip', 'like', "%{$q}%"));

        $alternatives = $query->orderBy('id')->orderBy('id','desc')->paginate($perPage)->withQueryString();

        return Inertia::render('Operator/Alternative/Index', [
            'alternatives' => $alternatives,
            'filters' => $request->only(['q','per_page']),
        ]);
        // return Inertia::render('Operator/Alternative/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Operator/Alternative/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|unique:alternative,nip',
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);
        // dd($validated);

        try {
            Alternative::create([
                'nip' => $validated['nip'],
                'name' => $validated['name'],
                'jabatan' => $validated['jabatan'],
            ]);
            return redirect()->route('operator.alternative.index')->with('success', 'Alternative berhasil ditambahkan.');
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
    public function edit(Alternative $alternative)
    {
        return Inertia::render('Operator/Alternative/Edit', [
            'alternative' => $alternative
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Alternative $alternative)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);
        if($request->nip !== $alternative->nip){
            $validated['nip'] = $request->validate([
                'nip' => 'required|unique:alternative,nip',
            ])['nip'];
        }else{
            $validated['nip'] = $alternative->nip;
        }
        try {
            $alternative->update([
                'nip' => $validated['nip'],
                'name' => $validated['name'],
                'jabatan' => $validated['jabatan'],
            ]);
            return redirect()->route('operator.alternative.index')->with('success', 'Alternative berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data.' . $e])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternative $alternative)
    {
        $alternative->delete();
        return redirect()->back()->with('success', 'Alternative berhasil dihapus');

    }
}