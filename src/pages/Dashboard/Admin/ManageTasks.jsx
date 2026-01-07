import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../services/axiosSecure";
import { Card, Button, Badge } from "../../components/ui";
import { useState } from "react";

const ManageTasks = () => {
    const [deleting, setDeleting] = useState(null);

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['admin-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/tasks');
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task? This action cannot be undone.")) return;
        
        setDeleting(id);
        try {
            const res = await axiosSecure.delete(`/tasks/${id}`);
            if (res.data.deletedCount > 0) {
                alert("Task deleted successfully! 🗑️");
                refetch();
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete task.");
        } finally {
            setDeleting(null);
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
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">All Platform Tasks</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Oversee all posted tasks, monitor activity, and moderate content as needed.</p>
            </div>

            <Card variant="base" className="p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Task Details</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Buyer</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Payout</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Availability</th>
                                <th className="py-5 px-6 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {tasks?.map((task) => (
                                <tr key={task._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-4">
                                            <img src={task.task_image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800" />
                                            <div className="min-w-0">
                                                <p className="font-bold text-neutral-900 dark:text-white text-sm truncate max-w-[200px]">{task.task_title}</p>
                                                <p className="text-[10px] text-neutral-500 font-medium">Posted: {new Date(task.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="text-sm">
                                            <p className="font-bold text-neutral-900 dark:text-white">{task.buyer_name}</p>
                                            <p className="text-xs text-neutral-500">{task.buyer_email}</p>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 font-black text-primary-600 text-sm">
                                        🪙 {task.payable_amount}
                                    </td>
                                    <td className="py-5 px-6">
                                        <Badge variant={task.required_workers > 0 ? 'success' : 'outline'} className="text-[10px] font-black">
                                            {task.required_workers} Spots Left
                                        </Badge>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            className="h-8 px-4 font-black text-[10px] uppercase shadow-lg shadow-red-500/10"
                                            onClick={() => handleDelete(task._id)}
                                            loading={deleting === task._id}
                                        >
                                            Delete Task
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {tasks?.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900">
                            <div className="text-5xl mb-4 opacity-20">📋</div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No tasks created yet</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Platform tasks will appear here for oversight.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ManageTasks;
