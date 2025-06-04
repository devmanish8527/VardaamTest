<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *To Do', 'In Progress', 'Done', 'Blocked')	
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date|after_or_equal:today',
            'assigned_to' => 'nullable|exists:users,id',
            'owner_id' => 'nullable',
            'priority' => 'required|in:Low,Medium,High',
            'status' => 'required|in:To Do,In Progress,Done,Blocked',
            'created_at' => 'nullable|date',
            'updated_at' => 'nullable|date',
            'project_id' => 'nullable|exists:projects,id',
        ];
    }
}
