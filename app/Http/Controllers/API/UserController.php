<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Guest;

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

        if (User::where('name', $request->name)->first()){
            return $this->sendError('User Name Already Exist!', $validator->errors()->all(), 422);
        }

        // create user
        User::create([
            'name'  => $request->name,
            'email' => $request->email,
            'slug'  => Str::slug($request->name)
        ]);

        return $this->sendResponse(true, "User created successfully");
    }


    /**
     * Adds a guest user to DB.
     *
     * @param      \Illuminate\Http\Request  $request  The request
     */
    public function addGuest(Request $request)
    {
        if (!Guest::firstWhere('email', $request->email)) {
            Guest::create([
                'name' => $request->name,
                'email' => $request->email,
            ]);
        }
    }


    /**
     * Gets the guests.
     *
     * @param      \Illuminate\Http\Request  $request  The request
     *
     * @return     <type>                    The guests.
     */
    public function getGuests(Request $request)
    {
        return $this->sendResponse(Guest::orderByDesc('id')->get());
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

    public function getUserBySlug(Request $request, $slug)
    {
        $user = User::where('slug', $slug)->first();

        if (!$user) {
            return $this->sendError('User Not Found', [], 404);
        }
        return $this->sendResponse($user);
    }

    public function generateSlug(){
        $users = User::all();
        foreach ($users as $user){
            User::where('id', $user->id)->update([
               'slug' =>  Str::slug($user->name)
            ]);
        }
        return $this->sendResponse('Successful');
    }
}
