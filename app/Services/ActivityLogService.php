<?php
namespace App\Services;

use App\Models\Task;
use App\Repositories\Contracts\ActivityLogRepositoryInterface;

class ActivityLogService
{
    protected ActivityLogRepositoryInterface $activityLogRepository;

    public function __construct(ActivityLogRepositoryInterface $activityLogRepository)
    {
        $this->activityLogRepository = $activityLogRepository;
    }

    public function logTaskActivity(Task $task, string $action, array $changes = []): void
    {
        $this->activityLogRepository->log($task, $action, $changes);
    }
}
