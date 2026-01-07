import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import axiosSecure from "../../services/axiosSecure";
import { Card, Button, Badge } from "../../components/ui";

const WorkerSubmissions = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(0);
    const size = 10;

    const { data, isLoading } = useQuery({
        queryKey: ['submissions', user?.email, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions?email=${user?.email}&page=${currentPage}&size=${size}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / size);
    const submissions = data?.submissions || [];

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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 dark:text-white">My Submissions</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Track your activity and earnings from across the platform.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">Total Activities:</span>
                    <span className="text-lg font-black text-primary-700 dark:text-primary-300">{totalCount}</span>
                </div>
            </div>

            <Card variant="base" className="p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Task Title</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Reward</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Submitted On</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {submissions.map((sub) => (
                                <tr key={sub._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <p className="font-bold text-neutral-900 dark:text-white text-sm truncate max-w-[250px]">{sub.task_title}</p>
                                        <p className="text-[10px] text-neutral-400 font-medium mt-0.5">Buyer: {sub.buyer_email}</p>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-primary-600 dark:text-primary-400 font-black text-sm">🪙 {sub.payable_amount}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <Badge 
                                            variant={
                                                sub.status === 'approved' ? 'success' : 
                                                sub.status === 'pending' ? 'warning' : 'danger'
                                            }
                                            className="font-black uppercase text-[10px]"
                                        >
                                            {sub.status}
                                        </Badge>
                                    </td>
                                    <td className="py-5 px-6">
                                        <p className="text-sm font-medium text-neutral-500">
                                            {new Date(sub.createdAt).toLocaleDateString(undefined, { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {submissions.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900">
                            <div className="text-5xl mb-4 opacity-20">📭</div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No submissions yet</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Start explorings tasks to earn coins!</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="p-6 bg-neutral-50/50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="font-bold"
                        >
                            Previous
                        </Button>
                        
                        <div className="flex items-center gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${
                                        currentPage === i 
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                                        : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="font-bold"
                        >
                            Next
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default WorkerSubmissions;
