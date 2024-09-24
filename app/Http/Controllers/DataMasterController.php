<?php

namespace App\Http\Controllers;

use App\Models\DataMaster;
use App\Models\DataMasterPenilaianJabatan;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DataMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataMaster = DataMaster::with(['users.jabatan', 'penilaianJabatan.jabatan'])->paginate(10);

        $jabatanOptions = Jabatan::all()->map(function ($jabatan) {
            return [
                'value' => $jabatan->id,
                'label' => $jabatan->nama,
            ];
        });

        return inertia('DataMaster/Index', [
            'dataMaster' => $dataMaster,
            'jabatanOptions' => $jabatanOptions,
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
            'nip' => 'required|numeric|unique:users,nip',
            'name' => 'required|max:255',
            'password' => 'required|min:8',
            'jabatan' => 'required',
            'feedback' => 'nullable',
            'penilaianKeJabatan' => [
                Rule::requiredIf(function () use ($request) {
                    return $request->feedback;
                }),
            ],
        ], [
            'nip.required' => 'NIP wajib diisi',
            'nip.numeric' => 'NIP harus berupa angka',
            'nip.unique' => 'NIP sudah terdaftar',
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'jabatan.required' => 'Jabatan wajib dipilih',
            'penilaianKeJabatan.required' => 'Jabatan wajib dipilih jika ingin memberikan feedback',
        ]);

        try {
            $user = User::create([
                'nip' => $validated['nip'],
                'username' => $validated['nip'],
                'name' => $validated['name'],
                'password' => Hash::make($validated['password']),
                'jabatan_id' => $validated['jabatan']['value'],
            ]);

            $user->assignRole($validated['jabatan']['label']);

            $dataMaster = DataMaster::create([
                'users_id' => $user->id,
                'feedback' => $request->feedback ? 1 : 0,
                'feedback_by' => $request->feedback ?  auth()->user()->id : null,
            ]);

            if ($request->penilaianKeJabatan) {
                foreach ($validated['penilaianKeJabatan'] as $penilaian) {
                    DataMasterPenilaianJabatan::create([
                        'penilaian_ke_jabatan' => $penilaian['value'],
                        'data_master_id' => $dataMaster->id,
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Data berhasil disimpan');

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
    public function show(string $id)
    {
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
        $dataMaster = DataMaster::findOrFail($id);
        $user = User::findOrFail($dataMaster->users_id);

        $validated = $request->validate([
            'nip' => [
                'required',
                'numeric',
                Rule::unique('users', 'nip')->ignore($user->id),
            ],
            'name' => 'required|max:255',
            'password' => 'nullable|min:8',
            'jabatan' => 'required',
            'feedback' => 'nullable',
            'penilaianKeJabatan' => [
                Rule::requiredIf(function () use ($request) {
                    return $request->feedback;
                }),
            ],
        ], [
            'nip.required' => 'NIP wajib diisi',
            'nip.numeric' => 'NIP harus berupa angka',
            'nip.unique' => 'NIP sudah terdaftar',
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'password.required' => 'Password wajib diisi',
            'password.min' => 'Password minimal 8 karakter',
            'jabatan.required' => 'Jabatan wajib dipilih',
            'penilaianKeJabatan.required' => 'Jabatan wajib dipilih jika ingin memberikan feedback',
        ]);

        try {
            $penilaianKeJabatan = DataMasterPenilaianJabatan::where('data_master_id', $id)->get();

            if ($validated['password']) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $user->update([
                'nip' => $request->nip,
                'name' => $request->name,
                'password' => $validated['password'] ?? $user->password,
                'jabatan_id' => $validated['jabatan']['value'],
            ]);

            $user->assignRole($validated['jabatan']['label']);

            $dataMaster->update([
                'users_id' => $user->id,
                'feedback' => $validated['feedback'] ? 1 : 0,
                'feedback_by' => $validated['feedback'] ?  auth()->user()->id : $dataMaster->feedback_by,
            ]);

            foreach ($penilaianKeJabatan as $penilaian) {
                $penilaian->delete();
            }

            if ($request->penilaianKeJabatan) {
                foreach ($validated['penilaianKeJabatan'] as $penilaian) {
                    DataMasterPenilaianJabatan::create([
                        'penilaian_ke_jabatan' =>  $penilaian['value'],
                        'data_master_id' => $dataMaster->id,
                    ]);
                }
            }

            return redirect()->back()->with('success', 'Data berhasil diubah');

        } catch (\Exception $e) {
            dd($e->getMessage());
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
            $penilaianKeJabatan = DataMasterPenilaianJabatan::where('data_master_id', $id)->get();

            foreach ($penilaianKeJabatan as $penilaian) {
                $penilaian->delete();
            }

            DataMaster::destroy($id);

            return redirect()->back()->with('success', 'Data berhasil dihapus');

        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
