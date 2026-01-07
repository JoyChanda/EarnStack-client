import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../services/axiosSecure";
import { Card, Button, Badge } from "../../components/ui";
import { useState } from "react";

const ManageWithdrawals = () => {
    const [approving, setApproving] = useState(null);

    const { data: withdrawals, isLoading, refetch } = useQuery({
        queryKey: ['withdrawals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/withdrawals');
            return res.data;
        }
    });

    const handleApprove = async (id) => {
        setApproving(id);
        try {
            const res = await axiosSecure.patch(`/withdraw/approve/${id}`);
            if (res.data.modifiedCount > 0) {
                alert("Withdrawal approved and coins deducted! 💸");
                refetch();
            }
        } catch (error) {
            console.error("Approval error:", error);
            alert("Failed to approve. Please try again.");
        } finally {
            setApproving(null);
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
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Withdrawal Management</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Review and process worker withdrawal requests efficiently.</p>
            </div>

            <Card variant="base" className="p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Worker</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Coins / Amount</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Method</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Status</th>
                                <th className="py-5 px-6 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {withdrawals?.map((w) => (
                                <tr key={w._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-sm">{w.worker_name}</p>
                                            <p className="text-xs text-neutral-500">{w.worker_email}</p>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="space-y-0.5">
                                            <p className="font-black text-primary-600 text-sm">🪙 {w.withdrawal_coin}</p>
                                            <p className="text-xs font-bold text-neutral-400">${w.withdrawal_amount.toFixed(2)}</p>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="font-black uppercase text-[10px] py-0.5">
                                                {w.payment_system}
                                            </Badge>
                                            <span className="text-xs font-medium text-neutral-500">{w.account_number}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <Badge 
                                            variant={w.status === 'approved' ? 'success' : 'warning'}
                                            className="font-black uppercase text-[10px]"
                                        >
                                            {w.status}
                                        </Badge>
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        {w.status === 'pending' ? (
                                            <Button 
                                                size="sm" 
                                                className="font-black text-[10px] px-4 py-2 shadow-lg shadow-primary-500/20"
                                                onClick={() => handleApprove(w._id)}
                                                loading={approving === w._id}
                                            >
                                                Approve Payment
                                            </Button>
                                        ) : (
                                            <span className="text-green-500 text-sm font-black flex items-center justify-end gap-1">
                                                <span>✓</span> Paid out
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {withdrawals?.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900">
                            <div className="text-5xl mb-4 opacity-20">💰</div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No withdrawal requests</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Pending requests will appear here when workers cash out.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default ManageWithdrawals;
