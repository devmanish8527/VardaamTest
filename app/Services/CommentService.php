<?php

namespace App\Services;

use App\Models\Task;
use App\Repositories\Contracts\CommentRepositoryInterface;

class CommentService
{
    protected CommentRepositoryInterface $commentRepo;

    public function __construct(CommentRepositoryInterface $commentRepo)
    {
        $this->commentRepo = $commentRepo;
    }

    public function addComment(Task $task, string $commentText, int $userId)
    {
        return $this->commentRepo->create([
            'task_id' => $task->id,
            'user_id' => $userId,
            'comment' => $commentText,
        ]);
    }

    public function getTaskComments(Task $task)
    {
        return $this->commentRepo->getByTask($task);
    }
}
