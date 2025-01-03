<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\DataMaster;
use App\Models\DataMasterPenilaianJabatan;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Exception;
use Illuminate\Support\Facades\DB;

class DataMasterController extends Controller
{
    /** Display a listing of the resource. */
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

    /** Show the form for creating a new resource. */
    public function create() {}

    /** Store a newly created resource in storage. */
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

        DB::transaction(function () use ($validated, $request) {
            $user = User::create([
                'nip' => $validated['nip'],
                'username' => $validated['nip'],
                'name' => $validated['name'],
                'password' => Hash::make($validated['password']),
                'jabatan_id' => $validated['jabatan']['value'],
            ]);

            $user->assignRole(
                trim(strtolower(str_replace(' ', '', $validated['jabatan']['label'])))
            );

            $dataMaster = DataMaster::create([
                'users_id' => $user->id,
                'feedback' => $request->feedback ? 1 : 0,
                'feedback_by' => $request->feedback ? auth()->user()->id : null,
            ]);

            if ($request->penilaianKeJabatan) {
                foreach ($validated['penilaianKeJabatan'] as $penilaian) {
                    DataMasterPenilaianJabatan::create([
                        'penilaian_ke_jabatan' => $penilaian['value'],
                        'data_master_id' => $dataMaster->id,
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Data berhasil disimpan');
    }

    /** Display the specified resource. */
    public function show(string $id) {}

    /** Show the form for editing the specified resource. */
    public function edit(string $id) {}

    /** Update the specified resource in storage. */
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
                Rule::requiredIf(fn() => $request->filled('feedback')),
            ],
        ], [
            'nip.required' => 'NIP wajib diisi',
            'nip.numeric' => 'NIP harus berupa angka',
            'nip.unique' => 'NIP sudah terdaftar',
            'name.required' => 'Nama wajib diisi',
            'name.max' => 'Nama maksimal 255 karakter',
            'password.min' => 'Password minimal 8 karakter',
            'jabatan.required' => 'Jabatan wajib dipilih',
            'penilaianKeJabatan.required' => 'Jabatan wajib dipilih jika ingin memberikan feedback',
        ]);

        DB::transaction(function () use ($validated, $user, $dataMaster, $request) {
            if ($request->filled('password')) {
                $validated['password'] = Hash::make($validated['password']);
            }

            $user->update([
                'nip' => $validated['nip'],
                'name' => $validated['name'],
                'password' => $validated['password'] ?? $user->password,
                'jabatan_id' => $validated['jabatan']['value'],
            ]);

            $user->syncRoles([
                trim(strtolower(str_replace(' ', '', $validated['jabatan']['label'])))
            ]);

            $dataMaster->update([
                'users_id' => $user->id,
                'feedback' => $validated['feedback'] ? 1 : 0,
                'feedback_by' => $validated['feedback'] ? auth()->id() : $dataMaster->feedback_by,
            ]);

            DataMasterPenilaianJabatan::where('data_master_id', $dataMaster->id)->delete();

            if ($request->filled('penilaianKeJabatan')) {
                foreach ($validated['penilaianKeJabatan'] as $penilaian) {
                    DataMasterPenilaianJabatan::create([
                        'penilaian_ke_jabatan' => $penilaian['value'],
                        'data_master_id' => $dataMaster->id,
                    ]);
                }
            }
        });

        return redirect()->back()->with('success', 'Data berhasil diubah');
    }

    /** Remove the specified resource from storage. */
    public function destroy(string $id)
    {
        $dataMaster = DataMaster::findOrFail($id);

        DB::transaction(function () use ($dataMaster) {
            User::findOrFail($dataMaster->users_id)->delete();
            $dataMaster->delete();
        });

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }
}
