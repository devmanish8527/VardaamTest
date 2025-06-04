<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Services\CommentService;
use Inertia\Inertia;

class CommentController extends Controller
{
    protected CommentService $commentService;

    public function __construct(CommentService $commentService)
    {
        $this->commentService = $commentService;
    }

    public function store(Request $request, Task $task)
    {
        $request->validate([
            'comment' => 'required|string|max:1000',
        ]);

        $this->commentService->addComment($task, $request->comment, auth()->id());

        return back()->with('success', 'Comment added successfully.');
    }

    public function index(Task $task)
    {
        $comments = $this->commentService->getTaskComments($task);

        return Inertia::render('Tasks/Show', [
            'task' => $task->load(['project']),
            'comments' => $comments,
            'auth' => ['user' => auth()->user()],
        ]);
    }
}

