<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataMasterPenilaianJabatan extends Model
{
    use HasFactory;

    protected $table = 'data_master_penilaian_jabatan';

    protected $fillable = [
        'penilaian_ke_jabatan',
        'data_master_id',
    ];

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'penilaian_ke_jabatan');
    }
}
