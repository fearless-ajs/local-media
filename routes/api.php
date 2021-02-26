<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['middleware' => ['cors', 'json.response', 'throttle:60,1']], function () {
    // auth
    Route::post('login', [AuthController::class, 'login']);

    // protected routes
    Route::group(['middleware' => 'auth'], function () {

        ////////////////////
        // UserController //
        ////////////////////
        Route::get('users', [App\Http\Controllers\API\UserController::class, 'getUsers'])->name('all_users');
        Route::post('user', [App\Http\Controllers\API\UserController::class, 'addUser'])->name('add_user');
        Route::delete('user/{id}', [App\Http\Controllers\API\UserController::class, 'deleteUser'])->name('delete_user');
        Route::get('test', function () {
            return response(123);
        });
    });
});
