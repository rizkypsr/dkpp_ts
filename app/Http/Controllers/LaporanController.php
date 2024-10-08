<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dataLaporan = Laporan::with('user', 'user.jabatan')->paginate(10);

        $users = User::with(['jabatan'])->get()->map(function ($user) {
            return [
                'value' => $user->id,
                'label' => $user->name . " - " . $user->jabatan->nama,
            ];
        });

        $user = auth()->user()->load('jabatan');
        $validatedUser = ['kepaladinas', 'superadmin'];

        $canDownloadFile = in_array(strtolower(str_replace(' ', '', $user->jabatan->nama)), $validatedUser);

        return Inertia::render('Laporan/Index', [
            'dataLaporan' => $dataLaporan,
            'users' => $users,
            'canDownloadFile' => $canDownloadFile,
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

        $validated =  $request->validate([
            'user' => 'required',
            'filename' => 'required|string|max:255',
            'tanggal_diterima' => 'required|date',
            'file' => 'required|file|max:5120',
        ], [
            'required' => ':attribute wajib diisi',
            'date' => ':attribute harus berupa tanggal',
            'file' => ':attribute harus berupa file',
            'max' => ':attribute maksimal :max karakter',
            'file.max' => ':attribute maksimal :max KB',
        ], [
            'user' => 'User',
            'filename' => 'Nama File',
            'tanggal_diterima' => 'Tanggal Diterima',
            'file' => 'File Dokumen',
        ]);

        try {
            $filePath = null;

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('laporan', $fileName, 'public');
            }

            Laporan::create([
                'user_id' => $validated['user']['value'],
                'filename' => $validated['filename'],
                'tanggal_diterima' => $validated['tanggal_diterima'],
                'file' => $filePath,
            ]);

            return to_route('laporan.index')->with('success', 'Data berhasil ditambahkan');
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
    public function update(Request $request, string $id)
    {
        $validated =  $request->validate([
            'user' => 'required',
            'filename' => 'required|string|max:255',
            'tanggal_dikirim' => 'required|date',
            'tanggal_diterima' => 'required|date',
            'file' => 'nullable|file|max:5120',
        ], [
            'required' => ':attribute wajib diisi',
            'date' => ':attribute harus berupa tanggal',
            'file' => ':attribute harus berupa file',
            'max' => ':attribute maksimal :max karakter',
            'file.max' => ':attribute maksimal :max KB',
            // 'date_format' => ':attribute format tanggal tidak valid'
        ], [
            'user' => 'User',
            'filename' => 'Nama File',
            'tanggal_dikirim' => 'Tanggal Dikirim',
            'tanggal_diterima' => 'Tanggal Diterima',
            'file' => 'File Dokumen',
        ]);

        try {

            $laporan = Laporan::findOrFail($id);

            $filePath = null;

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $filePath = $file->storeAs('laporan', $fileName, 'public');

                if ($laporan->file) {
                    Storage::delete($laporan->file);
                }
            }

            $filePath = $filePath ?? $laporan->file;

            $laporan->update([
                'user_id' => $validated['user']['value'],
                'filename' => $validated['filename'],
                'tanggal_dikirim' => $validated['tanggal_dikirim'],
                'tanggal_diterima' => $validated['tanggal_diterima'],
                'file' => $filePath,
            ]);

            return to_route('laporan.index')->with('success', 'Data berhasil diubah');
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
    public function destroy(string $id)
    {
        try {
            $laporan = Laporan::findOrFail($id);

            Storage::disk('public')->delete($laporan->file);

            $laporan->delete();

            return redirect()->back()->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
