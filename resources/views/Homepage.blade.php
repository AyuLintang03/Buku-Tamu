
<!DOCTYPE html>
<html>
    <head>
        
         <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="icon" type="image/png" href="{{ asset('build/assets/images/logo.png') }}" >
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>DKP LAMPUNG</title>

        @viteReactRefresh
        @vite('resources/js/main.jsx')
    </head>
    <body>
        
        <div id="main"></div>
    </body>
</html>
