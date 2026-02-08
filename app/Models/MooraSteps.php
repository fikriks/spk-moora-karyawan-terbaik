<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MooraSteps extends Model
{
    protected $fillable = ['step', 'data'];

    protected $casts = [
        'data' => 'array'
    ];
}