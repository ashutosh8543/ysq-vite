<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Area extends Model
{
    use SoftDeletes, HasFactory;

    protected $fillable =['region_id','name'];

    public function region(){
      return $this->hasOne(Region::class,'id','region_id');
    }



}
