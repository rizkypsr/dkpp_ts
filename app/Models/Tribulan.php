<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Wildside\Userstamps\Userstamps;

class Tribulan extends Model
{
    use HasFactory, Userstamps;

    protected $table = 'tribulan';

    protected $fillable = [
        'tribulan',
        'rencana_aksi',
        'target',
        'feedback',
        'feedback_by',
        'data_laporan_renaksi_id'
    ];

    protected $appends = ['can_feedback'];

    public function feedbackBy() {
        return $this->belongsTo(User::class, 'feedback_by');
    }

    public function canFeedback(): Attribute {
        $dataMaster = Cache::remember('data_master_' . Auth::id(), 60, function() {
            return DataMaster::where('users_id', Auth::id())->first();
        });

        if (!$dataMaster || $dataMaster->feedback !== 1) {
            return Attribute::make(
                get: fn () => false,
            );
        }

        // Check if there's any matching penilaianKeJabatan
        $canFeedback = Cache::remember('can_feedback_' . Auth::id() . '_' . $this->id, 60, function() use ($dataMaster) {
            return DataMasterPenilaianJabatan::where('data_master_id', $dataMaster->id)
                ->where('penilaian_ke_jabatan', $this->creator->jabatan_id)
                ->exists();
        });

        return Attribute::make(
            get: fn () => $canFeedback,
        );
    }
}
