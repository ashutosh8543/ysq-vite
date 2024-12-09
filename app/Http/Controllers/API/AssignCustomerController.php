<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\AssignCustomer;
use App\Models\Warehouse;
use Illuminate\Http\JsonResponse;
use App\Models\Customer;
use App\Models\Salesman;
use App\Models\Suppervisor;
use App\Models\Area;
use App\Models\User;
use App\Models\AssignCustomersList;


class AssignCustomerController extends Controller
{

    public function assignCustomers(Request $request)
    {
            $validator = Validator::make($request->all(), [
                'area_id' => 'required|exists:areas,id',
                'salesman_id' => 'required',
                'customers' => 'required|array|min:1',
                'customers.*' => 'exists:customers,id',
                'assigned_date' => 'required|date',
                'distributor_id' => 'required',
                'warehouse_id' => 'required',
            ]);
            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
            $assignCustomer = AssignCustomer::create([
                'area_id' => $request->area_id,
                'salesman_id' => $request->salesman_id,
                'assign_by' => auth()->id(),
                'assigned_date' => $request->assigned_date,
                'distributor_id' => $request->distributor_id,
                'warehouse_id' => $request->warehouse_id,
            ]);

            foreach ($request->customers as $customerId) {
                AssignCustomersList::create([
                    'salesman_id'=>$request->salesman_id,
                    'assign_customer_id' => $assignCustomer->id,
                    'customer_id' => $customerId,
                    'assigned_date' => $request->assigned_date,
                ]);
            }
            return response()->json([
                'message' => 'Customers assigned successfully.',
            ], 201);
    }



//     public function index(Request $request): JsonResponse
//     {
//             $perPage = getPageSize($request);
//             $search = $request->filter['search'] ?? '';
//             $startDate = $request->get('start_date');
//             $endDate = $request->get('end_date');

//             $assignedUsersQuery = AssignCustomer::with(['salesman', 'area', 'addedBy'])->latest();

//             if ($search) {
//                 $assignedUsersQuery->whereHas('salesman', function ($query) use ($search) {
//                     $query->where('first_name', 'like', '%' . $search . '%')
//                           ->orWhere('last_name', 'like', '%' . $search . '%');
//                 });
//             }

//             if ($startDate && $endDate) {
//                 $assignedUsersQuery->whereBetween('assigned_date', [$startDate, $endDate]);
//             }

//             $totalCount = $assignedUsersQuery->count();

//             $assignedUsers = $assignedUsersQuery->paginate($perPage);

//             $result = [];
//             foreach ($assignedUsers as $item) {
//                 $customersList = AssignCustomersList::where('assign_customer_id', $item->id)
//                     ->join('customers', 'assign_customers_list.customer_id', '=', 'customers.id')
//                     ->select('customers.name', 'assign_customers_list.assigned_date')
//                     ->get();

//                 $customerNames = $customersList->pluck('name')->toArray();
//                 $assignedDates = $customersList->pluck('assigned_date')->toArray();

//                 $result[] = [
//                     'id' => $item->id,
//                     'customer_names' => !empty($customerNames) ? implode(', ', $customerNames) : 'N/A',
//                     'assigned_dates' => !empty($assignedDates) ? implode(', ', $assignedDates) : 'N/A',
//                     'salesman_name' => $item->salesman ? $item->salesman->first_name . ' ' . $item->salesman->last_name : 'N/A',
//                     'area_name' => $item->area ? $item->area->name : 'N/A',
//                     'added_by' => $item->addedBy ? $item->addedBy->first_name : 'N/A',
//                     'assigned_date' => $item->assigned_date,
//                 ];
//             }

//             // return response()->json($result);
//             return response()->json([
//                 'total_count' => $totalCount,
//                 'data' => $result,
//                 'per_page' => $perPage,
//                 'current_page' => $assignedUsers->currentPage(),
//                 'last_page' => $assignedUsers->lastPage(),
//             ]);
//    }





    public function index(Request $request): JsonResponse
    {
        $perPage = getPageSize($request);
        $search = $request->filter['search'] ?? '';
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        $loginUserId = Auth::id();
        $userDetails = Auth::user();

        // Start with the base query
        $assignedUsersQuery = AssignCustomer::with(['salesman', 'area', 'addedBy'])
        ->latest();

        // Check for admin roles
        if ($userDetails->role_id == 1 || $userDetails->role_id == 2) {

        } elseif ($userDetails->role_id == 5) {
        // Supervisor logic
        $supervisor = Suppervisor::where('supervisor_id', $loginUserId)->first();

        if ($supervisor) {
            $ware_id = $supervisor->ware_id;
            $country = $supervisor->country;
            $salesmanIds = Salesman::where('ware_id', $ware_id)
            ->where('ware_id', $ware_id)
            ->where('country', $country)
            ->pluck('salesman_id');

            $assignedCustomerIds = AssignCustomer::whereIn('salesman_id', $salesmanIds)->pluck('id');

            if ($assignedCustomerIds->isNotEmpty()) {
                $assignedUsersQuery->whereIn('id', $assignedCustomerIds);
            } else {
                return response()->json([
                    'total_count' => 0,
                    'data' => [],
                    'per_page' => $perPage,
                    'current_page' => 1,
                    'last_page' => 1,
                ]);
            }
        }
        } elseif ($userDetails->role_id == 4) {
        // Warehouse employee logic
        $warehouse = Warehouse::where('ware_id', $loginUserId)->first();
        // dd($warehouse);

        if ($warehouse) {
            $ware_id = $warehouse->ware_id;
            $salesmanIds = Salesman::where('ware_id', $ware_id)
             ->where('ware_id', $ware_id)
             ->pluck('salesman_id');
            //  dd($salesmanIds);
            $assignedCustomerIds = AssignCustomer::whereIn('salesman_id', $salesmanIds)->pluck('id');

            if ($assignedCustomerIds->isNotEmpty()) {
                $assignedUsersQuery->whereIn('id', $assignedCustomerIds);
            } else {
                return response()->json([
                    'total_count' => 0,
                    'data' => [],
                    'per_page' => $perPage,
                    'current_page' => 1,
                    'last_page' => 1,
                ]);
            }
        }
        } elseif($userDetails->role_id == 3) {
            $distributor = User::where('id', $loginUserId)->first();
            if($distributor){
                $distributorId = $distributor -> id;
                $country = $distributor->country;

                $salesmanIds = Salesman::where('distributor_id', $distributorId )
                ->where('country', $country)
                ->pluck('salesman_id');
                // dd($salesmanIds);

                $assignedCustomerIds = AssignCustomer::whereIn('salesman_id', $salesmanIds)->pluck('id');

                if ($assignedCustomerIds->isNotEmpty()) {
                    $assignedUsersQuery->whereIn('id', $assignedCustomerIds);
                } else {
                    return response()->json([
                        'total_count' => 0,
                        'data' => [],
                        'per_page' => $perPage,
                        'current_page' => 1,
                        'last_page' => 1,
                    ]);
                }


            }
        }else{

        }

        // Apply search filter
        if ($search) {
            $assignedUsersQuery->whereHas('salesman', function ($query) use ($search) {
                $query->where('first_name', 'like', '%' . $search . '%')
                  ->orWhere('last_name', 'like', '%' . $search . '%');
            });
        }

        // Apply date range filter
        if ($startDate && $endDate) {
            $assignedUsersQuery->whereBetween('assigned_date', [$startDate, $endDate]);
        }

        $totalCount = $assignedUsersQuery->count();
        $assignedUsers = $assignedUsersQuery->paginate($perPage);

        $result = [];
        foreach ($assignedUsers as $item) {
           $customersList = AssignCustomersList::where('assign_customer_id', $item->id)
               ->join('customers', 'assign_customers_list.customer_id', '=', 'customers.id')
               ->select('customers.name', 'assign_customers_list.assigned_date')
               ->get();

            $customerNames = $customersList->pluck('name')->toArray();
            $assignedDates = $customersList->pluck('assigned_date')->toArray();

            $result[] = [
                'id' => $item->id,
                'customer_names' => !empty($customerNames) ? implode(', ', $customerNames) : 'N/A',
                'assigned_dates' => !empty($assignedDates) ? implode(', ', $assignedDates) : 'N/A',
                'salesman_name' => $item->salesman ? $item->salesman->first_name . '     ' . $item->salesman->last_name : 'N/A',
                'area_name' => $item->area ? $item->area->name : 'N/A',
                'added_by' => $item->addedBy ? $item->addedBy->first_name : 'N/A',
                'assigned_date' => $item->assigned_date,
           ];
        }

        return response()->json([
            'total_count' => $totalCount,
            'data' => $result,
            'per_page' => $perPage,
            'current_page' => $assignedUsers->currentPage(),
            'last_page' => $assignedUsers->lastPage(),
        ]);
    }


    public function getAllSalesman(): JsonResponse
    {
        $salesmen = Salesman::all();
        return response()->json($salesmen);
    }


    public function fetchSingleSssignedCustomer($id=null){
          $data=AssignCustomer::with(['assign_customers','assign_customers.customer','assign_customers.customer.channelDetails','salesman'])->find($id);
          return response()->json($data);

    }

    public function fetchSingleSssignedCustomerSalesman($id=null){
        $data=AssignCustomersList::with(['customer','salesman'])->find($id);
        return response()->json($data);

  }


















}





