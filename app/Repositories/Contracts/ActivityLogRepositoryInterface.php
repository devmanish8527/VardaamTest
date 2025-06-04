<?php
namespace App\Repositories\Contracts;

use App\Models\Task;

interface ActivityLogRepositoryInterface
{
    public function log(Task $task, string $action, array $changes = []): void;
}
