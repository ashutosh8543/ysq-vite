<?php

namespace App\Http\Controllers\API\M1;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\CreateCustomerRequest;
use App\Repositories\CustomerRepository;
use Illuminate\Http\JsonResponse;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Resources\CustomerResource;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Sale;
use App\Models\AssignCustomer;
use App\Models\AssignCustomersList;
use App\Models\Salesman;
use Carbon\Carbon;

/**
 * Class CustomerAPIController
 */
class CustomerAPIController extends AppBaseController
{
    private CustomerRepository $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
    }

    public function index(Request $request): JsonResponse
    {
        $area_id=$request->get('area_id');

        $customers = $this->customerRepository->where('area_id',$area_id)->get();
        $data = [];
        foreach ($customers as $key=>$customer) {
            $cust=$customer->prepareCustomers();
            $data[] = $cust;
            $data[$key]['country']=$cust['countryDetails']['name']??'';
        }

        return $this->sendResponse($data, 'All Customers Retrieved Successfully');
    }

    /**
     * @throws ValidatorException
     */
    public function store(CreateCustomerRequest $request): JsonResponse
    {   
        $input = $request->all();
        // dd($input);
        if (! empty($input['dob'])){
            $input['dob'] = $input['dob'] ?? date('Y/m/d');
        }
        $customer = $this->customerRepository->create($input);
        if(!empty($customer)){
            $customer->update(['unique_code'=>"CUS#".$customer->id]);
            $today=Carbon::today()->format('Y-m-d');   
            $assignCustomer = AssignCustomer::create([
                'area_id' => $input['area_id'],
                'salesman_id' => $input['salesman_id'],
                'assign_by' => $input['salesman_id'],
                'assigned_date' => $today,
                'distributor_id' =>  $input['user_id'],
                'warehouse_id' => Salesman::where('salesman_id',$input['salesman_id'])->first()->ware_id??'',
            ]);
            if($assignCustomer){
                AssignCustomersList::create([
                    'salesman_id'=>$input['salesman_id'],
                    'assign_customer_id' => $assignCustomer->id,
                    'customer_id' => $customer->id,
                    'assigned_date' => $today,
                ]);
            }
        }
        return $this->sendSuccess('Customer created successfully');
    }
    
    
    public function show($id): CustomerResource
    {
        $customer = $this->customerRepository->find($id);

        return new CustomerResource($customer);
    }
    public function Details($id): CustomerResource
    {
        $customer = $this->customerRepository->find($id);

        return new CustomerResource($customer);
    }


     public function update(Request $request):JsonResponse
    {         
        $input = $request->all();
        $id=$request->id;
        $validator = Validator::make($input, [
            'id'=>'required|numeric',
            'name' => 'required',
            'email' => 'required|email|unique:customers,email,'.$id,
            'phone' => 'required|numeric|unique:customers,phone,'.$id,
            'country' => 'required',
            // 'city' => 'required',
            'address' => 'required',
            'latitude' =>'required' ,
            'longitude' => 'required',
            'dob' => 'nullable|date',
            'user_id'=>'required',
            'chanel_id'=>'required',
            'postal_code'=>'required',
            'area_id'=>'required',
        ]);
 
        if ($validator->fails()) {
            return $this->SendError($validator->messages());
        } 
      
        if (! empty($input['dob'])) {
            $input['dob'] = $input['dob'] ?? date('Y/m/d');
        }
        $customer = $this->customerRepository->update($input, $id);
        return $this->sendSuccess('Outlet updated successfully');
    }
   

    public function PaymentList(): JsonResponse
    {           
        $data =Sale::PAYMENT_METHOD;       

        return $this->sendResponse($data, 'Payment Method Retrieved Successfully');
    }
 

    public function getTodayCustomers(Request $request,$id=null): JsonResponse
    {   
        // die('vcsdv');
        $today=Carbon::today()->format('Y-m-d');
        $salesman=AssignCustomersList::where('salesman_id',$id)->where('status','<',2)->whereDate('assigned_date','<=',$today)->orWhereDate('assigned_date',$today)->latest()->get();  
        
        $data=[];
        $assing_date=[];
          foreach($salesman as $key=>$val){                    
                $customer=$this->customerRepository->find($val->customer_id);
                $data[$key]=$customer->prepareCustomers();
                $data[$key]['assigned_date']=date('d-m-Y',strtotime($val->assigned_date)); 
                $data[$key]['salesman_id']=  $val->salesman_id??''; 
                $data[$key]['status']=  $val->status??''; 
                $data[$key]['assign_customer_id']=  $val->assign_customer_id??'';             
            
  
        }    
        return response()->json(
            [
                'data'=>$data,
                'total'=>count($salesman),
                'message'=>'Today Customers List',
            ]
        );
    }

    public function getUpcommingCustomers(Request $request,$id=null): JsonResponse
    {  
        $today=Carbon::today()->format('Y-m-d');
        $salesman=AssignCustomersList::where('salesman_id',$id)->whereDate('assigned_date','>',$today)->latest()->get();  
        
        $data=[];
        $assing_date=[];
        foreach($salesman as $key=>$val){                    
            $customer=$this->customerRepository->find($val->customer_id);
            $data[$key]=$customer->prepareCustomers();
            $data[$key]['assigned_date']=date('d-m-Y',strtotime($val->assigned_date)); 
            $data[$key]['salesman_id']=  $val->salesman_id??'';
            $data[$key]['status']=  $val->status??''; 
            $data[$key]['assign_customer_id']=  $val->assign_customer_id??'';             
            
             

    }   
        return response()->json(
            [
                'data'=>$data,
                'total'=>count($salesman),
                'message'=>'Upcomming Customers',
            ]
        );
    }
    
    public function getCompletedCustomers(Request $request,$id=null): JsonResponse
    {    
        $today=Carbon::today()->format('Y-m-d');
        $salesman=AssignCustomersList::where('salesman_id',$id)->where('status',2)->latest()->get();  
        
        $data=[];
        $assing_date=[];
        foreach($salesman as $key=>$val){                    
            $customer=$this->customerRepository->find($val->customer_id);
            $data[$key]=$customer->prepareCustomers();
            $data[$key]['assigned_date']=date('d-m-Y',strtotime($val->assigned_date)); 
            $data[$key]['salesman_id']=  $val->salesman_id??'';
            $data[$key]['status']=  $val->status??'';  
            $data[$key]['assign_customer_id']=  $val->assign_customer_id??'';             
           
             

    }    
        return response()->json(
            [
                'data'=>$data,
                'total'=>count($salesman),
                'message'=>'Completed Customers List',
            ]
        );
    }
    

    public function getAllCustomers(Request $request,$id=null): JsonResponse
    {  
        $today=Carbon::today()->format('Y-m-d');
        $salesman=AssignCustomersList::where('salesman_id',$id)->latest()->get();  
        
        $data=[];
        $assing_date=[];
        foreach($salesman as $key=>$val){                    
            $customer=$this->customerRepository->find($val->customer_id);
            $data[$key]=$customer->prepareCustomers();
            $data[$key]['assigned_date']=date('d-m-Y',strtotime($val->assigned_date)); 
            $data[$key]['salesman_id']=  $val->salesman_id??'';
            $data[$key]['status']=  $val->status??'';             
            $data[$key]['assign_customer_id']=  $val->assign_customer_id??'';             
             

    }   
        return response()->json(
            [
                'data'=>$data,
                'total'=>count($salesman),
                'message'=>'All Assigned Customers list ',
            ]
        );

    }

    public function uploadBulkCustomer(Request $request): JsonResponse
    {   
        try{
        $bulk = $request->all();
        foreach($bulk as $input){
            $check= $this->customerRepository->where('email',$input['email'])->orWhere('phone',$input['phone'])->first();
           if(empty($check)){
           $customer = $this->customerRepository->create($input);
            if(!empty($customer)){
              $customer->update(['unique_code'=>"CUS#".$customer->id]);
            }
           }
         }
        return $this->sendSuccess('Customer created successfully');
       }catch(Exception $e){
          
      }
    }

    


}
