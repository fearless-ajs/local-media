<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class UserController extends BaseController
{
    /**
     * Return all users
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function getUsers(Request $request)
    {
        return $this->sendResponse(User::orderByDesc('id')->get());
    }


    /**
     * Create new user
     * @param  Request $request
     */
    public function addUser(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'name' => 'required | string | max:255',
            'email' => 'required | email | max:255 | unique:users',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Input Validation Failed', $validator->errors()->all(), 422);
        }

        // create user
        User::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return $this->sendResponse(true, "User created successfully");
    }


    /**
     * delete user
     * @param  Request $request [description]
     * @return [type]           [description]
     */
    public function deleteUser(Request $request, $id)
    {
        User::where('id', $id)->delete();
        return $this->sendResponse(true, "User deleted successfully");
    }
}
