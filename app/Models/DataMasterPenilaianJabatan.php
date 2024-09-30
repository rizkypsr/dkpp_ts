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

    public static function canFeedback(string $userId, string $jabatanId) {

        $dataMaster = DataMaster::where('users_id', $userId)->first();

        if (!$dataMaster) {
            return;
        }

        $penilaianKeJabatan = DataMasterPenilaianJabatan::where('data_master_id',  $dataMaster->id)->get();

        $canFeedback = false;

        foreach ($penilaianKeJabatan as $jabatan) {
            if ($jabatan->penilaian_ke_jabatan == $jabatanId) {
                $canFeedback = true;
                break;
            }
        }

        return $canFeedback;
    }

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'penilaian_ke_jabatan');
    }
}
