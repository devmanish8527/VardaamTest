<?php

namespace App\Repositories\Contracts;

use App\Models\Project;

interface ProjectRepositoryInterface
{
    public function getProjectsForUser(int $userId);
    public function create(array $data): Project;
    public function updateTeam(Project $project, array $userIds): void;
    public function updateTeamMembers($projectId, array $userIds, string $action): void;
}
