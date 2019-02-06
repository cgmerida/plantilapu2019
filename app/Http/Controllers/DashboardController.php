<?php

namespace App\Http\Controllers;

use App\Central;
use App\Department;
use App\Mayor;
use App\Municipality;
use App\National;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:admin.dash');
    }

    public function index(Request $request)
    {
        return view('admin.dashboard.index');
    }
}
