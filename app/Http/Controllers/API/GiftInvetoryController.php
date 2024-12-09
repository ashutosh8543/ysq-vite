<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GiftInventory;
use App\Models\Gift;
use App\Models\Warehouse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class GiftInvetoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $giftId = $request->query('gift_id');
        if ($giftId) {
            $giftInventories = GiftInventory::where('gift_id', $giftId)->get();
        } else {
            $giftInventories = GiftInventory::all();
        }
        return response()->json($giftInventories);
    }



    /**
     * Store a newly created resource in storage.
     */



    public function updateQuantity(Request $request)
    {

        $validated = $request->validate([
            'gift_id' => 'required|exists:gifts,id',
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

        $gift = Gift::find($validated['gift_id']);
        if (!$gift) {
            return response()->json(['message' => 'Gift not found'], 404);
        }

        DB::beginTransaction();
        try {
            if (isset($validated['distributor_id'])) {
                $distributorId = $validated['distributor_id'];
                $distributorQuantities = $validated['distributor_quantities'] ?? 0;

                if ($gift->quantity < $distributorQuantities) {
                    return response()->json(['message' => 'Insufficient gift quantity'], 400);
                }

                $distributorInventory = GiftInventory::where('gift_id', $gift->id)
                    ->where('distributor_id', $distributorId)
                    ->whereNull('warehouse_id')
                    ->first();

                if (!$distributorInventory) {
                    $distributorInventory = GiftInventory::create([
                        'gift_id' => $gift->id,
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

                $gift->quantity -= $distributorQuantities;
                $gift->save();
            }


            if (isset($validated['warehouse_id'])) {
                $warehouseId = $validated['warehouse_id'];
                $requestedWarehouseQuantities = $validated['warehouse_quantities'] ?? 0;
                $finalquanities = $requestedWarehouseQuantities;

                $distributorId = Warehouse::where('id', $warehouseId)->value('user_id');
                if (!$distributorId) {
                    return response()->json(['message' => 'No distributor associated with this warehouse'], 400);
                }

                $distributorInventory = GiftInventory::where('gift_id', $gift->id)
                    ->where('distributor_id', $distributorId)
                    ->whereNull('warehouse_id')
                    ->first();

                if (!$distributorInventory) {
                    return response()->json(['message' => 'Distributor inventory not found'], 400);
                }

                $warehouseInventory = GiftInventory::where('gift_id', $gift->id)
                    ->where('warehouse_id', $warehouseId)
                    ->first();

                if ($warehouseInventory) {
                    $previousWarehouseQuantities = $warehouseInventory->warehouse_quantities;
                    $finalquanities = $requestedWarehouseQuantities - $previousWarehouseQuantities;
                }

                if ($finalquanities > $distributorInventory->distributor_quantities) {
                    return response()->json(['message' => 'Insufficient distributor quantity for warehouse allocation'], 400);
                }

                if ($warehouseInventory) {
                    $warehouseInventory->warehouse_quantities += $finalquanities;
                    $warehouseInventory->save();
                } else {
                    GiftInventory::create([
                        'gift_id' => $gift->id,
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

                $warehouseRecords = GiftInventory::where('gift_id', $gift->id)
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






























    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
