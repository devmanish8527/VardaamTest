import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, task, users = [] }) => {
  const { data, setData, put, processing, errors } = useForm({
    title: task.title || '',
    description: task.description || '',
    due_date: task.due_date ? task.due_date.split(' ')[0] : '',
    priority: task.priority || 'Medium',
    status: task.status || 'To Do',
    assigned_to: task.assigned_to || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('tasks.update', task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Task</h2>}
    >
      <Head title="Edit Task" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded shadow">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                  rows="4"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={data.due_date}
                  onChange={(e) => setData('due_date', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={data.priority}
                  onChange={(e) => setData('priority', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select Priority --</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">-- Select Status --</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="Blocked">Blocked</option>
                </select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>

              {/* Assign To */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Assign To</label>
                <select
                  value={data.assigned_to}
                  onChange={(e) => setData('assigned_to', e.target.value)}
                  className="mt-1 w-full border rounded px-3 py-2"
                >
                  <option value="">-- Select --</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Updating...' : 'Update Task'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
