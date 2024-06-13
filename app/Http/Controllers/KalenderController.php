<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calendar;
class KalenderController extends Controller
{
     public function index()
    {
        $events = Calendar::all();
        return response()->json($events);
    }
    public function store_calender(Request $request){
        $validated = $request->validate([
            'title' =>'required',
           'start' =>'required',
            'end' =>'required',
        ]);
        $events = Calendar::create($validated);
        return response()->json(['message' => 'Data Berhasil', 'events' => $events], 201);
    }
    public function destoy_calender($id){
        $events = Calendar::findOrFail($id);
        $events->delete();
        return response()->json(['message' => 'Data Berhasil Dihapus', 'events' => $events], 201);

    }
}
