<?php

namespace App\Services;

use App\Repositories\Contracts\TaskRepositoryInterface as ContractsTaskRepositoryInterface;

class DashboardService
{
    protected $taskRepository;

    public function __construct(ContractsTaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getDashboardData()
    {
        return [
            'upcomingTasks' => $this->taskRepository->getUpcomingTasks(),
            'overdueTasks' => $this->taskRepository->getOverdueTasks(),
        ];
    }
}
