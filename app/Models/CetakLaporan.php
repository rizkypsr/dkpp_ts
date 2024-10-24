<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CetakLaporan extends Model
{
    use HasFactory;

    protected $table = 'cetak_laporan';

    protected $fillable = [
        'nip',
        'name',
        'nama_kepala_dinas',
        'nip_kepala_dinas',
        'pangkat_kepala_dinas',
        'jabatan_kepala_dinas',
        'unit_kerja_kepala_dinas',
    ];
}
