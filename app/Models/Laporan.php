<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    use HasFactory;

    protected $table = 'laporan';

    protected $appends = ['file_path'];

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

    public function filePath(): Attribute {
        return Attribute::make(
            get: fn () => asset('storage/' . $this->file),
        );
    }

    public function getTanggalDiterimaAttribute($value)
    {
        return $value ? date('d-m-Y', strtotime($value)) : null;
    }

    public function getTanggalDikirimAttribute($value)
    {
        return $value ? date('d-m-Y', strtotime($value)) : null;
    }
}
