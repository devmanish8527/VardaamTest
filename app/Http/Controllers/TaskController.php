<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use App\Services\TaskService;
use App\Services\CommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ActivityLogService;
use App\Exports\TasksExport;
use Maatwebsite\Excel\Facades\Excel;

class TaskController extends Controller
{
    protected TaskService $taskService;
    protected CommentService $commentService;
    protected ActivityLogService $activityLogService;

    public function __construct(TaskService $taskService, CommentService $commentService, ActivityLogService $activityLogService)
    {
        $this->taskService = $taskService;
        $this->commentService = $commentService;
        $this->activityLogService = $activityLogService;
    }

    public function index(Request $request)
    {
        $filters = $request->only(['project_id', 'assigned_to', 'status', 'priority', 'due_date']);
        $userId = auth()->id();

        $tasks = Task::with(['project', 'assignee'])
            ->when($filters['project_id'] ?? null, fn($q) => $q->where('project_id', $filters['project_id']))
            ->when($filters['assigned_to'] ?? null, fn($q) => $q->where('assigned_to', $filters['assigned_to']))
            ->when($filters['status'] ?? null, fn($q) => $q->where('status', $filters['status']))
            ->when($filters['priority'] ?? null, fn($q) => $q->where('priority', $filters['priority']))
            ->when($filters['due_date'] ?? null, fn($q) => $q->whereDate('due_date', $filters['due_date']))
            ->where(function ($query) use ($userId) {
                $query->where('assigned_to', $userId)
                    ->orWhere('owner_id', $userId)
                    ->orWhereHas('project.users', function ($q) use ($userId) {
                        $q->where('users.id', $userId);
                    });
            })
            ->latest()
            ->get();

        $users = User::select('id', 'name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->get();
        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'filters' => $filters,
            'projects' => Project::select('id', 'name')->get(),
            'users' => $users //User::select('id', 'name')->get(),
        ]);
    }


    public function create()
    {
        $users = User::select('id', 'name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->get();
        return Inertia::render('Tasks/Create', [
            'projects' => Project::select('id', 'name')->get(),
            'users' => $users, //User::select('id', 'name')->get(),
            'tasks' => Task::select('id', 'title')->get(),
        ]);
    }

    public function store(StoreTaskRequest $request, ActivityLogService $activityLogService)
    {
        $task = $this->taskService->create($request->validated());
        $activityLogService->logTaskActivity($task, 'task_created', [
            'status' => $task->status,
            'priority' => $task->priority,
            'due_date' => $task->due_date,
        ]);

        return redirect()->route('tasks.index')->with('success', 'Task created successfully!');
    }


    public function edit($id)
    {
        $task = $this->taskService->find($id);
        $users = User::select('id', 'name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->get();

        return Inertia::render('Tasks/Edit', [
            'task' => $task,
            'users' => $users,
        ]);
    }

    public function show(Task $task)
    {
        $task->load(['assignee', 'owner', 'project']);
        $comments = $this->commentService->getTaskComments($task);
        $activityLogs = $task->activityLogs()->with('user')->latest()->get();
        return Inertia::render('Tasks/Show', [
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'due_date' => $task->due_date,
                'priority' => $task->priority,
                'status' => $task->status,
                'created_at' => $task->created_at,
                'updated_at' => $task->updated_at,
                'project' => [
                    'id' => $task->project->id,
                    'name' => $task->project->name,
                ],
                'assignee' => $task->assignee ? [
                    'id' => $task->assignee->id,
                    'name' => $task->assignee->name,
                    'email' => $task->assignee->email,
                ] : null,
                'owner' => $task->owner ? [
                    'id' => $task->owner->id,
                    'name' => $task->owner->name,
                    'email' => $task->owner->email,
                ] : null,
            ],
            'auth' => [
                'user' => auth()->user(),
            ],
            'comments' => $comments,
            'activityLogs' => $activityLogs,
        ]);
    }


    public function update(StoreTaskRequest $request, Task $task, ActivityLogService $activityLogService)
    {
        $original = $task->only(['status', 'priority', 'due_date']);
        $this->taskService->update($task, $request->validated());
        foreach ($original as $field => $oldValue) {
            $newValue = $task->{$field};

            if ($oldValue !== $newValue) {
                $activityLogService->logTaskActivity($task, "{$field}_updated", [
                    'old' => $oldValue,
                    'new' => $newValue,
                ]);
            }
        }

        return redirect()->route('tasks.index')->with('success', 'Task updated successfully!');
    }


    public function destroy(Task $task)
    {
        $this->taskService->delete($task);
        return redirect()->route('tasks.index')->with('success', 'Task deleted successfully!');
    }

    public function export()
    {
        return Excel::download(new TasksExport, 'tasks_report.csv');
    }

    public function assignProject(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'task_ids' => 'required|array',
            'task_ids.*' => 'exists:tasks,id',
        ]);

        Task::whereIn('id', $request->task_ids)->update([
            'project_id' => $request->project_id,
        ]);

        return redirect()->route('tasks.index')->with('success', 'Tasks assigned to project successfully!');
    }
}
