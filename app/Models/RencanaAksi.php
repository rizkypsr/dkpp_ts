<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Wildside\Userstamps\Userstamps;

class RencanaAksi extends Model
{
    use HasFactory;
    use Userstamps;

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

    public function monevRenaksi()
    {
        return $this->belongsTo(MonevRenaksi::class, 'data_laporan_monev_renaksi_id');
    }

    public function buktiPendukung(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value ? asset('storage/' . $value) : $value,
        );
    }

    public function feedbackBy()
    {
        return $this->belongsTo(User::class, 'feedback_by');
    }
}
