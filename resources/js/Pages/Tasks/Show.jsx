import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, task, comments = [], activityLogs = [] }) {
  const { data, setData, post, processing, reset, errors } = useForm({
    comment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.comments.store', task.id), {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Task Details</h2>}
    >
      <Head title="Task Details" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          {/* Task Info */}
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="text-2xl font-bold mb-4">{task.title}</h3>
            <p className="mb-2"><strong>Description:</strong> {task.description}</p>
            <p className="mb-2"><strong>Due Date:</strong> {task.due_date}</p>
            <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
            <p className="mb-2"><strong>Status:</strong> {task.status}</p>
            <p className="mb-2"><strong>Project:</strong> {task.project ? `${task.project.name} (ID: ${task.project.id})` : '—'}</p>
            <p className="mb-2"><strong>Assigned To:</strong> {task.assignee ? `${task.assignee.name} (${task.assignee.email})` : '—'}</p>
            <p className="mb-2"><strong>Owner:</strong> {task.owner ? `${task.owner.name} (${task.owner.email})` : '—'}</p>
            <p className="text-sm text-gray-500">Created At: {new Date(task.created_at).toLocaleString()}</p>
            <p className="text-sm text-gray-500">Updated At: {new Date(task.updated_at).toLocaleString()}</p>

            <div className="mt-6">
              <Link
                href={route('tasks.index')}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Back to Tasks
              </Link>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white mt-8 p-6 rounded shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Activity Log</h4>
            {activityLogs.length === 0 ? (
              <p className="text-gray-500">No activity yet.</p>
            ) : (
              <ul className="space-y-4">
                {activityLogs.map((log) => {
                  let parsedChanges = null;
                  try {
                    parsedChanges = typeof log.changes === 'string' ? JSON.parse(log.changes) : log.changes;
                  } catch (e) {
                    parsedChanges = null;
                  }

                  return (
                    <li key={log.id} className="border-b pb-2 text-sm">
                      <p>
                        <strong>{log.user?.name || 'System'}</strong> performed action: <em>{log.action}</em>
                        {' '}at <span className="text-gray-500">{new Date(log.created_at).toLocaleString()}</span>
                      </p>
                      {parsedChanges && log.action !== 'task_created' && (
                        <div className="ml-4 text-gray-700">
                          <p>Old: {JSON.stringify(parsedChanges.old)}</p>
                          <p>New: {JSON.stringify(parsedChanges.new)}</p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white mt-8 p-6 rounded shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Comments</h4>

            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li key={comment.id} className="border-b pb-2">
                    <p className="text-sm">
                      <strong>{comment.user?.name || 'Unknown'}</strong> &middot;{' '}
                      <span className="text-gray-500">
                        {new Date(comment.created_at).toLocaleString()}
                      </span>
                    </p>
                    <p>{comment.comment}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="mt-6">
              <textarea
                name="comment"
                value={data.comment}
                onChange={(e) => setData('comment', e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
                placeholder="Write a comment..."
                required
              />
              {errors.comment && (
                <p className="text-sm text-red-600 mt-1">{errors.comment}</p>
              )}
              <button
                type="submit"
                disabled={processing}
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

