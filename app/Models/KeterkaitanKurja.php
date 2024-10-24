<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Wildside\Userstamps\Userstamps;

class KeterkaitanKurja extends Model
{
    use HasFactory;
    use Userstamps;

    protected $table = 'keterkaitan_kurja';

    protected $fillable = [
        'program',
        'anggaran',
        'realisasi_rupiah',
        'realisasi_persentase',
        'data_laporan_kurja_id',
        'feedback',
        'feedback_by',
    ];

    public function feedbackBy()
    {
        return $this->belongsTo(User::class, 'feedback_by');
    }
}
