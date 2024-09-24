<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kurja extends Model
{
    use HasFactory;

    protected $table = 'data_laporan_kurja';

    protected $fillable = [
        'kinerja',
        'indikator',
        'target',
        'realisasi',
        'capaian',
        'penjelasan',
        'alternatif',
    ];
}
