<?php

namespace App\Repositories;

use App\Models\Project;
use App\Repositories\Contracts\ProjectRepositoryInterface;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function getProjectsForUser(int $userId)
    {
        return Project::with(['users', 'tasks'])
            ->where('owner_id', $userId)
            ->orWhereHas('users', function ($query) use ($userId) {
                $query->where('id', $userId);
            })
            ->orWhereHas('tasks', function ($query) use ($userId) {
                $query->where('assigned_to', $userId);
            })
            ->latest()
            ->get();
    }

    public function create(array $data): Project
    {
        return Project::create($data);
    }

    public function updateTeam(Project $project, array $userIds): void
    {
        $project->users()->sync($userIds);
    }

    public function updateTeamMembers($projectId, array $userIds, string $action): void
    {
        $project = Project::findOrFail($projectId);
        $validUserIds = array_filter($userIds, function ($id) {
            return is_numeric($id) && $id > 0 && \App\Models\User::where('id', $id)->exists();
        });

        if ($action === 'remove') {
            $project->users()->detach($validUserIds);
        } else {
            $project->users()->syncWithoutDetaching($validUserIds);
        }
    }
}
