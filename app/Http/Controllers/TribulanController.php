<?php

namespace App\Http\Controllers;

use App\Models\DataMaster;
use App\Models\DataMasterPenilaianJabatan;
use App\Models\Tribulan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TribulanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $tribulan1 = Tribulan::with(['feedbackBy'])->where('data_laporan_renaksi_id', $id)->where('tribulan', 1)->paginate(5);
        $tribulan2 = Tribulan::with(['feedbackBy'])->where('data_laporan_renaksi_id', $id)->where('tribulan', 2)->paginate(5);
        $tribulan3 = Tribulan::with(['feedbackBy'])->where('data_laporan_renaksi_id', $id)->where('tribulan', 3)->paginate(5);
        $tribulan4 = Tribulan::with(['feedbackBy'])->where('data_laporan_renaksi_id', $id)->where('tribulan', 4)->paginate(5);

        return Inertia::render('DataRenaksi/Tribulan/Index', [
            'renaksiId' => $id,
            'tribulan1' => $tribulan1,
            'tribulan2' => $tribulan2,
            'tribulan3' => $tribulan3,
            'tribulan4' => $tribulan4,
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
            'tribulan' => 'required|integer',
            'rencana_aksi' => 'required|string',
            'target' => 'required|string',
        ], [
            'tribulan.required' => 'Tribulan harus diisi',
            'rencana_aksi.required' => 'Rencana aksi harus diisi',
            'target.required' => 'Target harus diisi',
        ]);

        try {
            Tribulan::create([
                'tribulan' => $validated['tribulan'],
                'rencana_aksi' => $validated['rencana_aksi'],
                'target' => $validated['target'],
                'data_laporan_renaksi_id' => $id,
            ]);

            return redirect()->back()->with('success', 'Data berhasil ditambahkan');

        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $renaksiId, string $tribulanId)
    {
        try {
            $tribulan = Tribulan::with(['creator', 'creator.jabatan'])->findOrFail($tribulanId);
            $canFeedback = DataMasterPenilaianJabatan::canFeedback(auth()->user()->id, $tribulan->creator->jabatan_id);

            return Inertia::render('DataRenaksi/Tribulan/Feedback', [
                'tribulan' => $tribulan,
                'canFeedback' => $canFeedback,
            ]);

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
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
    public function update(Request $request, string $renaksiId, string $tribulanId)
    {
        $validated = $request->validate([
            'tribulan' => 'integer',
            'rencana_aksi' => 'string',
            'target' => 'string',
            'feedback' => 'string',
        ]);

        if ($request->feedback) {
            $validated['feedback_by'] = auth()->user()->id;
        }

        try {
            $tribulan = Tribulan::findOrFail($tribulanId);
            $tribulan->update($validated);

            // if ($request->feedback) {
            //     return redirect()->route('data-laporan-renaksi.tribulan.index', $renaksiId)
            //         ->with('success', 'Berhasil memberikan feedback');
            // }

            // return redirect()->back()->with('success', 'Data berhasil diubah');

            return to_route('data-laporan-renaksi.tribulan.index', $renaksiId)
                ->with('success', 'Data berhasil diubah');

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
    public function destroy(string $renaksiId, string $id)
    {
        try {
            $tribulan = Tribulan::findOrFail($id);

            $tribulan->destroy($id);

            return redirect()->back()->with('success', 'Data berhasil dihapus');

        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
