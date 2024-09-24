<?php

namespace App\Http\Controllers;

use App\Models\Renaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DataRenaksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataRenaksi = Renaksi::paginate(10);

        return Inertia::render('DataRenaksi/Index', [
            'dataRenaksi' => $dataRenaksi,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'kinerja' => 'required',
            'indikator' => 'required',
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'indikator.required' => 'Indikator harus diisi',
        ]);

        try {
            Renaksi::create($validated);

            return redirect()->back()->with('success', 'Data berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'kinerja' => 'required',
            'indikator' => 'required',
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'indikator.required' => 'Indikator harus diisi',
        ]);

        $renaksi = Renaksi::findOrFail($id);

        try {
            $renaksi->update($validated);

            return redirect()->back()->with('success', 'Data berhasil diubah');
        } catch (\Exception $e) {
            dd($e);
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $renaksi = Renaksi::findOrFail($id);

            $renaksi->destroy($id);

            return redirect()->back()->with('success', 'Data berhasil dihapus');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
