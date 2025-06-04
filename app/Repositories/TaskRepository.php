<?php

namespace App\Repositories;

use App\Models\Task;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Carbon\Carbon;

class TaskRepository implements TaskRepositoryInterface
{
    public function getAllTasks(array $filters, int $userId)
    {
        $query = Task::with(['project', 'assignee'])
            ->where('assigned_to', $userId)
            ->orWhere('owner_id', $userId);

        if (!empty($filters['project_id'])) {
            $query->where('project_id', $filters['project_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (!empty($filters['due_date'])) {
            $query->whereDate('due_date', $filters['due_date']);
        }

        return $query->latest()->get();
    }

    public function create(array $data): Task
    {
        return Task::create($data);
    }

    public function update(Task $task, array $data): bool
    {
        return $task->update($data);
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }

    public function findById(int $id): ?Task
    {
        return Task::find($id);
    }
    public function getUpcomingTasks(int $limit = 5)
    {
        return Task::whereDate('due_date', '>', Carbon::today())
            ->orderBy('due_date')
            ->take($limit)
            ->with('assignee')
            ->get();
    }

    public function getOverdueTasks()
    {
        return Task::whereDate('due_date', '<', Carbon::today())
            ->where('status', '!=', 'completed')
            ->orderBy('due_date')
            ->with('assignee')
            ->get();
    }
}
