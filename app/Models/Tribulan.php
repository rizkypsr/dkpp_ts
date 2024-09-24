<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tribulan extends Model
{
    use HasFactory;

    protected $table = 'tribulan';

    protected $fillable = [
        'tribulan',
        'rencana_aksi',
        'target',
        'feedback',
        'feedback_by',
        'data_laporan_renaksi_id'
    ];

    public function feedbackBy() {
        return $this->belongsTo(User::class, 'feedback_by');
    }
}
