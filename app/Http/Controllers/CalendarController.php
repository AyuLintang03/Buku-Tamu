<?php
// app/Http/Controllers/CalenderController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calender;

class CalenderController extends Controller
{
    public function index()
    {
        $calender=Calender::all();
        return response()->json($calender);
    }

    public function store_calender(Request $request){
        $validated = $request->validate([
            'keterangan' =>'required',
            'tanggal_start' =>'required',
            'tanggal_end' =>'required',
        ]);
        $calender = Calender::create($validated);
        return response()->json(['message' => 'Data Berhasil', 'calender' => $calender], 201);
    }

}
