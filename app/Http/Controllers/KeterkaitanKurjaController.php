<?php

namespace App\Http\Controllers;

use App\Models\KeterkaitanKurja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeterkaitanKurjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $dataKeterkaitanKurja = KeterkaitanKurja::where('data_laporan_kurja_id', $id)->paginate(10);

        return Inertia::render('DataKurja/KeterkaitanKurja/Index', [
            'kurjaId' => $id,
            'dataKeterkaitanKurja' => $dataKeterkaitanKurja
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
    public function store(Request $request, string $id)
    {
        $validated = $request->validate([
            'program' => 'required|string|max:255',
            'anggaran' => 'required|numeric',
            'realisasi_rupiah' => 'required|numeric',
            'realisasi_persentase' => 'required|numeric',
        ], [
            'program.required' => 'Program harus diisi',
            'program.max' => 'Program maksimal 255 karakter',
            'anggaran.required' => 'Anggaran harus diisi',
            'realisasi_rupiah.required' => 'Realisasi (Rupiah) harus diisi',
            'realisasi_persentase.required' => 'Realisasi (Persen) harus diisi',
        ]);

        try {
            KeterkaitanKurja::create([
                'data_laporan_kurja_id' => $id,
                'program' => $validated['program'],
                'anggaran' => $validated['anggaran'],
                'realisasi_rupiah' => $validated['realisasi_rupiah'],
                'realisasi_persentase' => $validated['realisasi_persentase'],
            ]);

            return to_route('data-laporan-kurja.keterkaitan-kurja.index', $id)->with('success', 'Data berhasil ditambahkan');
        } catch (\Exception $e) {
            dd($e);
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
    public function update(Request $request, string $kurjaId, string $keterkaitanKurjaId)
    {
        $validated = $request->validate([
            'program' => 'required|string|max:255',
            'anggaran' => 'required|numeric',
            'realisasi_rupiah' => 'required|numeric',
            'realisasi_persentase' => 'required|numeric',
        ], [
            'program.required' => 'Program harus diisi',
            'program.max' => 'Program maksimal 255 karakter',
            'anggaran.required' => 'Anggaran harus diisi',
            'realisasi_rupiah.required' => 'Realisasi (Rupiah) harus diisi',
            'realisasi_persentase.required' => 'Realisasi (Persen) harus diisi',
        ]);

        try {

            $keterkaitanKurja = KeterkaitanKurja::find($keterkaitanKurjaId);

            $keterkaitanKurja->update($validated);

            return to_route('data-laporan-kurja.keterkaitan-kurja.index', $kurjaId)->with('success', 'Data berhasil ditambahkan');
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
    public function destroy(string $kurjaId, string $ketekaitanKurjaId)
    {
        try {
            $keterkaitanKurja = KeterkaitanKurja::findOrFail($ketekaitanKurjaId);

            $keterkaitanKurja->delete();

            return to_route('data-laporan-kurja.keterkaitan-kurja.index', $kurjaId)->with('success', 'Data berhasil diubah');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
