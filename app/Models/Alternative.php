<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alternative extends Model
{
    use HasFactory;
    protected $table = 'alternative';
    protected $fillable = ['nip', 'name', 'jabatan'];

    public function nilais()
    {
        return $this->hasMany(Nilai::class);
    }
}