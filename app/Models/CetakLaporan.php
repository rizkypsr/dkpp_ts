<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CetakLaporan extends Model
{
    use HasFactory;

    protected $table = 'cetak_laporan';

    protected $fillable = [
        'nip',
        'name',
    ];
}
