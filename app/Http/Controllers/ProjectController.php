<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use App\Models\User;
use App\Services\ProjectService;
use App\Repositories\Contracts\ProjectRepositoryInterface;

class ProjectController extends Controller
{
    protected ProjectService $projectService;
    protected ProjectRepositoryInterface $projectRepository;

    public function __construct(ProjectService $projectService, ProjectRepositoryInterface $projectRepository)
    {
        $this->projectService = $projectService;
        $this->projectRepository = $projectRepository;
    }

    public function index()
    {
        $projects = $this->projectRepository->getProjectsForUser(auth()->id());

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function create()
    {
        $users = User::select('id', 'name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->get();
        return Inertia::render('Projects/Create', [
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $this->projectService->createProject($validated, auth()->id());

        return redirect()->route('projects.index')->with('success', 'Project created.');
    }

    public function updateTeam(Project $project, Request $request)
    {
        $request->validate([
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $this->projectService->updateTeam($project, $request->user_ids);

        return back()->with('success', 'Team updated.');
    }

    public function updateTeamMember(Request $request, $projectId)
    {
        $userIds = is_array($request->user_id) ? array_map('intval', $request->user_id) : [(int) $request->user_id];

        $action = $request->action ?? 'add';

        $this->projectRepository->updateTeamMembers($projectId, $userIds, $action);

        return redirect()->route('projects.index')->with('success', 'Members ' . $action . ' successfully!');
    }

    public function editMembers(Project $project)
    {
        $members = $project->users;
        $allUsers = User::select('id', 'name')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'Admin');
            })
            ->get();
        

        return Inertia::render('Projects/EditMembers', [
            'project' => $project,
            'members' => $members,
            'allUsers' => $allUsers,
        ]);
    }
}
