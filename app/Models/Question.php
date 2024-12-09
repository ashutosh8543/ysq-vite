<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;
    protected $fillable=['question','status'];

    public function options(){
        return $this->hasMany(QuestionOption::class,'question_id','id');
    }

}