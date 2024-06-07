<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Operator\OperatorDashboardController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return view('homepage');
});

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login'); // Optional for React
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');
//<meta name="csrf-token" content="{{ csrf_token() }}">*

Route::prefix('admin')->middleware(['auth', 'checkRole:admin'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('AdminDashboard');
    Route::get('datakaryawan', [UserController::class, 'index']);
    Route::get('dashboard/total_pegawai', [AdminDashboardController::class, 'getTotalPegawai']);
    Route::post('datakaryawan/create', [UserController::class, 'store']);
    Route::put('datakaryawan/{id}', [UserController::class, 'update']);
    Route::delete('datakaryawan/{id}', [UserController::class, 'destroy']);
    Route::get('/datakaryawan/search', [UserController::class, 'search']);

    
});

Route::prefix('operator')->middleware(['auth', 'checkRole:operator'])->group(function () {
    Route::get('dashboard', [OperatorDashboardController::class, 'index'])->name('OperatorDashboard');

});

