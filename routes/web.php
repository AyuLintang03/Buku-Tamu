<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Operator\OperatorDashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TamuController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\KalenderController;

Route::get('/', function () {
    return view('homepage');
});

Route::get('login', [LoginController::class, 'showLoginForm'])->name('login'); // Optional for React
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');
//<meta name="csrf-token" content="{{ csrf_token() }}">*

Route::prefix('admin')->middleware(['auth', 'checkRole:admin'])->group(function () {
    Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('AdminDashboard');
    Route::get('dashboard/data', [AdminDashboardController::class, 'getData']);
    Route::get('kalender', [KalenderController::class, 'index']);
    Route::post('/kalender/create', [KalenderController::class, 'store_calender']);
    Route::delete('/kalender/delete/{id}', [KalenderController::class, 'destoy_calender']);
    Route::get('datakaryawan', [UserController::class, 'index']);
    Route::post('datakaryawan/create', [UserController::class, 'store']);
    Route::put('datakaryawan/{id}', [UserController::class, 'update']);
    Route::delete('datakaryawan/{id}', [UserController::class, 'destroy']);
    Route::get('/datakaryawan/search', [UserController::class, 'search']);
    Route::get('daftartamu',[TamuController::class, 'index']);
    Route::post('daftartamu/create', [TamuController::class,'store_tamu']);
    route::put('daftartamu/{id}', [TamuController::class, 'update_tamu']);
    route::delete('daftartamu/{id}', [TamuController::class, 'destroy_tamu']);
    Route::get('/daftartamu/search', [TamuController::class,'search_tamu']);
    Route::get('/bukutamu', [TamuController::class, 'index_tamu']);
    route::get('/laporan/search', [LaporanController::class,'search_tamu']);
});

Route::prefix('operator')->middleware(['auth', 'checkRole:operator'])->group(function () {
    Route::get('dashboard', [OperatorDashboardController::class, 'index'])->name('OperatorDashboard');

});

