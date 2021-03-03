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

        /////////////////////
        // MediaController //
        /////////////////////
        Route::get('media/all', [App\Http\Controllers\API\MediaController::class, 'getAllMedia'])->name('all_media');
        Route::get('pdf/latest', [App\Http\Controllers\API\MediaController::class, 'getLatestPDF'])->name('latest_pdf');
        Route::get('media/{id}', [App\Http\Controllers\API\MediaController::class, 'getMedia'])->name('get_media');
        Route::get('media/{id}/comments', [App\Http\Controllers\API\MediaController::class, 'getMediaComments'])->name('get_media_comments');
        Route::post('media', [App\Http\Controllers\API\MediaController::class, 'uploadMedia'])->name('upload_media');
        //
        Route::post('media/{id}/like', [App\Http\Controllers\API\MediaController::class, 'like'])->name('like_media');
        Route::post('media/{id}/share', [App\Http\Controllers\API\MediaController::class, 'share'])->name('share_media');
        Route::post('media/{id}/comment', [App\Http\Controllers\API\MediaController::class, 'comment'])->name('comment');
        Route::post('media/{media_id}/{user_id}/view', [App\Http\Controllers\API\MediaController::class, 'view'])->name('view_media');
        // 
        Route::post('media/{id}/open', [App\Http\Controllers\API\MediaController::class, 'media_open'])->name('media_open');
        Route::post('media/{id}/bounce', [App\Http\Controllers\API\MediaController::class, 'media_bounce'])->name('media_bounce');
        Route::post('media/{id}/engage', [App\Http\Controllers\API\MediaController::class, 'media_engage'])->name('media_engage');
        //
        Route::get('media/{id}/distributors', [App\Http\Controllers\API\AnalyticsController::class, 'getDistributors'])->name('get_distributors');
        // 
        Route::delete('media/{id}', [App\Http\Controllers\API\MediaController::class, 'deleteMedia'])->name('delete_media');


        /////////////////////////
        // AnalyticsController //
        /////////////////////////
        Route::get('analytics/stats', [App\Http\Controllers\API\AnalyticsController::class, 'getTotalStats'])->name('get_stats');
        Route::get('analytics/behaviours', [App\Http\Controllers\API\AnalyticsController::class, 'getUsersBehaviour'])->name('get_behaviour');
        Route::get('analytics/distributors', [App\Http\Controllers\API\AnalyticsController::class, 'getDistributors'])->name('get_distributors');
        Route::get('analytics/performance', [App\Http\Controllers\API\AnalyticsController::class, 'getPerformance'])->name('get_performance');


        Route::get('test', function () {
            return response(123);
        });
    });
});
