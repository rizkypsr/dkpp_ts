<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\MonevRenaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class MonevRenaksiController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $dataMonevRenaksi = MonevRenaksi::paginate(10);

        return Inertia::render('DataMonevRenaksi/Index', [
            'dataMonevRenaksi' => $dataMonevRenaksi,
        ]);
    }

    /** Show the form for creating a new resource. */
    public function create()
    {

    }

    /** Store a newly created resource in storage. */
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
            MonevRenaksi::create($validated);

            return to_route('data-laporan-monev-renaksi.index')->with('success', 'Data berhasil ditambahkan');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /** Display the specified resource. */
    public function show(string $id)
    {

    }

    /** Show the form for editing the specified resource. */
    public function edit(string $id)
    {

    }

    /** Update the specified resource in storage. */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'kinerja' => 'required',
            'indikator' => 'required',
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'indikator.required' => 'Indikator harus diisi',
        ]);

        try {
            $monevRenaksi = MonevRenaksi::findOrFail($id);

            $monevRenaksi->update($validated);

            return to_route('data-laporan-monev-renaksi.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /** Remove the specified resource from storage. */
    public function destroy(string $id)
    {
        try {
            $monevRenaksi = MonevRenaksi::findOrFail($id);

            $monevRenaksi->destroy($id);

            return to_route('data-laporan-monev-renaksi.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
