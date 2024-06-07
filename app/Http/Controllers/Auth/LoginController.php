<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        //return view('auth.login'); // You won't need this if using a React front-end
        return view('Homepage');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('login', 'password');
        
        // Determine if login input is an email or username
        $loginType = filter_var($request->input('login'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        
        $request->merge([$loginType => $credentials['login']]);
        
        // Attempt authentication
        if (Auth::attempt([$loginType => $credentials['login'], 'password' => $credentials['password']])) {
            $request->session()->regenerate();
            $user = Auth::user();

            return response()->json([
                'success' => true,
                'redirect' => $user->role === 'admin' ? 'admin/dashboard' : 'operator/dashboard'
            ]);
        }

        throw ValidationException::withMessages([
            'login' => ['The provided credentials do not match our records.'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
