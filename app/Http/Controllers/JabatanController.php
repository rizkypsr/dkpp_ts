<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Exception;

class JabatanController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required',
        ]);

        try {
            $jabatan = Jabatan::create($validated);

            Role::create(['name' => $jabatan->nama]);

            return redirect()->back();
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Jabatan gagal ditambahkan');
        }
    }
}
