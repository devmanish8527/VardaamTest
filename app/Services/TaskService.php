<?php

namespace App\Services;

use App\Models\Task;
use Illuminate\Support\Facades\DB;
use App\Repositories\Contracts\TaskRepositoryInterface;
use App\Notifications\TaskAssigned;
use App\Notifications\TaskStatusChanged;

class TaskService
{
    protected TaskRepositoryInterface $taskRepository;


    public function __construct(TaskRepositoryInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function getAllTasks(array $filters, int $userId)
    {
        return $this->taskRepository->getAllTasks($filters, $userId);
    }

    public function create(array $data): Task
    {
        $task = $this->taskRepository->create($data);

        // Notify the assignee if set
        if (isset($task->assignee)) {
            $task->assignee->notify(new TaskAssigned($task));
        }

        return $task;
    }

    public function update(Task $task, array $data): bool
    {
        $oldStatus = $task->status;
        $updated = $this->taskRepository->update($task, $data);
        $task->refresh();
        if ($updated && isset($data['status']) && $data['status'] !== $oldStatus) {
            $task->assignee->notify(new TaskStatusChanged($task, $data['status']));
        }

        return $updated;
    }


    public function delete(Task $task): bool
    {
        return $this->taskRepository->delete($task);
    }

    public function find(int $id): ?Task
    {
        return $this->taskRepository->findById($id);
    }
}
