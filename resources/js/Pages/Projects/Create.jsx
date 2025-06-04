import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Create({ users = [], auth }) {
    const [form, setForm] = useState({
        name: '',
        description: '',
        user_ids: [],
    });

    const handleChange = (e) => {
        const { name, value, type,  } = e.target;
       setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/projects', form);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Project" />
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <div className="p-6 max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-medium">Project Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="mt-1 w-full border p-2 rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="mt-1 w-full border p-2 rounded"
                            />
                        </div>

                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                            Create Project
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
