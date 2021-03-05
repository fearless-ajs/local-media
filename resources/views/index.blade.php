<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @extends('base')

    <?php
        if (strpos($_SERVER['REQUEST_URI'], 'login') !== false) {
    ?>

    <title>Media Distributor - Login</title>
    <link rel="stylesheet" type="text/css" href="{{ asset('/vendor/bootstrap/css/bootstrap.min.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('fonts/font-awesome-4.7.0/css/font-awesome.min.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('fonts/Linearicons-Free-v1.0.0/icon-font.min.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('vendor/animate/animate.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/auth.util.css') }}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('css/auth.main.css') }}"/>
    <?php
        } else {
    ?>
    <title>Media Distribuitor</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css" />
    <?php
    }
    ?>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <!-- React root DOM -->
    <div id="app"> </div>

    <!-- React JS -->
    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
