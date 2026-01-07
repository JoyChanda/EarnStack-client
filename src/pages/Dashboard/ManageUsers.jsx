import { Card, Button } from '../../components/ui';

const ManageUsers = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Worker", coins: 450, status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Buyer", coins: 1200, status: "Active" },
        { id: 3, name: "Admin King", email: "admin@earnstack.com", role: "Admin", coins: 5000, status: "Active" },
        { id: 4, name: "Trouble Maker", email: "bad@example.com", role: "Worker", coins: 10, status: "Banned" }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-black">Manage Users</h1>
            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 text-xs font-bold uppercase text-neutral-400">
                                <th className="pb-4 px-2">User</th>
                                <th className="pb-4 px-2">Role</th>
                                <th className="pb-4 px-2">Coins</th>
                                <th className="pb-4 px-2">Status</th>
                                <th className="pb-4 px-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {users.map((u) => (
                                <tr key={u.id} className="text-sm">
                                    <td className="py-4 px-2">
                                        <p className="font-bold">{u.name}</p>
                                        <p className="text-xs text-neutral-500">{u.email}</p>
                                    </td>
                                    <td className="py-4 px-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            u.role === 'Admin' ? 'bg-red-100 text-red-600' : 
                                            u.role === 'Buyer' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 font-bold">🪙 {u.coins}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            u.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-right space-x-2">
                                        <Button variant="ghost" size="sm">Edit</Button>
                                        <Button variant="danger" size="sm">Ban</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ManageUsers;
