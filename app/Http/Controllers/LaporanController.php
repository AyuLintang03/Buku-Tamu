<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BukuTamu;
use App\Models\User;
class LaporanController extends Controller
{
   public function search_tamu(Request $request)
{
    $search = $request->input('search');
    $tanggal = $request->input('tanggal');

    $bukuTamu = BukuTamu::with('user')
        ->when($search, function ($query) use ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('keperluan', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', '%' . $search . '%')
                            ->orWhere('username', 'like', '%' . $search . '%');
                    });
            });
        })
        ->when($tanggal, function ($query) use ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
        })
        ->get();

    return response()->json($bukuTamu);
}


}
