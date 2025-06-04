import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function EditMembers({ project, members, allUsers, auth }) {
    const memberIds = members.map(user => user.id);

    const toggleMember = (userId) => {
        const isMember = memberIds.includes(userId);
        router.post(`/projects/${project.id}/add-members`, {
            user_id: userId,
            action: isMember ? 'remove' : 'add',
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Manage Team" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Manage Team: {project.name}
                    </h2>

                    <ul className="space-y-2">
                        {allUsers.map(user => {
                            const isMember = memberIds.includes(user.id);
                            return (
                                <li key={user.id} className="flex justify-between items-center border-b py-2">
                                    <span>{user.name}</span>
                                    <button
                                        onClick={() => toggleMember(user.id)}
                                        className={`px-3 py-1 rounded ${
                                            isMember
                                                ? 'bg-red-500 text-white hover:bg-red-600'
                                                : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                    >
                                        {isMember ? 'Remove' : 'Add'}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
