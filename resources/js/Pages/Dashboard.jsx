import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { CalendarDays, AlertCircle } from 'lucide-react';

export default function Dashboard({ auth, upcomingTasks = [], overdueTasks = [] }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Upcoming Tasks Card */}
                        <div className="bg-white shadow rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <CalendarDays className="text-indigo-600" size={20} />
                                <h3 className="text-lg font-semibold text-indigo-700">Upcoming Deadlines</h3>
                            </div>

                            {upcomingTasks.length > 0 ? (
                                <ul className="space-y-3">
                                    {upcomingTasks.map(task => (
                                        <li key={task.id} className="border border-indigo-100 rounded p-3 hover:bg-indigo-50 transition">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{task.title}</span>
                                                <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                                                    Due: {task.due_date}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No upcoming tasks.</p>
                            )}
                        </div>

                        {/* Overdue Tasks Card */}
                        <div className="bg-white shadow rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="text-red-600" size={20} />
                                <h3 className="text-lg font-semibold text-red-700">Overdue Tasks</h3>
                            </div>

                            {overdueTasks.length > 0 ? (
                                <ul className="space-y-3">
                                    {overdueTasks.map(task => (
                                        <li key={task.id} className="border border-red-100 rounded p-3 hover:bg-red-50 transition">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{task.title}</span>
                                                <span className="text-sm bg-red-100 text-red-700 px-2 py-0.5 rounded">
                                                    Due: {task.due_date}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic">No overdue tasks.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
