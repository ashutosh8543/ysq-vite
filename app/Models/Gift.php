<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GiftInventory;

class Gift extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'discription',
        'price',
        'image',
        'cn_name',
        'bn_name',
        'quantity',
        'desc_in_china',
        'desc_in_indonesia',
        'country'
    ];


    public function giftInventoriesDetails()
    {
        return $this->hasMany(GiftInventory::class, 'gift_id', 'id');
    }
}
