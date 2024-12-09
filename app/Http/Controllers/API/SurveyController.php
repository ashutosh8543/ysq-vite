<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\AppBaseController;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Survey;
use App\Models\QuestionOption;
use App\Models\CheckIn;
use App\Models\CheckOut;
use Validator;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyController extends AppBaseController
{



    public function SurveyList(Request $request){

        $perPage = getPageSize($request);

        $survey = Survey::with(['salesmanDetails'=>function($query){
           $query->select(['id','first_name','last_name']);
        },'surveyHistory'])->latest()->paginate($perPage);
        return $this->sendResponse($survey, 'Question retrieved Successfully');

    }

    public function SurveyDetails(Request $request,$id=null){

        $survey = Survey::with(['salesmanDetails'=>function($query){
            $query->select(['id','first_name','last_name']);
         },'surveyHistory'])->where('id',$id)->first();
         return $this->sendResponse($survey, 'Question retrieved Successfully');
    }

    public function QuestionList(Request $request){

        $perPage = getPageSize($request);
        $question = Question::with(['options'])->paginate($perPage);
        return $this->sendResponse($question, 'Question retrieved Successfully');

    }

    public function getQuestionById($id)
    {
         $question = Question::with(['options'])->find($id);

         if (!$question) {
             return $this->sendError('Question not found', 404);
         }

         return $this->sendResponse($question, 'Question retrieved successfully');
    }


    // public function addQuestionOption(Request $request){
    //     $validator = Validator::make($request->all(), [
    //         'question' => 'required',
    //         'option' => 'required|array|min:1',
    //     ]);

    //     if($validator->fails()){
    //         return response()->json([
    //             'errors' => $validator->errors(),
    //         ], 422);
    //     }
    //     $question = Question::create([
    //         'question' => $request->question,
    //         'status' => "Active",
    //     ]);

    //     foreach ($request->option as $opt) {
    //         QuestionOption::create([
    //             'question_id'=>$question->id,
    //             'option' => $opt['option'],
    //         ]);
    //     }
    //     return response()->json([
    //         'message' => 'Question Added successfully.',
    //     ], 201);
    // }


    public function addQuestionOption(Request $request) {
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'option' => 'required|array|min:1',
            'status' => 'required|in:Active,Inactive',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $question = Question::create([
            'question' => $request->question,
            'status' => $request->status,
        ]);

        foreach ($request->option as $opt) {
            QuestionOption::create([
                'question_id' => $question->id,
                'option' => $opt['option'],
            ]);
        }

        return response()->json([
            'message' => 'Question added successfully.',
        ], 201);
    }



    public function CheckInList(Request $request)
    {
        $perPage = getPageSize($request);
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        $checkInQuery = CheckIn::with([
            'salesman' => function ($query) {
                $query->select(['id', 'first_name', 'last_name']);
             },
             'customer'
            ])->latest();


         if ($startDate && $endDate) {
             $checkInQuery->whereBetween('created_at', [$startDate, $endDate]);
         }

          $survey = $checkInQuery->paginate($perPage);
          return $this->sendResponse($survey, 'Check-in retrieved successfully');
    }



    public function checkinDetails($id)
    {
        $checkIn = CheckIn::with(['salesman' => function($query) {
            $query->select(['id', 'first_name', 'last_name']);
        }, 'customer'])->findOrFail($id);

        return $this->sendResponse($checkIn, 'Checkin details retrieved successfully');
    }


    public function checkoutDetails($id){

        $checkOut = CheckOut::with(['salesman'=>function($query){
            $query->select(['id','first_name','last_name']);
         },'customer'])->findOrFail($id);

         return $this->sendResponse($checkOut, 'Check Out  details retrieved successfully');
    }


    public function CheckOutList(Request $request){

        $perPage = getPageSize($request);
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        $checkOutQuery = CheckOut::with(['salesman'=>function($query){
           $query->select(['id','first_name','last_name']);
        },'customer'])->latest();

        if ($startDate && $endDate) {
            $checkOutQuery->whereBetween('created_at', [$startDate, $endDate]);
        }
        $survey = $checkOutQuery ->paginate($perPage);
        return $this->sendResponse($survey, 'Checkin retrieved Successfully');

    }


    public function deleteQuestion($id)
    {
        $question = Question::find($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        $question->delete();

        return response()->json(['message' => 'Question deleted successfully'], 200);
    }




    public function updateQuestionOption(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'question' => 'required',
            'option' => 'nullable|array',
            'status' => 'required|in:Active,Inactive',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $question = Question::find($id);
        if (!$question) {
            return response()->json(['message' => 'Question not found.'], 404);
        }

        // Update the question details
        $question->update([
            'question' => $request->question,
            'status' => $request->status,
        ]);

        if (isset($request->option) && is_array($request->option)) {
            $existingOptionIds = $question->options()->pluck('id')->toArray();
            $newOptionIds = [];

            foreach ($request->option as $opt) {
                \Log::info('Processing option:', $opt);

                if (isset($opt['id'])) {
                    $newOptionIds[] = $opt['id'];
                    $option = QuestionOption::withTrashed()->find($opt['id']);
                    if ($option) {
                        if ($option->trashed()) {
                            \Log::info('Creating new option for soft-deleted ID ' . $opt['id']);
                            $newOption = QuestionOption::create([
                                'question_id' => $question->id,
                                'option' => $opt['option'],
                            ]);
                            \Log::info('Created new option:', $newOption->toArray());
                        } else {
                            $option->update(['option' => $opt['option']]);
                            \Log::info('Updated existing option ID ' . $opt['id'] . ':', $option->toArray());
                        }
                    } else {
                        \Log::info('Option ID ' . $opt['id'] . ' not found, creating new option.');
                        $newOption = QuestionOption::create([
                            'question_id' => $question->id,
                            'option' => $opt['option'],
                        ]);
                        \Log::info('Created new option:', $newOption->toArray());
                    }
                } else {
                    if (isset($opt['option']) && !empty($opt['option'])) {
                        \Log::info('Creating new option without ID for question ID ' . $question->id);
                        $newOption = QuestionOption::create([
                            'question_id' => $question->id,
                            'option' => $opt['option'],
                        ]);
                        \Log::info('Created new option:', $newOption->toArray());
                    } else {
                        \Log::warning('Option data is missing or invalid.');
                    }
                }
            }

            $optionsToDelete = array_diff($existingOptionIds, $newOptionIds);
            foreach ($optionsToDelete as $idToDelete) {
                $optionToDelete = QuestionOption::withTrashed()->find($idToDelete);
                if ($optionToDelete && !$optionToDelete->trashed()) {
                    $optionToDelete->delete();
                    \Log::info("Soft deleted option with ID {$idToDelete}");
                }
            }
        }

        return response()->json(['message' => 'Question and options updated successfully.'], 200);
    }


















}
