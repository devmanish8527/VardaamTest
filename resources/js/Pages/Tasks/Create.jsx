import React from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const TaskCreate = ({ auth, users = [], projects = [] }) => {
  const { data, setData, post, processing, errors } = useForm({
    owner_id: auth.user.id,
    project_id: '',
    title: '',
    description: '',
    due_date: '',
    priority: 'Low',
    status: 'To Do',
    assigned_to: '',
    dependencies: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('tasks.store'), {
      forceFormData: true,
      onSuccess: () => {
        router.visit(route('tasks.index'));
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Task</h2>}
    >
      <Head title="Create Task" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded shadow">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Title */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Title</label>
                <div className="flex-1">
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>
              </div>

              {/* Description */}
              <div className="flex items-start">
                <label className="w-40 text-sm font-medium text-gray-700 mt-2">Description</label>
                <div className="flex-1">
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    rows="3"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Due Date</label>
                <div className="flex-1">
                  <input
                    type="date"
                    value={data.due_date}
                    onChange={(e) => setData('due_date', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Priority</label>
                <div className="flex-1">
                  <select
                    value={data.priority}
                    onChange={(e) => setData('priority', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Status</label>
                <div className="flex-1">
                  <select
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>

              {/* Assign To */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Assign To</label>
                <div className="flex-1">
                  <select
                    value={data.assigned_to}
                    onChange={(e) => setData('assigned_to', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">-- Select --</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project */}
              <div className="flex items-center">
                <label className="w-40 text-sm font-medium text-gray-700">Project</label>
                <div className="flex-1">
                  <select
                    value={data.project_id}
                    onChange={(e) => setData('project_id', e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Saving...' : 'Create Task'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default TaskCreate;
