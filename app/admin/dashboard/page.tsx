"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    category: string;
    jobRole?: string;
    degree?: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState({ visitCount: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
                setStats(data.stats);
            } else {
                setError(data.error);
            }
        } catch (e) {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-green-500 font-mono">LOADING ADMIN PROTOCOLS...</div>;

    if (error) return (
        <div className="p-8 text-red-500 font-mono">
            <h1 className="text-2xl">ACCESS DENIED</h1>
            <p>{error}</p>
            <Link href="/portfolio" className="underline mt-4 block">Return to Safety</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 text-white font-mono p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-gray-700 pb-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl text-red-500 font-bold">ROOT ACCESS // ADMIN CONSOLE</h1>
                        <p className="text-xs text-gray-500">Welcome, Administrator Nithyananthan</p>
                    </div>
                    <Link href="/portfolio" className="text-gray-400 hover:text-white border border-gray-600 px-4 py-2 text-sm">
                        &larr; PORTFOLIO VIEW
                    </Link>
                </header>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-black border border-gray-800 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-6xl font-bold text-blue-500 group-hover:opacity-20 transition-all">U</div>
                        <div className="text-sm text-gray-500 mb-2">TOTAL USERS</div>
                        <div className="text-4xl font-bold text-blue-500">{users.length}</div>
                    </div>
                    <div className="bg-black border border-gray-800 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-6xl font-bold text-green-500 group-hover:opacity-20 transition-all">V</div>
                        <div className="text-sm text-gray-500 mb-2">TOTAL INCIDENTS (VIEWS)</div>
                        <div className="text-4xl font-bold text-green-500">{stats.visitCount}</div>
                    </div>
                    <div className="bg-black border border-gray-800 p-6 rounded-lg relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-4 opacity-10 text-6xl font-bold text-yellow-500 group-hover:opacity-20 transition-all">S</div>
                        <div className="text-sm text-gray-500 mb-2">SYSTEM INTEGRITY</div>
                        <div className="text-4xl font-bold text-yellow-500">100%</div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
                    <div className="p-4 bg-gray-900/50 border-b border-gray-800 flex justify-between items-center">
                        <h3 className="font-bold text-green-400">REGISTERED ENTITIES_LOG</h3>
                        <button onClick={fetchUsers} className="text-xs text-gray-500 hover:text-white">[REFRESH]</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="text-gray-500 bg-gray-900/30">
                                <tr>
                                    <th className="p-4 font-normal">TIMESTAMP</th>
                                    <th className="p-4 font-normal">IDENTITY</th>
                                    <th className="p-4 font-normal">EMAIL</th>
                                    <th className="p-4 font-normal">CATEGORY</th>
                                    <th className="p-4 font-normal">ROLE/DEGREE</th>
                                    <th className="p-4 font-normal">ACCESS LEVEL</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-900/40 transition-colors">
                                        <td className="p-4 text-gray-400 whitespace-nowrap">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-bold text-white">
                                            {user.name}
                                        </td>
                                        <td className="p-4 text-gray-400">
                                            {user.email}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${user.category === 'PROFESSIONAL' ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
                                                {user.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-white">
                                            {user.jobRole || user.degree || "-"}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs ${user.role === 'ADMIN' ? 'bg-red-900/30 text-red-500 border border-red-500' : 'text-gray-400'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {users.length === 0 && (
                            <div className="p-8 text-center text-gray-600">
                                NO RECORDS FOUND IN DATABASE
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
