<?php
namespace App\Repositories;

use App\Models\ActivityLog;
use App\Models\Task;
use App\Repositories\Contracts\ActivityLogRepositoryInterface;

class ActivityLogRepository implements ActivityLogRepositoryInterface
{
    public function log(Task $task, string $action, array $changes = []): void
    {
        ActivityLog::create([
            'task_id' => $task->id,
            'user_id' => auth()->id(),
            'action' => $action,
            'changes' => $changes,
        ]);
    }
}
