<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonevRenaksi extends Model
{
    use HasFactory;

    protected $table = 'data_laporan_monev_renaksi';

    protected $fillable = [
        'kinerja',
        'indikator',
    ];
}
