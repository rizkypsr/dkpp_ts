<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonevRenaksiJabatan extends Model
{
    use HasFactory;

    protected $table = 'monev_renaksi_jabatan';

    protected $fillable = [
        'monev_renaksi_id',
        'jabatan_id',
    ];

    public function monevRenaksi()
    {
        return $this->belongsTo(MonevRenaksi::class, 'monev_renaksi_id');
    }

    public function jabatan()
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id');
    }
}
