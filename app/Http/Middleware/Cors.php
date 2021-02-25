<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $IlluminateResponse = 'Illuminate\Http\Response';
        $SymfonyResponse = 'Symfony\Component\HttpFoundation\Response';

        $headers = [
            'Access-Control-Allow-Origin'  =>  '*',
            'Access-Control-Allow-Methods' =>  'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' =>  'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
        ];

        foreach ($headers as $key => $value) {
            if ($response instanceof $IlluminateResponse) {
                $response->header($key, $value);
            }
            if ($response instanceof $SymfonyResponse) {
                $response->headers->set($key, $value);
            }
        }

        return $response;
    }
}
