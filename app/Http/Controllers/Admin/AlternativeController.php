<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Alternative;
use App\Imports\AlternativeImport;
use App\Exports\AlternativeTemplateExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

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
        return Inertia::render('Admin/Alternative/Create');
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
            'golongan' => 'nullable|string|max:50',
            'jenis_ketenagakerjaan' => 'nullable|string|max:255',
        ]);

        try {
            Alternative::create([
                'nip' => $validated['nip'],
                'name' => $validated['name'],
                'jabatan' => $validated['jabatan'],
                'golongan' => $validated['golongan'] ?? null,
                'jenis_ketenagakerjaan' => $validated['jenis_ketenagakerjaan'] ?? null,
            ]);

            return redirect()->route('admin.alternative.index')->with('success', 'Alternative berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data.'.$e->getMessage()])->withInput();
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
        return Inertia::render('Admin/Alternative/Edit', [
            'alternative' => $alternative,
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
            'golongan' => 'nullable|string|max:50',
            'jenis_ketenagakerjaan' => 'nullable|string|max:255',
        ]);

        if ($request->nip !== $alternative->nip) {
            $validated['nip'] = $request->validate([
                'nip' => 'required|unique:alternative,nip',
            ])['nip'];
        } else {
            $validated['nip'] = $alternative->nip;
        }

        try {
            $alternative->update([
                'nip' => $validated['nip'],
                'name' => $validated['name'],
                'jabatan' => $validated['jabatan'],
                'golongan' => $validated['golongan'] ?? null,
                'jenis_ketenagakerjaan' => $validated['jenis_ketenagakerjaan'] ?? null,
            ]);

            return redirect()->route('admin.alternative.index')->with('success', 'Alternative berhasil diperbarui.');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui data.'.$e->getMessage()])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Alternative $alternative)
    {
        try {
            $alternative->delete();
            return redirect()->route('admin.alternative.index')->with('success', 'Alternative berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal menghapus data.');
        }
    }

    /**
     * DOWNLOAD TEMPLATE DINAMIS
     */
    public function downloadTemplate()
    {
        $export = new AlternativeTemplateExport;
        $fileName = 'template-alternative-' . time() . '.xlsx';
        $tempPath = 'temp/' . $fileName;
        
        // Simpan ke disk local (default Laravel 12 di app/private)
        Excel::store($export, $tempPath, 'local');

        // Ambil path lengkap file yang baru disimpan
        $fullPath = storage_path('app/private/' . $tempPath);

        return response()->download($fullPath)->deleteFileAfterSend(true);
    }

    /**
     * IMPORT EXCEL
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => ['required', 'mimes:xlsx,xls'],
        ]);

        try {
            Excel::import(
                new AlternativeImport,
                $request->file('file')
            );

            return back()->with('success', 'Import alternative berhasil');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengimport data: ' . $e->getMessage()]);
        }
    }
}