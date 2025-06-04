<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\TasksExport;
use Maatwebsite\Excel\Facades\Excel;

class TaskExportController extends Controller
{
    public function export()
    {
        return Excel::download(new TasksExport, 'tasks_report.csv');
    }
}
