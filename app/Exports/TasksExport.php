<?php
namespace App\Exports;

use App\Models\Task;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TasksExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Task::select('id', 'title', 'description', 'status', 'due_date', 'created_at')->get();
    }

    public function headings(): array
    {
        return ['ID', 'Title', 'Description', 'Status', 'Due Date', 'Created At'];
    }
}

