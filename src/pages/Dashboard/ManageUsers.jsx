import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../services/axiosSecure";
import { Card, Button, Badge } from "../../components/ui";
import { useState } from "react";

const ManageUsers = () => {
    const [updating, setUpdating] = useState(null);

    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleUpdateRole = async (email, newRole) => {
        setUpdating(email);
        try {
            const res = await axiosSecure.patch(`/users/role/${email}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                alert(`User role updated to ${newRole}! 🎉`);
                refetch();
            }
        } catch (error) {
            console.error("Role update error:", error);
            alert("Failed to update role. Please try again.");
        } finally {
            setUpdating(null);
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            const res = await axiosSecure.delete(`/users/${id}`);
            if (res.data.deletedCount > 0) {
                alert("User deleted successfully! 🗑️");
                refetch();
            }
        } catch (error) {
            console.error("Delete user error:", error);
            alert("Failed to delete user.");
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-6 animate-fade-in">
                <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-lg" />
                <Card className="p-8">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="h-12 w-full bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-xl" />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">User Management</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Monitor and manage all platform participants, adjust roles, and maintain ecosystem health.</p>
            </div>

            <Card variant="base" className="p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Display Name / Photo</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">User Email</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Role</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Coin</th>
                                <th className="py-5 px-6 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Quick Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {users?.map((u) => (
                                <tr key={u._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold border border-primary-500/20">
                                                {u.image ? (
                                                    <img src={u.image} alt="" className="w-full h-full object-cover rounded-xl" />
                                                ) : (
                                                    u.name?.charAt(0)
                                                )}
                                            </div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-sm">{u.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-xs text-neutral-500">{u.email}</p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <Badge 
                                            variant={
                                                u.role === 'admin' ? 'danger' : 
                                                u.role === 'buyer' ? 'primary' : 'success'
                                            }
                                            className="font-black uppercase text-[10px] min-w-[70px] text-center"
                                        >
                                            {u.role}
                                        </Badge>
                                    </td>
                                    <td className="py-5 px-6 font-black text-neutral-900 dark:text-white text-sm">
                                        🪙 {u.coin || 0}
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Role Toggle Actions */}
                                            {u.role !== 'admin' && (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="text-[10px] font-black h-8 px-3"
                                                    onClick={() => handleUpdateRole(u.email, 'admin')}
                                                    loading={updating === u.email}
                                                >
                                                    Make Admin
                                                </Button>
                                            )}
                                            
                                            <select 
                                                className="bg-neutral-100 dark:bg-neutral-800 text-[10px] font-black uppercase px-2 h-8 rounded-lg outline-none cursor-pointer border-r-8 border-transparent"
                                                value={u.role}
                                                onChange={(e) => handleUpdateRole(u.email, e.target.value)}
                                                disabled={updating === u.email}
                                            >
                                                <option value="worker">Worker</option>
                                                <option value="buyer">Buyer</option>
                                                <option value="admin">Admin</option>
                                            </select>

                                            <Button 
                                                variant="danger" 
                                                size="sm" 
                                                className="h-8 px-3 text-[10px] font-black uppercase"
                                                onClick={() => handleDeleteUser(u._id)}
                                            >
                                                Remove User
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {users?.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900">
                            <div className="text-5xl mb-4 opacity-20">👥</div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No users found</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Users will appear here as they register.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ManageUsers;
