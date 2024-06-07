<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckRole;
use App\Models\User;
class AdminDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(CheckRole::class . ':admin');
    }

    public function index()
    {
        $usersCount = User::count();
         return view('Homepage', compact('usersCount'));
    }
}
