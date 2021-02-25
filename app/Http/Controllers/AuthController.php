<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends BaseController
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors()->all());
        }

        if ($request->password == env("PASS")) {
            // auth token is the concatenation of the hash(sha 256)
            // of the current month and the password in the .env file
            $data['token'] = hash(
                'sha256',
                date('m') . env("PASS")
            );

            return $this->sendResponse($data);
        } else {
            return $this->sendError("Incorrect password", [], 422);
        }
    }


    public function loginView(Request $request)
    {
        $cookie_token = $request->cookie('AUTH_TOKEN');
        $hash = hash('sha256', date('m') . env("PASS"));

        if ($cookie_token != $hash) {
            return view('index');
        }
        else {
            // if already logged in, redirect to dashboard
            return redirect()->route('dashboard');
        }
    }
}
