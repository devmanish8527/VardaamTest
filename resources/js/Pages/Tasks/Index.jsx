import React, { useState } from 'react';
import TaskDeleteButton from '@/Components/TaskDeleteButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ auth }) {
  const { tasks = [], filters = {}, projects = [], users = [] } = usePage().props;

  const [filter, setFilter] = useState({
    project_id: filters.project_id || '',
    assigned_to: filters.assigned_to || '',
    status: filters.status || '',
    priority: filters.priority || '',
    due_date: filters.due_date || '',
  });
  const [assignProjectId, setAssignProjectId] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const allTaskIds = tasks.map(task => task.id);
  const isAllSelected = tasks.length > 0 && selectedTasks.length === tasks.length;

  const toggleSelectAll = () => {
    setSelectedTasks(isAllSelected ? [] : [...allTaskIds]);
  };

  const toggleSelectOne = (id) => {
    setSelectedTasks(prev =>
      prev.includes(id) ? prev.filter(taskId => taskId !== id) : [...prev, id]
    );
  };

  const applyFilters = (e) => {
    e.preventDefault();
    router.get(route('tasks.index'), filter, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  const assignTasksToProject = (e) => {
    e.preventDefault();
    if (!assignProjectId || selectedTasks.length === 0) return;

    router.post(route('tasks.assignProject'), {
      project_id: assignProjectId,
      task_ids: selectedTasks,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setSelectedTasks([]);
        setAssignProjectId('');
      }
    });
  };

  const badgeColors = {
    'To Do': 'bg-gray-200 text-gray-800',
    'In Progress': 'bg-yellow-200 text-yellow-800',
    'Done': 'bg-green-200 text-green-800',
    'Blocked': 'bg-red-200 text-red-800',
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="text-xl font-semibold text-gray-800">Tasks</h2>}
    >
      <Head title="Tasks" />
      <div className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white p-6 rounded-lg shadow-md">

            {/* Header & Create Button */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800"></h1>
              <Link
                href={route('tasks.create')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                + Create Task
              </Link>
            </div>

            {/* Filter Form */}
            <form onSubmit={applyFilters} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
              <select value={filter.project_id} onChange={e => setFilter({ ...filter, project_id: e.target.value })} className="border-gray-300 rounded-md p-2">
                <option value="">All Projects</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>

              <select value={filter.assigned_to} onChange={e => setFilter({ ...filter, assigned_to: e.target.value })} className="border-gray-300 rounded-md p-2">
                <option value="">All Assignees</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>

              <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })} className="border-gray-300 rounded-md p-2">
                <option value="">All Statuses</option>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
                <option>Blocked</option>
              </select>

              <select value={filter.priority} onChange={e => setFilter({ ...filter, priority: e.target.value })} className="border-gray-300 rounded-md p-2">
                <option value="">All Priorities</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <input type="date" value={filter.due_date} onChange={e => setFilter({ ...filter, due_date: e.target.value })} className="border-gray-300 rounded-md p-2" />

              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Apply
                </button>
                <a href={route('tasks.export')} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Export
                </a>
              </div>
            </form>

            {/* Bulk Assign */}
            {selectedTasks.length > 0 && (
              <form onSubmit={assignTasksToProject} className="flex items-center space-x-4 mb-6">
                <select
                  value={assignProjectId}
                  onChange={e => setAssignProjectId(e.target.value)}
                  className="border-gray-300 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select Project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Assign to Project
                </button>
              </form>
            )}

            {/* Tasks Table */}
            {tasks.length > 0 ? (
              <div className="overflow-auto">
                <table className="min-w-full border rounded-lg border-gray-200">
                  <thead className="bg-gray-100 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3">
                        <input
                          type="checkbox"
                          onChange={toggleSelectAll}
                          checked={isAllSelected}
                        />
                      </th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Title</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Due Date</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Priority</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {tasks.map(task => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => toggleSelectOne(task.id)}
                          />
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{task.title}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[task.status] || 'bg-gray-200 text-gray-800'}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{task.due_date}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${badgeColors[task.priority] || 'bg-gray-100 text-gray-800'}`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm flex space-x-3">
                          <Link href={route('tasks.edit', task.id)} className="text-indigo-600 hover:underline">Edit</Link>
                          <TaskDeleteButton task={task} />
                          <Link href={route('tasks.show', task.id)} className="text-blue-600 hover:underline">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">No tasks found.</div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
