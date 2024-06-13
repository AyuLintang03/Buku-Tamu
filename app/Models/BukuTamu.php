<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BukuTamu extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'nik',
        'keperluan',
        'tanggal',
        'jam_masuk',
        'jam_keluar',
        'alamat',
        'no_tlp_tamu',
        'status',
        'user_id',
    ];

      public function user()
    {
        return $this->belongsTo(User::class);
    }
}
