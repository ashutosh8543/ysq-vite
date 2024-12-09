<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
USE App\Models\AdminNotificationTemplate;
use Illuminate\Support\Facades\Validator;

class AdminNotificationController extends Controller
{
    public function index(Request $request){
        $perPage = getPageSize($request);

        $query = AdminNotificationTemplate::query();

        $adminNotifications = $query->latest()->paginate($perPage);
        return response()->json([
            'meassage'=> 'Admin Notification templates retrieved successfully',
            'data' => $adminNotifications
        ]);

    }

    public function show($id)
    {
        try {
            $template = AdminNotificationTemplate::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $template,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Resource not found',
            ], 404);
        }
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $template = AdminNotificationTemplate::create($request->all());

        return response()->json([
            'message' => ' Admin Notification Template created successfully!',
            'data' => $template,
        ], 201);
    }

    public function update(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $template = AdminNotificationTemplate::find($id);

        if (!$template) {
            return response()->json([
                'message' => 'Admin Notification Template not found.',
            ], 404);
        }

        $template->update($request->all());

        return response()->json([
            'message' => 'Admin Notification Template updated successfully!',
            'data' => $template,
        ], 200);
    }




}
