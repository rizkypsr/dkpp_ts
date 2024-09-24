<?php

namespace App\Http\Controllers;

use App\Models\MonevRenaksi;
use App\Models\RencanaAksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RencanaAksiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $dataRencanaAksi = RencanaAksi::with(['feedbackBy'])->where('data_laporan_monev_renaksi_id', $id)->paginate(10);

        return Inertia::render('DataMonevRenaksi/RencanaAksi/Index', [
            'monevRenaksiId' => $id,
            'dataRencanaAksi' => $dataRencanaAksi,
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
            'rencana_aksi' => 'required|string|max:255',
            'target' => 'required|string|max:255',
            'realisasi' => 'required|string|max:255',
            'capaian' => 'required|numeric',
            'catatan' => 'required|string',
            'tindak_lanjut' => 'required|string',
            'bukti_pendukung' => 'nullable|file|max:5120'
        ], [
            'rencana_aksi.required' => 'Rencana aksi harus diisi',
            'rencana_aksi.max' => 'Rencana aksi maksimal 255 karakter',
            'target.required' => 'Target harus diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi harus diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian harus diisi',
            'capaian.numeric' => 'Capaian harus berupa angka',
            'catatan.required' => 'Catatan harus diisi',
            'tindak_lanjut.required' => 'Tindak lanjut harus diisi',
            'bukti_pendukung.file' => 'Bukti pendukung harus berupa file',
            'bukti_pendukung.max' => 'Bukti pendukung maksimal 5MB',
        ]);

        try {
            $filePath = null;

            if ($request->hasFile('bukti_pendukung')) {
                $bukti_pendukung = $request->file('bukti_pendukung');
                $fileName = time() . '_' . $bukti_pendukung->getClientOriginalName();
                $filePath = $bukti_pendukung->storeAs('rencana-aksi', $fileName, 'public');
            }

            RencanaAksi::create([
                'data_laporan_monev_renaksi_id' => $id,
                'rencana_aksi' => $validated['rencana_aksi'],
                'target' => $validated['target'],
                'realisasi' => $validated['realisasi'],
                'capaian' => $validated['capaian'],
                'catatan' => $validated['catatan'],
                'tindak_lanjut' => $validated['tindak_lanjut'],
                'bukti_pendukung' => $filePath,
            ]);

            return to_route('data-laporan-monev-renaksi.rencana-aksi.index', $id)->with('success', 'Data berhasil ditambahkan');
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

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $monevRenaksiId, string $rencanaAksiId)
    {
        try {
            $monevRenaksi = MonevRenaksi::findOrFail($monevRenaksiId);
            $rencanaAksi = RencanaAksi::findOrFail($rencanaAksiId);

            return Inertia::render('DataMonevRenaksi/RencanaAksi/Feedback', [
                'monevRenaksi' => $monevRenaksi,
                'rencanaAksi' => $rencanaAksi,
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $monevRenaksiId, string $rencanaAksiId)
    {
        $validated = $request->validate([
            'rencana_aksi' => 'string|max:255',
            'target' => 'string|max:255',
            'realisasi' => 'string|max:255',
            'capaian' => 'numeric',
            'catatan' => 'string',
            'tindak_lanjut' => 'string',
            'bukti_pendukung' => 'nullable|file|max:5120',
            'feedback' => 'string',
        ], [
            'rencana_aksi.required' => 'Rencana aksi harus diisi',
            'rencana_aksi.max' => 'Rencana aksi maksimal 255 karakter',
            'target.required' => 'Target harus diisi',
            'target.max' => 'Target maksimal 255 karakter',
            'realisasi.required' => 'Realisasi harus diisi',
            'realisasi.max' => 'Realisasi maksimal 255 karakter',
            'capaian.required' => 'Capaian harus diisi',
            'capaian.numeric' => 'Capaian harus berupa angka',
            'catatan.required' => 'Catatan harus diisi',
            'tindak_lanjut.required' => 'Tindak lanjut harus diisi',
            'bukti_pendukung.file' => 'Bukti pendukung harus berupa file',
            'bukti_pendukung.max' => 'Bukti pendukung maksimal 5MB',
        ]);

        try {
            if ($request->feedback) {
                $validated['feedback_by'] = auth()->user()->id;
            }

            $rencanaAksi = RencanaAksi::findOrFail($rencanaAksiId);

            $filePath = null;

            if ($request->hasFile('bukti_pendukung')) {
                $bukti_pendukung = $request->file('bukti_pendukung');
                $fileName = time() . '_' . $bukti_pendukung->getClientOriginalName();
                $filePath = $bukti_pendukung->storeAs('rencana-aksi', $fileName, 'public');

                if ($rencanaAksi->bukti_pendukung) {
                    Storage::delete($rencanaAksi->bukti_pendukung);
                }

                $validated['bukti_pendukung'] = $filePath ?? $rencanaAksi->bukti_pendukung;
            }

            $rencanaAksi->update($validated);

            return to_route('data-laporan-monev-renaksi.rencana-aksi.index', $monevRenaksiId)
                ->with('success', 'Data berhasil ditambahkan');
        } catch (\Exception $e) {
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
        //
    }
}
