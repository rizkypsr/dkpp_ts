<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RencanaAksi extends Model
{
    use HasFactory;

    protected $table = 'rencana_aksi';

    protected $fillable = [
        'rencana_aksi',
        'target',
        'realisasi',
        'capaian',
        'catatan',
        'tindak_lanjut',
        'bukti_pendukung',
        'feedback',
        'feedback_by',
        'data_laporan_monev_renaksi_id',
    ];
}
