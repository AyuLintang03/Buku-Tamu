<?php
// app/Http/Controllers/CalenderController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Calender;

class CalenderController extends Controller
{
    public function index()
    {
        return Calender::all();
    }

    public function store(Request $request)
    {
        $event = Calender::create($request->all());
        return response()->json($event, 201);
    }

    public function show($id)
    {
        return Calender::find($id);
    }

    public function update(Request $request, $id)
    {
        $event = Calender::findOrFail($id);
        $event->update($request->all());
        return response()->json($event, 200);
    }

    public function destroy($id)
    {
        Calender::destroy($id);
        return response()->json(null, 204);
    }
}
