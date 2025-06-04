<?php

namespace App\Repositories\Contracts;

use App\Models\Task;

interface TaskRepositoryInterface
{
    public function getAllTasks(array $filters, int $userId);
    public function create(array $data): Task;
    public function update(Task $task, array $data): bool;
    public function delete(Task $task): bool;
    public function findById(int $id): ?Task;
    public function getUpcomingTasks(int $limit = 5);
    public function getOverdueTasks();
}
