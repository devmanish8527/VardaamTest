<?php

namespace App\Notifications;

use App\Models\Task;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TaskStatusChanged extends Notification implements ShouldQueue
{
    use Queueable;

    protected Task $task;

    /**
     * Create a new notification instance.
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database']; // Enables email and in-app notifications
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Task Status Updated: {$this->task->title}")
            ->line("The status of the task '{$this->task->title}' has been changed to '{$this->task->status}'.")
            ->action('View Task', url("/tasks/{$this->task->id}"))
            ->line('Thank you for staying up to date!');
    }

    /**
     * Get the array representation for database notification.
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'type' => 'task_status_update',
            'task_id' => $this->task->id,
            'title' => $this->task->title,
            'status' => $this->task->status,
            'message' => "The task '{$this->task->title}' status changed to '{$this->task->status}'.",
        ];
    }

    /**
     * Optional: Array form (not usually used unless broadcasting)
     */
    public function toArray(object $notifiable): array
    {
        return $this->toDatabase($notifiable);
    }
}
