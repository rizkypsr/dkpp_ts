<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Exports\MonevRenaksiExport;
use App\Models\CetakLaporan;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CetakLaporanController extends Controller
{
    public function index()
    {
        $data = CetakLaporan::first();

        return Inertia::render('CetakLaporan/Index', [
            'data' => $data,
        ]);
    }

    public function export(Request $request)
    {

        $validated = $request->validate([
            'nip' => 'required|numeric',
            'name' => 'required|max:255',
            'nip_kepala_dinas' => 'required|numeric',
            'nama_kepala_dinas' => 'required|max:255',
            'pangkat_kepala_dinas' => 'required|max:255',
            'jabatan_kepala_dinas' => 'required|max:255',
            'unit_kerja_kepala_dinas' => 'required|max:255',
        ], [
            'required' => ':attribute tidak boleh kosong',
            'numeric' => ':attribute harus berupa angka',
        ], [
            'nip' => 'NIP',
            'name' => 'Nama',
            'nip_kepala_dinas' => 'NIP Kepala Dinas',
            'nama_kepala_dinas' => 'Nama Kepala Dinas',
            'pangkat_kepala_dinas' => 'Pangkat Kepala Dinas',
            'jabatan_kepala_dinas' => 'Jabatan Kepala Dinas',
            'unit_kerja_kepala_dinas' => 'Unit Kerja Kepala Dinas',
        ]);

        try {

            $cetakLaporan = CetakLaporan::first();

            if ($cetakLaporan) {
                $cetakLaporan->update($validated);
            } else {
                $cetakLaporan = CetakLaporan::create($validated);
            }

            return Excel::download(new MonevRenaksiExport($cetakLaporan), 'kadis.xlsx');
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
