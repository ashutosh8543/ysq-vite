<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use  App\Models\PriceInventory;
use  App\Models\User;
use  App\Models\Distributor;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Product
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $product_code
 * @property int $product_category_id
 * @property int $brand_id
 * @property int $main_product_id
 * @property float $product_cost
 * @property float $product_price
 * @property string $product_unit
 * @property string|null $sale_unit
 * @property string|null $purchase_unit
 * @property int $warehouse_id
 * @property string|null $stock_alert
 * @property float|null $order_tax
 * @property string|null $tax_type
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Brand|null $brand
 * @property-read \App\Models\MainProduct|null $mainProduct
 * @property-read string $image_url
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|Media[] $media
 * @property-read int|null $media_count
 * @property-read \App\Models\ProductCategory|null $productCategory
 * @property-read \App\Models\Warehouse|null $warehouse
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereBrandId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereMainProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereOrderTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product wherePurchaseUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereSaleUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereStockAlert($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereTaxType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereWarehouseId($value)
 *
 * @property-read string $barcode_image_url
 * @property int|null $barcode_symbol
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereBarcodeSymbol($value)
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Purchase[] $purchases
 * @property-read int|null $purchases_count
 * @property-read \App\Models\ManageStock|null $stock
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ManageStock[] $stocks
 * @property-read int|null $stocks_count
 * @property string|null $quantity_limit
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereQuantityLimit($value)
 *
 * @mixin \Eloquent
 */
class Product extends BaseModel implements HasMedia, JsonResourceful
{
    use SoftDeletes,HasFactory, InteractsWithMedia, HasJsonResourcefulData;

    protected $table = 'products';

    const JSON_API_TYPE = 'products';

    public const PATH = 'product';

    public const PRODUCT_BARCODE_PATH = 'product_barcode';

    public const CODE128 = 1;

    public const CODE39 = 2;

    public const EAN8 = 3;

    public const UPC = 4;

    public const EAN13 = 5;

    protected $appends = ['image_url', 'barcode_image_url'];

    protected $fillable = [
        'name',
        'cn_name',
        'bn_name',
        'code',
        'product_code',
        'product_category_id',
        'main_product_id',
        'brand_id',
        'product_cost',
        'product_price',
        'product_unit',
        'sale_unit',
        'purchase_unit',
        'stock_alert',
        'quantity_limit',
        'order_tax',
        'tax_type',
        'notes',
        'cn_description',
        'bn_description',
        'barcode_symbol',
        'quantity',
        'country_id',
        'added_by',
        'distributor_id',
        'user_id',
        'warehouse_id'

    ];

    public static $rules = [
        'name' => 'required',
        'cn_name' => 'required',
        'bn_name' => 'required',
        'code' => 'required|unique:products',
        'product_code' => 'required',
        'product_category_id' => 'required|exists:product_categories,id',
        'brand_id' => 'required|exists:brands,id',
        'product_cost' => 'required|numeric',
        'product_price' => 'required|numeric',
        'product_unit' => 'required',
        'sale_unit' => 'nullable',
        'purchase_unit' => 'nullable',
        'stock_alert' => 'nullable',
        'quantity_limit' => 'nullable',
        'order_tax' => 'nullable|numeric',
        'tax_type' => 'nullable',
        'notes' => 'required',
        'cn_description' => 'required',
        'bn_description' => 'required',
        // 'barcode_symbol' => 'required',
        'images.*' => 'image|mimes:jpg,jpeg,png',
    ];

    public static $availableRelations = [
        'product_category_id' => 'productCategory',
        'brand_id' => 'brand',
    ];

    protected $casts = [
        'product_cost' => 'float',
        'product_price' => 'float',
        'grand_total' => 'float',
        'order_tax' => 'float',
    ];

    /**
     * @return array|string
     */
    public function getImageUrlAttribute()
    {
        /** @var Media $media */
        $medias = $this->getMedia(Product::PATH);
        $images = [];
        if (!empty($medias)) {
            foreach ($medias as $key => $media) {
                $images['imageUrls'][$key] = $media->getFullUrl();
                $images['id'][$key] = $media->id;
            }

            return $images;
        }

        return '';
    }

    public function getBarcodeImageUrlAttribute(): string
    {
        /** @var Media $media */
        $media = $this->getMedia(Product::PRODUCT_BARCODE_PATH)->first();
        if (!empty($media)) {
            return $media->getFullUrl();
        }

        return '';
    }
    public function getProductAttribute($value): array
    {
        $product = Product::whereId($value)->first();
        if ($product) {
            return $product->toArray();
        }

        return [];
    }

    public function prepareLinks(): array
    {
        return [
            'self' => route('products.show', $this->id),
        ];
    }

    public function prepareAttributes(): array
    {
        $this->load('variationProduct','mainProduct');

        $fields = [
            'name' => $this->name,
            'country_id' => $this->country_id,
            'cn_name'=>$this->cn_name,
            'bn_name'=>$this->bn_name,
            'added_by'=>$this->added_by,
            'distributor_id'=>$this->distributor_id,
            'warehouse_id'=>$this->warehouse_id,
            'user_id'=>$this->user_id,
            'code' => $this->code,
            'product_code' => $this->product_code,
            'main_product_id' => $this->main_product_id,
            'product_category_id' => $this->product_category_id,
            'brand_id' => $this->brand_id,
            'product_cost' => $this->product_cost,
            'product_price' => $this->product_price,
            'product_unit' => $this->product_unit,
            'sale_unit' => $this->sale_unit,
            'purchase_unit' => $this->purchase_unit,
            'stock_alert' => $this->stock_alert,
            'quantity_limit' => $this->quantity_limit,
            'order_tax' => $this->order_tax,
            'tax_type' => $this->tax_type,
            'notes' => $this->notes,
            'cn_description' => $this->cn_description,
            'bn_description' => $this->bn_description,
            'images' => $this->mainProduct->image_url,
            'product_category_name' => $this->productCategory->name,
            'brand_name' => $this->brand->name,
            'barcode_image_url' => $this->barcode_image_url,
            // 'barcode_symbol' => $this->barcode_symbol,
            'quantity'=>$this->quantity,
            'created_at' => $this->created_at,
            'product_unit_name' => $this->getProductUnitName(),
            'purchase_unit_name' => $this->getPurchaseUnitName(),
            'sale_unit_name' => $this->getSaleUnitName(),
            'stock' => $this->stock,
            // 'warehouse' => $this->warehouse($this->id) ?? '',
            // 'barcode_url' => Storage::url('product_barcode/barcode-PR_' . $this->id . '.png'),
            'in_stock' => $this->inStock($this->id),
            'chanel'=> $this->priceInventories,
            'distributor'=>$this->distributor,
            'warehouse'=>$this->updateQuntityWareHouse,
            'productInventoriesDetails'=>$this->productInventoriesDetails
        ];

        if ($this->variationProduct) {
            $fields['variation_product'] = $this->variationProduct->prepareAttributes();
        }

        return $fields;
    }


    /**
     * @return string[]
     */
    public function getIdFilterFields(): array
    {
        return [
            'id' => self::class,
            'product_category_id' => ProductCategory::class,
            'brand_id' => Brand::class,
        ];
    }

    /**
     * @return array|string
     */
    public function getProductUnitName()
    {
        $productUnit = BaseUnit::whereId($this->product_unit)->first();
        if ($productUnit) {
            return $productUnit->toArray();
        }

        return '';
    }

    /**
     * @return array|string
     */
    public function getPurchaseUnitName()
    {
        $purchaseUnit = Unit::whereId($this->purchase_unit)->first();
        if ($purchaseUnit) {
            return $purchaseUnit->toArray();
        }

        return '';
    }

    /**
     * @return array|string
     */
    public function getSaleUnitName()
    {
        $saleUnit = Unit::whereId($this->sale_unit)->first();
        if ($saleUnit) {
            return $saleUnit->toArray();
        }

        return '';
    }

    public function productCategory(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }

    public function stock(): HasOne
    {
        return $this->hasOne(ManageStock::class, 'product_id', 'id');
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class, 'purchase_id', 'id');
    }

    public function prepareTopSelling(): array
    {
        return [
            'name' => $this->name,
            'total_quantity' => $this->total_quantity,
            'grand_total' => $this->grand_total,
            'sale_unit' => isset($this->getSaleUnitName()['short_name']) ? $this->getSaleUnitName()['short_name'] : null,
            'image' => $this->image_url,
        ];
    }

    public function prepareProducts(): array
    {
        $imageUrls = $this->mainProduct->image_url;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'country_id' => $this->country_id,
            'code' => $this->code,
            'product_code' => $this->product_code,
            'price' => $this->product_price,
            // 'sale_unit' => array_values($this->getProductUnitName())[1],
            'remaining_quantity' => $this->stock->quantity ?? 0,
            'images' => $imageUrls['imageUrls'] ?? [],
            'chanel'=> $this->priceInventories,
            'distributor'=>$this->distributor,
            'warehouse'=>$this->updateQuntityWareHouse,
        ];
    }

    public function prepareTopSellingReport(): array
    {
        return [
            'name' => $this->name,
            'total_quantity' => $this->total_quantity,
            'price' => $this->product_price,
            'grand_total' => $this->grand_total,
            'code' => $this->code,
            'product_code' => $this->product_code,
            'sale_unit' => isset($this->getSaleUnitName()['short_name']) ? $this->getSaleUnitName()['short_name'] : null,
        ];
    }

    public function yearlyTopSelling(): array
    {
        return [
            'name' => $this->name,
            'total_quantity' => $this->total_quantity,
            'grand_total' => $this->grand_total,
            'sale_unit' => isset($this->getSaleUnitName()['short_name']) ? $this->getSaleUnitName()['short_name'] : null,
        ];
    }

    /**
     * @return mixed
     */
    public function warehouse($id)
    {
        return Managestock::where('product_id', $id)->Join(
            'warehouses',
            'manage_stocks.warehouse_id',
            'warehouses.id'
        )->select(
            DB::raw('sum(quantity) as total_quantity'),
            'warehouses.name'
        )->groupBy('warehouse_id')->get();
    }

    /**
     * @return mixed
     */
    public function inStock($id)
    {
        $totalQuantity = Managestock::where('product_id', $id)->sum('quantity');

        return $totalQuantity;
    }

    public function stocks(): HasMany
    {
        return $this->hasMany(ManageStock::class, 'product_id', 'id');
    }

    public function mainProduct(): BelongsTo
    {
        return $this->belongsTo(MainProduct::class, 'main_product_id', 'id');
    }

    public function prepareProductReport()
    {
        return [
            'reference_code' => $this->code,
            'name' => $this->name,
            'total_quantity' => $this->total_quantity,
            'grand_total' => $this->grand_total,
            'product_unit' => $this->product_unit,
        ];
    }

    public function variationProduct(): HasOne
    {
        return $this->hasOne(VariationProduct::class, 'product_id', 'id');
    }

    public function variationType(): HasOneThrough
    {
        return $this->hasOneThrough(VariationType::class, VariationProduct::class, 'product_id', 'id', 'id', 'variation_type_id');
    }

    public function priceInventories()
    {
        return $this->hasMany(PriceInventory::class, 'product_id', 'id');
    }

    public function distributor() {
        return $this->hasMany(Distributor::class, 'product_id', 'id');
    }

    public function updateQuntityWareHouse(){
        return $this->hasMany(ManageStock::class, 'warehouse_id', 'id');
    }

    public function productBaseUnit(){

        return $this->hasOne(BaseUnit::class ,'id','product_unit');

    }

    public function inventories()
    {
        return $this->hasMany(ProductInventory::class);
    }

    public function productInventoriesDetails()
    {
        return $this->hasMany(ProductInventory::class, 'product_id', 'id');
    }






}