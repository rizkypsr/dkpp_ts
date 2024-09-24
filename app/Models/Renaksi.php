<?php

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
}
