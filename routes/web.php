<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/login', [AuthController::class, 'loginView'])->name('login');

// no auth required
Route::get('/media/:media/:user', function () {
    return view('index');
});

Route::group(['middleware' => 'auth'], function () {

    Route::get('/', function () { return view('index'); })->name('dashboard');
    Route::get('/media/all', function () { return view('index'); });
    Route::get('/media/:id', function () { return view('index'); });
    Route::get('/dashboard', function () { return view('index'); });
    Route::get('/user', function () { return view('index'); });
    Route::get('/analytics', function () { return view('index'); });

});

