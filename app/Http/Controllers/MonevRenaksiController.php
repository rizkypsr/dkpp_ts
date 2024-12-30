<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\MonevRenaksi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class MonevRenaksiController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        if ($userRole === 'kepaladinas' || $userRole === 'superadmin') {
            $dataMonevRenaksi = MonevRenaksi::with('jabatan')->paginate(10);
        } else {
            $dataMonevRenaksi = MonevRenaksi::with('jabatan')->whereHas('jabatan', function ($query) use ($user) {
                $query->where('jabatan_id', $user->jabatan_id);
            })->paginate(10);
        }

        $jabatanOptions = Jabatan::where('nama', 'not like', '%Kepala Dinas%')->get()->map(function ($jabatan) {
            return [
                'value' => $jabatan->id,
                'label' => $jabatan->nama,
            ];
        });

        return Inertia::render('DataMonevRenaksi/Index', [
            'dataMonevRenaksi' => $dataMonevRenaksi,
            'jabatanOptions' => $jabatanOptions,
        ]);
    }

    /** Store a newly created resource in storage. */
    public function store(Request $request)
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        $validated = $request->validate([
            'kinerja' => 'required|string',
            'indikator' => 'required|string',
            'jabatan' => [
                Rule::requiredIf(fn() => $userRole === 'kepaladinas' || $userRole === 'superadmin'),
                'array',
            ],
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'kinerja.string' => 'Kinerja harus berupa teks',
            'indikator.required' => 'Indikator harus diisi',
            'indikator.string' => 'Indikator harus berupa teks',
            'jabatan.required' => 'Minimal pilih satu jabatan',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $monevRenaksi = MonevRenaksi::create($validated);

                if (isset($validated['jabatan']) && is_array($validated['jabatan'])) {
                    $jabatanIds = array_column($validated['jabatan'], 'value');
                    $monevRenaksi->jabatan()->attach($jabatanIds);
                }
            });

            return to_route('data-laporan-monev-renaksi.index')->with('success', 'Data berhasil ditambahkan');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Terjadi kesalahan saat menyimpan data: ' . $e->getMessage()]);
        }
    }

    /** Update the specified resource in storage. */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        $validated = $request->validate([
            'kinerja' => 'required',
            'indikator' => 'required',
            'jabatan' => [
                Rule::requiredIf(fn() => $userRole === 'kepaladinas' || $userRole === 'superadmin'),
                'array',
            ],
        ], [
            'kinerja.required' => 'Kinerja harus diisi',
            'indikator.required' => 'Indikator harus diisi',
            'jabatan.required' => 'Minimal pilih satu jabatan',
        ]);

        try {
            DB::transaction(function () use ($validated, $id) {
                $monevRenaksi = MonevRenaksi::findOrFail($id);
                $monevRenaksi->update($validated);

                if (isset($validated['jabatan']) && is_array($validated['jabatan'])) {
                    $jabatanIds = array_column($validated['jabatan'], 'value');
                    $monevRenaksi->jabatan()->sync($jabatanIds);
                }
            });

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
            Db::transaction(function () use ($id) {
                $monevRenaksi = MonevRenaksi::findOrFail($id);
                $monevRenaksi->jabatan()->detach();
                $monevRenaksi->delete();
            });

            return to_route('data-laporan-monev-renaksi.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
