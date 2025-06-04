<?php

namespace App\Services;

use App\Models\Project;
use App\Repositories\Contracts\ProjectRepositoryInterface;

class ProjectService
{
    protected ProjectRepositoryInterface $projectRepository;

    public function __construct(ProjectRepositoryInterface $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    public function createProject(array $data, int $ownerId): Project
    {
        $data['owner_id'] = $ownerId;
        return $this->projectRepository->create($data);
    }

    public function updateTeam(Project $project, array $userIds)
    {
        $this->projectRepository->updateTeam($project, $userIds);
    }

    public function updateTeamMembers($projectId, $userIds, $action = 'add')
    {
        $this->projectRepository->updateTeamMembers($projectId, $userIds, $action);
    }
}
