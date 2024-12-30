<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Jabatan;
use App\Models\Kurja;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class KurjaController extends Controller
{
    /** Display a listing of the resource. */
    public function index()
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        if ($userRole === 'kepaladinas' || $userRole === 'superadmin') {
            $dataKurja = Kurja::with('jabatan')->paginate(10);
        } else {
            $dataKurja = Kurja::with('jabatan')->whereHas('jabatan', function ($query) use ($user) {
                $query->where('jabatan_id', $user->jabatan_id);
            })->paginate(10);
        }

        $jabatanOptions = Jabatan::where('nama', 'not like', '%Kepala Dinas%')->get()->map(function ($jabatan) {
            return [
                'value' => $jabatan->id,
                'label' => $jabatan->nama,
            ];
        });

        return Inertia::render('DataKurja/Index', [
            'dataKurja' => $dataKurja,
            'jabatanOptions' => $jabatanOptions,
        ]);
    }

    /** Store a newly created resource in storage. */
    public function store(Request $request)
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        $validated = $request->validate([
            'kinerja' => 'required|string|max:255',
            'indikator' => 'required|string|max:255',
            'target' => 'required|string|max:255',
            'realisasi' => 'required|string|max:255',
            'capaian' => 'required|numeric',
            'penjelasan' => 'required',
            'alternatif' => 'required',
            'jabatan' => [
                Rule::requiredIf(fn() => $userRole === 'kepaladinas' || $userRole === 'superadmin'),
                'array',
            ],
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
            'jabatan.required' => 'Minimal pilih satu jabatan',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $kurja = Kurja::create($validated);

                if (isset($validated['jabatan']) && is_array($validated['jabatan'])) {
                    $jabatanIds = array_column($validated['jabatan'], 'value');
                    $kurja->jabatan()->attach($jabatanIds);
                }
            });

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil ditambahkan');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /** Update the specified resource in storage. */
    public function update(Request $request, string $id)
    {
        $user = Auth::user();
        $userRole = $user->getRoleNames()->first();

        $validated = $request->validate([
            'kinerja' => 'required|string|max:255',
            'indikator' => 'required|string|max:255',
            'target' => 'required|string|max:255',
            'realisasi' => 'required|string|max:255',
            'capaian' => 'required|numeric',
            'penjelasan' => 'required',
            'alternatif' => 'required',
            'jabatan' => [
                Rule::requiredIf(fn() => $userRole === 'kepaladinas' || $userRole === 'superadmin'),
                'array',
            ],
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
            'jabatan.required' => 'Minimal pilih satu jabatan',
        ]);

        try {

            DB::transaction(function () use ($validated, $id) {
                $kurja = Kurja::findOrFail($id);
                $kurja->update($validated);

                if (isset($validated['jabatan']) && is_array($validated['jabatan'])) {
                    $jabatanIds = array_column($validated['jabatan'], 'value');
                    $kurja->jabatan()->sync($jabatanIds);
                }
            });

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil diubah');
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
            DB::transaction(function () use ($id) {
                $kurja = Kurja::findOrFail($id);
                $kurja->jabatan()->detach();
                $kurja->delete();
            });

            return to_route('data-laporan-kurja.index')->with('success', 'Data berhasil diubah');
        } catch (Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
