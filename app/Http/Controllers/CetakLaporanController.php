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
        ], [
            'required' => ':attribute tidak boleh kosong',
            'numeric' => ':attribute harus berupa angka',
        ], [
            'nip' => 'NIP',
            'name' => 'Nama',
        ]);

        try {

            $cetakLaporan = CetakLaporan::first();

            if ($cetakLaporan) {
                $cetakLaporan->update([
                    'nip' => $validated['nip'],
                    'name' => $validated['name'],
                ]);
            } else {
                CetakLaporan::create([
                    'nip' => $validated['nip'],
                    'name' => $validated['name'],
                ]);
            }

            return Excel::download(new MonevRenaksiExport($request->all()), 'kadis.xlsx');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
