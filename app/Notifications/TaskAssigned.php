<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class TaskAssigned extends Notification implements ShouldQueue
{
    use Queueable;

    protected $task;

    public function __construct($task)
    {
        $this->task = $task;
    }

    public function via($notifiable)
    {
        return ['mail', 'database', 'broadcast']; // For email, in-app, and real-time
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('New Task Assigned')
                    ->line("You have been assigned to task: {$this->task->title}")
                    ->action('View Task', url("/tasks/{$this->task->id}"));
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "You were assigned to task: {$this->task->title}",
            'task_id' => $this->task->id,
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => "You were assigned to task: {$this->task->title}",
            'task_id' => $this->task->id,
        ]);
    }
    public function toDatabase($notifiable)
{
    return [
        'type' => 'assignment',
        'message' => "You have been assigned to task: {$this->task->title}",
        'task_id' => $this->task->id,
    ];
}
}

