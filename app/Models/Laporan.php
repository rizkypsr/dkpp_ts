<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $table = 'laporan';

    protected $fillable = [
        'filename',
        'file',
        'tanggal_dikirim',
        'tanggal_diterima',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
