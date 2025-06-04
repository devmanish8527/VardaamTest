<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class,'project_user', 'project_id', 'user_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members()
    {
        return $this->belongsToMany(User::class, 'project_user');
    }
}
