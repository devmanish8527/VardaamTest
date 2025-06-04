<?php
namespace App\Repositories\Contracts;

use App\Models\Task;
use Illuminate\Support\Collection;

interface CommentRepositoryInterface
{
    public function create(array $data): mixed;
    public function getByTask(Task $task): Collection;
}
