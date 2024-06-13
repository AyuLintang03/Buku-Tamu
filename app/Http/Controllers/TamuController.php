<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BukuTamu;
use App\Models\User;

class TamuController extends Controller
{
    public function index()
{
    $Tamu = BukuTamu::with('user')->get();
    $Tamu->transform(function ($item) {
        $user = User::find($item->user_id);
        $item->user_name = $user->name; // Tambahkan properti baru user_name
        return $item;
    });
    return response()->json($Tamu);
}

public function index_tamu()
{
    $Tamu = BukuTamu::with('user')
        ->where('status', 'Selesai')
        ->get();

    $Tamu->transform(function ($item) {
        $user = User::find($item->user_id);
        $item->user_name = $user->name;
        return $item;
    });

    return response()->json($Tamu);
}

   public function store_tamu(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|max:255',
        'nik' => 'required|max:255',
        'user_id' => 'required|exists:users,id', // Ubah menjadi user_id
        'keperluan' => 'required|max:255',
        'tanggal' => 'required|max:255',
        'jam_masuk' => 'required|max:255',
        'jam_keluar' => 'required|max:255',
        'alamat' => 'required|max:255',
        'no_tlp_tamu' => 'required|max:255',
        'status' => 'required|max:255',
    ]);

    $user = User::findOrFail($validated['user_id']);
    $bukuTamu = $user->bukuTamus()->create($validated);

    return response()->json(['message' => 'Data Berhasil', 'bukuTamu' => $bukuTamu], 201);
}

public function update_tamu(Request $request, $id)
{
    $bukuTamu = BukuTamu::findOrFail($id);

    $validatedData = $request->validate([
        'name' => 'required|max:255',
        'nik' => 'required|max:255',
        'user_id' => 'required|exists:users,id', 
        'keperluan' => 'required|max:255',
        'tanggal' => 'required|max:255',
        'jam_masuk' => 'required|max:255',
        'jam_keluar' => 'required|max:255',
        'alamat' => 'required|max:255',
        'no_tlp_tamu' => 'required|max:255',
        'status' => 'required|max:255',
    ]);


    // Mengisi data yang tidak diubah dengan data lama
    $validatedData = array_merge($bukuTamu->toArray(), $validatedData);

    $bukuTamu->update($validatedData);

    return response()->json(['message' => 'Data Terupdate', 'user' => $bukuTamu], 200);
}


public function search_tamu(Request $request)
{
    $search = $request->input('search');
    $bukuTamu = BukuTamu::with('user')
        ->where(function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('keperluan', 'like', '%' . $search . '%')
                ->orWhereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', '%' . $search . '%')
                        ->orWhere('username', 'like', '%' . $search . '%');
                });
        })
        ->get();

    return response()->json($bukuTamu);
}




public function destroy_tamu($id)
{
    $bukuTamu = BukuTamu::findOrFail($id);
    $bukuTamu->delete();

    return response()->json(['message' => 'Data Hapus'], 200);
}


}
