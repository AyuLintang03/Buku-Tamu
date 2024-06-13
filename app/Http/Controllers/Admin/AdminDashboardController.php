<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckRole;
use App\Models\User;
use App\Models\BukuTamu;
class AdminDashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware(CheckRole::class . ':admin');
    }

public function index()
{
    return view('Homepage');
}

public function getData()
{
    $usersCount = User::count();
    $tamuTundaCount = BukuTamu::where('status', 'Tunda')->count();
    $tamuTotalCount = BukuTamu::count();

    $data = [
        'usersCount' => $usersCount,
        'tamuTundaCount' => $tamuTundaCount,
        'tamuTotalCount' => $tamuTotalCount,
    ];

    return response()->json($data);
}



}
