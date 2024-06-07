<?php

namespace App\Http\Controllers\Operator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Middleware\CheckRole;
use app\Model\User;

class OperatorDashboardController extends Controller
{
     public function __construct()
    {
        $this->middleware(CheckRole::class . ':operator');
    }

    public function index()
    {
        return view('Homepage');
    }
}
