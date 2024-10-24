<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Kurja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class KurjaController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $dataKurja = Kurja::paginate(10);

        return Inertia::render('DataKurja/Index', [
            'dataKurja' => $dataKurja,
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
            'kinerja' => 'required|string|max:255',
            'indikator' => 'required|string|max:255',
            'target' => 'required|string|max:255',
            'realisasi' => 'required|string|max:255',
            'capaian' => 'required|numeric',
            'penjelasan' => 'required',
            'alternatif' => 'required',
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'kinerja.max' => 'Kinerja maksimal 255 karakter',
            'indikator.required' => 'Indikator harus diisi',
            'indikator.max' => 'Indikator maksimal 255 karakter',
            'target.required' => 'Target harus diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi harus diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian harus diisi',
            'penjelasan.required' => 'Penjelasan harus diisi',
            'alternatif.required' => 'Alternatif harus diisi',
        ]);

        try {
            Kurja::create($validated);

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil ditambahkan');
        } catch (Exception $e) {
            dd($e);

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
            'kinerja' => 'required|string|max:255',
            'indikator' => 'required|string|max:255',
            'target' => 'required|string|max:255',
            'realisasi' => 'required|string|max:255',
            'capaian' => 'required|numeric',
            'penjelasan' => 'required',
            'alternatif' => 'required',
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'kinerja.max' => 'Kinerja maksimal 255 karakter',
            'indikator.required' => 'Indikator harus diisi',
            'indikator.max' => 'Indikator maksimal 255 karakter',
            'target.required' => 'Target harus diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi harus diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian harus diisi',
            'penjelasan.required' => 'Penjelasan harus diisi',
            'alternatif.required' => 'Alternatif harus diisi',
        ]);

        try {

            $kurja = Kurja::findOrFail($id);

            $kurja->update($validated);

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            dd($e);

            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /** Remove the specified resource from storage. */
    public function destroy(string $id)
    {
        try {
            $kurja = Kurja::findOrFail($id);

            $kurja->destroy($id);

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
