<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KeterkaitanKurja extends Model
{
    use HasFactory;

    protected $table = 'keterkaitan_kurja';

    protected $fillable = [
        'program',
        'anggaran',
        'realisasi_rupiah',
        'realisasi_persentase',
        'data_laporan_kurja_id',
    ];
}
