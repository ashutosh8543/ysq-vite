<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Suppervisor extends Model
{
    use SoftDeletes,HasFactory;
    protected $fillable=['supervisor_id','distributor_id','ware_id', 'country'];

    public function supervisorDetails(){
        return $this->hasOne(User::class,  'id', 'distributor_id');
    }

}
