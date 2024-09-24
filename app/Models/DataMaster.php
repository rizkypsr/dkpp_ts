<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataMaster extends Model
{
    use HasFactory;

    protected $table = "data_master";

    protected $fillable = [
        'users_id',
        'feedback',
        'feedback_by'
    ];

    public function users() {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function feedbackBy() {
        return $this->belongsTo(User::class, 'feedback_by');
    }

    public function penilaianJabatan()
    {
        return $this->hasMany(DataMasterPenilaianJabatan::class, 'data_master_id');
    }
}
