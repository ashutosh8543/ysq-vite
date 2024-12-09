<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AssignGift;
use App\Models\Warehouse;
use App\Models\Salesman;
use App\Models\Suppervisor;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AssignedGiftController extends Controller
{
    // public function index(Request $request)
    // {
    //     $perPage = getPageSize($request);
    //     $assignedGifts = AssignGift::with(['salesman' => function($query) {
    //         $query->where('role_id', 6);
    //     }])->latest()->paginate($perPage);

    //     return response()->json([
    //         'message' => 'Assigned gifts fetched successfully.',
    //         'data' => $assignedGifts,
    //     ], 200);
    // }

    public function index(Request $request)
    {
        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');
        $loginUserId = Auth::id();
        $userDetails = Auth::user();

        \Log::info('Start Date: ' . $startDate);
        \Log::info('End Date: ' . $endDate);


        if($userDetails->role_id == 4){
            $warehouse = Warehouse::where('ware_id', $loginUserId)->first();
            // dd($warehouse);
            if($warehouse){
             $ware_id = $warehouse->ware_id;
            //  dd($ware_id);
             $salesmanIds = Salesman::where('ware_id', $ware_id)
             ->where('ware_id', $ware_id)
             ->pluck('salesman_id');
            //  dd($salesmanIds);

            $assignedGiftsQuery = AssignGift::with(['salesman' => function($query) {
                $query->where('role_id', 6);
                }])
                ->whereIn('salesman_id', $salesmanIds)
                ->latest();


                $assignedGifts = $assignedGiftsQuery->paginate($perPage);
                return response()->json([
                    'message' => 'Assigned gifts fetched successfully.',
                    'data' => $assignedGifts,
                ], 200);
            }
        }


        if($userDetails->role_id == 3){

            $distributor = User::where('id', $loginUserId)->first();
            // dd($distributor);
            if($distributor){
                $distributorId = $distributor -> id;
                $salesmanIds = Salesman::where('distributor_id', $distributorId )
                ->pluck('salesman_id');
                // dd($salesmanIds);

                $assignedGiftsQuery = AssignGift::with(['salesman' => function($query) {
                $query->where('role_id', 6);
                }])
                ->whereIn('salesman_id', $salesmanIds)
                ->latest();

                $assignedGifts = $assignedGiftsQuery->paginate($perPage);
                return response()->json([
                    'message' => 'Assigned gifts fetched successfully.',
                    'data' => $assignedGifts,
                ], 200);

        }
        }

        if($userDetails->role_id == 5){
            $supervisor = Suppervisor::where('supervisor_id', $loginUserId)->first();
            if($supervisor){
              $ware_id = $supervisor->ware_id;
              $country = $supervisor->country;
            $salesmanIds = Salesman::where('ware_id', $ware_id)
            ->where('ware_id', $ware_id)
            ->where('country', $country)
            ->pluck('salesman_id');
            // dd($salesmanIds);

            $assignedGiftsQuery = AssignGift::with(['salesman' => function($query) {
                $query->where('role_id', 6);
                }])
                ->whereIn('salesman_id', $salesmanIds)
                ->latest();


                $assignedGifts = $assignedGiftsQuery->paginate($perPage);
                return response()->json([
                    'message' => 'Assigned gifts fetched successfully.',
                    'data' => $assignedGifts,
                ], 200);
            }
        }


        try {
            $assignedGiftsQuery = AssignGift::with(['salesman' => function($query) {
                $query->where('role_id', 6);
            }])
            ->latest();


            // Apply date range filter
            if ($startDate && $endDate) {
                $startDate = \Carbon\Carbon::parse($startDate)->startOfDay();
                $endDate = \Carbon\Carbon::parse($endDate)->endOfDay();

                $assignedGiftsQuery->whereBetween('created_at', [$startDate, $endDate]);
            }

            // Apply search filter
            if ($search) {
                $assignedGiftsQuery->whereHas('salesman', function($q) use ($search) {
                    $q->where('first_name', 'LIKE', "%$search%")
                    ->orWhere('last_name', 'LIKE', "%$search%");
                });
            }

            // Fetch the paginated results
            $assignedGifts = $assignedGiftsQuery->paginate($perPage);

            return response()->json([
                'message' => 'Assigned gifts fetched successfully.',
                'data' => $assignedGifts,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching assigned gifts.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }





}
