<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }


    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id', 'id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }
}
