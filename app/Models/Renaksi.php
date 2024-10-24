<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Renaksi extends Model
{
    use HasFactory;

    protected $table = 'data_laporan_renaksi';

    protected $fillable = [
        'kinerja',
        'indikator',
    ];

    public function tribulan()
    {
        return $this->hasMany(Tribulan::class, 'data_laporan_renaksi_id');
    }
}
