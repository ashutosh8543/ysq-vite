<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\ProductInventory;
use App\Models\Warehouse;
use Illuminate\Support\Facades\DB;


class ProductInventoryController extends Controller
{

public function index(Request $request)
{
    $productId = $request->query('product_id');

    if ($productId) {
        $productInventories = ProductInventory::where('product_id', $productId)->get();
    } else {
        $productInventories = ProductInventory::all();
    }
    return response()->json($productInventories);
}

public function updateQuantity(Request $request)
{

    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'distributor_id' => 'nullable|exists:users,id',
        'warehouse_id' => 'nullable|exists:warehouses,id',
        'distributor_quantities' => 'nullable|integer|min:0',
        'warehouse_quantities' => 'nullable|integer|min:0',
    ]);

    $userId = Auth::id();
    $country = Auth::user()->country;


    if (!isset($validated['distributor_id']) && !isset($validated['warehouse_id'])) {
        return response()->json(['message' => 'Either distributor_id or warehouse_id must be provided'], 400);
    }

    if (isset($validated['distributor_id']) && isset($validated['warehouse_id'])) {
        return response()->json(['message' => 'You cannot update both distributor and warehouse at the same time'], 400);
    }

    $product = Product::find($validated['product_id']);
    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    DB::beginTransaction();
    try {
        if (isset($validated['distributor_id'])) {
            $distributorId = $validated['distributor_id'];
            $distributorQuantities = $validated['distributor_quantities'] ?? 0;

            if ($product->quantity < $distributorQuantities) {
                return response()->json(['message' => 'Insufficient product quantity'], 400);
            }

            $distributorInventory = ProductInventory::where('product_id', $product->id)
                ->where('distributor_id', $distributorId)
                ->whereNull('warehouse_id')
                ->first();

            if (!$distributorInventory) {
                $distributorInventory = ProductInventory::create([
                    'product_id' => $product->id,
                    'distributor_id' => $distributorId,
                    'user_id' => $userId,
                    'distributor_quantities' => $distributorQuantities,
                    'warehouse_quantities' => 0,
                    'country' => $country,
                ]);
            } else {
                $distributorInventory->distributor_quantities = $distributorQuantities;
                $distributorInventory->save();
            }

            $product->quantity -= $distributorQuantities;
            $product->save();
        }

        if (isset($validated['warehouse_id'])) {
            $warehouseId = $validated['warehouse_id'];
            $requestedWarehouseQuantities = $validated['warehouse_quantities'] ?? 0;
            $finalquanities = $requestedWarehouseQuantities;


            $distributorId = Warehouse::where('id', $warehouseId)->value('user_id');
            if (!$distributorId) {
                return response()->json(['message' => 'No distributor associated with this warehouse'], 400);
            }


            $distributorInventory = ProductInventory::where('product_id', $product->id)
                ->where('distributor_id', $distributorId)
                ->whereNull('warehouse_id')
                ->first();

            if (!$distributorInventory) {
                return response()->json(['message' => 'Distributor inventory not found'], 400);
            }

            $warehouseInventory = ProductInventory::where('product_id', $product->id)
            ->where('warehouse_id', $warehouseId)
            ->first();

            if ($warehouseInventory) {
                $previousWarehouseQunaities = $warehouseInventory->warehouse_quantities;

                $finalquanities = $requestedWarehouseQuantities - $previousWarehouseQunaities;

                if ( $finalquanities  > $distributorInventory->distributor_quantities) {
                    return response()->json(['message' => 'Insufficient distributor quantity for warehouse allocation'], 400);
                }

                $warehouseInventory->warehouse_quantities += $finalquanities;
                $warehouseInventory->save();
            } else {
                ProductInventory::create([
                    'product_id' => $product->id,
                    'warehouse_id' => $warehouseId,
                    'user_id' => $userId,
                    'distributor_id' => $distributorId,
                    'warehouse_quantities' => $requestedWarehouseQuantities,
                    'distributor_quantities' => $distributorInventory->distributor_quantities - $requestedWarehouseQuantities,
                    'country' => $country,
                ]);
            }

            $distributorInventory->distributor_quantities -= $finalquanities;
            $distributorInventory->save();

            $warehouseRecords = ProductInventory::where('product_id', $product->id)
                ->where('distributor_id', $distributorId)
                ->whereNotNull('warehouse_id')
                ->get();

            foreach ($warehouseRecords as $warehouseRecord) {
                $warehouseRecord->distributor_quantities = $distributorInventory->distributor_quantities;
                $warehouseRecord->save();
            }
        }

        DB::commit();
        return response()->json(['message' => 'Quantity updated successfully'], 200);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['message' => 'Failed to update quantity', 'error' => $e->getMessage()], 500);
    }
}
















}
