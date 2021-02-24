<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaView extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    protected $table = 'media_view';

}
