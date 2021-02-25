<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

use Closure;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            return route('login');
        }
    }


    /**
     * check if the cookie AUTH_TOKEN is present, if so then verify it 
     *
     * @param      <type>   $request    The request
     * @param      Closure  $next       next middleware
     * @param      <type>   ...$guards  guards
     *
     */
    public function handle($request, Closure $next, ...$guards)
    {
        $cookie_token = $request->cookie('AUTH_TOKEN');
        $header_token = $request->header('AUTH_TOKEN');

        $token = $header_token ?: $cookie_token;

        if ($token) {
            // check App\Http\Controllers\AuthController
            // 
            // The token (after authentication) is the hash(256) of 
            // the concatenation of the month when the user signed in
            // and the password
            $hash = hash('sha256', date('m') . env("PASS"));

            if ($hash == $token) {
                return $next($request);
            }
        }

        return ($request->expectsJson())
                ? response()->json([
                    'success' => false,
                    'message' => "Unauthenticated",
                ], 403)
                : redirect('/login');
    }
}
