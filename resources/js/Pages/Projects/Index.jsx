import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ projects = [], auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800"></h1>
                        <Link
                            href="/projects/create"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
                        >
                            + New Project
                        </Link>
                    </div>

                    {projects.length === 0 ? (
                        <p className="text-gray-500 italic">You have no projects yet.</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {projects.map(project => (
                                <div
                                    key={project.id}
                                    className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
                                >
                                    <h2 className="text-lg font-semibold text-blue-700 mb-1">
                                        {project.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-3">
                                        {project.description}
                                    </p>

                                    {/* Tasks */}
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Tasks:</h3>
                                        {Array.isArray(project.tasks) && project.tasks.length > 0 ? (
                                            <ul className="space-y-1 text-sm">
                                                {project.tasks.map(task => (
                                                    <li
                                                        key={task.id}
                                                        className="border-l-4 border-blue-500 pl-3"
                                                    >
                                                        <span className="font-medium">✔️ {task.title}</span><br />
                                                        <span className="text-xs text-gray-500">
                                                            Status: <span className="capitalize">{task.status}</span> | 📅 Due: {task.due_date}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">
                                                No tasks assigned yet.
                                            </p>
                                        )}
                                    </div>

                                    {/* Team Members */}
                                    <div className="mb-4">
                                        <h3 className="text-sm font-semibold text-gray-700 mb-1">Team Members : 
                                            <Link
                                                href={`/projects/${project.id}/members`}
                                                className="text-sm text-blue-600 font-medium"
                                            >
                                                ⚙️ Manage Team
                                            </Link></h3>
                                        {Array.isArray(project.users) && project.users.length > 0 ? (
                                            <ul className="list-disc list-inside text-sm text-gray-600">
                                                {project.users.map(user => (
                                                    <li key={user.id} className="flex items-center space-x-2 text-sm text-gray-700 mt-2">
                                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                                                            👤
                                                        </div>
                                                        <span className="font-medium border border-gray-300 px-2 py-1 rounded">{user.name}</span>
                                                    </li>

                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-xs text-gray-400 italic">No members yet.</p>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
