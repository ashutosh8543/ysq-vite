<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Area;
use App\Models\Country;
use Illuminate\Support\Facades\Auth;


class AreaController extends AppBaseController
{
   public function index(Request $request){

    $perPage = getPageSize($request);
    $data=Area::with('region')->latest()->paginate($perPage);
    return $this->sendResponse($data ,'Retrieved Successfully');
    }

    public function AreaList(Request $request){

        $data=Area::with('region')->latest()->get();
        return $this->sendResponse($data ,'Retrieved Successfully');
        }

        public function fetchCountries()
        {
            try {
                $countries = Country::where('status', 'active')->get();
                return response()->json(['status' => 'success', 'data' => $countries], 200);
            } catch (\Exception $e) {
                return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
            }
        }


        public function updateCountry(Request $request)
        {
            $validated = $request->validate([
                'country_id' => 'required|exists:countries,id',
            ]);

            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $country = Country::find($validated['country_id']);

            if (!$country) {
                return response()->json(['message' => 'Country not found'], 404);
            }

            $user->country = $country->id;
            $user->save();

            return response()->json([
                'message' => 'Country updated successfully',
                'user' => $user,
            ]);
        }


    function AddArea(Request $request){

        Area::create([
          "name"=>$request->name,
          "region_id"=>$request->region_id,
        ]);
        return $this->sendSuccess('Area added successfully');

    }

    function fetchArea(Request $request,$id=null){
        $data= Area::find($id);
        return $this->sendResponse($data,'Retrieved Successfully');

    }
    function EditArea(Request $request){

        $data= Area::where('id',$request->id)->update(['name'=>$request->name,'region_id'=>$request->region_id]);
        return $this->sendResponse($data,'Updated Successfully');

    }


    function DeleteArea(Request $request,$id=null){
        $data= Area::where('id',$id)->delete();
        return $this->sendResponse($data,'deleted Successfully');

    }



}
