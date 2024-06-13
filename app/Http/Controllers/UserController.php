<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
         return response()->json($users);
    }

     public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|max:255',
            'user_name' => 'required|max:255',
            'email' => 'required|max:255',
            'nik' => 'required|max:255',
            'no_tlp' => 'required|max:255',
            'jabatan' => 'required|max:255',
            'bidang' => 'required|max:255',
            'alamat' => 'required|max:255',
            'password' => 'required',
            'role' => 'required',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json(['message' => 'Data Berhasil', 'user' => $user], 201);
    }

public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $validatedData = $request->validate([
        'username' => 'required|max:255',
        'user_name' => 'required|max:255',
        'email' => 'required|max:255',
        'nik' => 'required|max:255|unique:users,nik,' . $user->id,
        'no_tlp' => 'required|max:255',
        'jabatan' => 'required|max:255',
        'bidang' => 'required|max:255',
        'alamat' => 'required|max:255',
        'role' => 'required|max:255',
        'password' => 'nullable',
    ]);

    if ($request->filled('password')) {
        $validatedData['password'] = Hash::make($request->input('password'));
    } else { // Menghapus kunci 'password' dari array jika tidak diubah
        unset($validatedData['password']);
    }

    // Mengisi data yang tidak diubah dengan data lama
    $validatedData = array_merge($user->toArray(), $validatedData);

    $user->update($validatedData);

    return response()->json(['message' => 'Data Terupdate', 'user' => $user], 200);
}

public function destroy($id)
{
    $user = User::findOrFail($id);
    $user->delete();

    return response()->json(['message' => 'Data Hapus'], 200);
}

public function search(Request $request)
{
    $search = $request->input('search');
    $users = User::where('username', 'like', '%' . $search . '%')
                  ->orWhere('user_name', 'like', '%' . $search . '%')
                  ->orWhere('nik', 'like', '%' . $search . '%')
                  ->orWhere('no_tlp', 'like', '%' . $search . '%')
                  ->orWhere('jabatan', 'like', '%' . $search . '%')
                  ->orWhere('bidang', 'like', '%' . $search . '%')
                  ->get();

    return response()->json($users);
}

}
