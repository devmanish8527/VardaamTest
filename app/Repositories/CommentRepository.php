<?php

namespace App\Repositories;

use App\Models\Comment;
use App\Models\Task;
use App\Repositories\Contracts\CommentRepositoryInterface;
use Illuminate\Support\Collection;

class CommentRepository implements CommentRepositoryInterface
{
    public function create(array $data): Comment
    {
        return Comment::create($data);
    }

    public function getByTask(Task $task): Collection
    {
        return $task->comments()->with('user')->latest()->get();
    }
}
