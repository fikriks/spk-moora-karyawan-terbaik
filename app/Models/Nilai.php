<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
{
    protected $table = 'nilai';
    protected $fillable = [
        'alternative_id',
        'criteria_id',
        'value',
    ];
     public function alternative()
    {
        return $this->belongsTo(Alternative::class);
    }

    public function criteria()
    {
        return $this->belongsTo(Criterion::class);
    }
}