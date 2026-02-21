import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../services/axiosSecure";
import { Card, Button, Badge } from "../../../components/ui";

// ─── Inline Toast ──────────────────────────────────────────────────────────────
const Toast = ({ msg, type, onClose }) => {
    if (!msg) return null;
    const bg = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-yellow-500";
    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 ${bg} text-white px-5 py-3 rounded-2xl shadow-2xl animate-slide-up`}>
            <span className="font-bold text-sm">{msg}</span>
            <button onClick={onClose} className="opacity-70 hover:opacity-100 text-lg leading-none">×</button>
        </div>
    );
};

// ─── Edit Task Modal ───────────────────────────────────────────────────────────
const EditTaskModal = ({ task, onClose, onSave }) => {
    const [form, setForm] = useState({
        task_title: task.task_title,
        task_detail: task.task_detail,
        task_image_url: task.task_image_url,
        submission_info: task.submission_info,
        completion_date: task.completion_date,
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axiosSecure.patch(`/tasks/${task._id}`, form);
            onSave();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-xl p-8 animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Edit Task</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700">×</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Task Title</label>
                        <input name="task_title" value={form.task_title} onChange={handleChange} required className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Task Details</label>
                        <textarea name="task_detail" value={form.task_detail} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white font-medium resize-none focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Completion Date</label>
                            <input type="date" name="completion_date" value={form.completion_date} onChange={handleChange} required className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white font-medium focus:outline-none focus:border-primary-500" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Submission Info</label>
                            <input name="submission_info" value={form.submission_info} onChange={handleChange} required className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white font-medium focus:outline-none focus:border-primary-500" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Task Image URL</label>
                        <input name="task_image_url" value={form.task_image_url} onChange={handleChange} className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white font-medium focus:outline-none focus:border-primary-500" />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                        <Button type="submit" className="flex-1" loading={saving}>Save Changes</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ─── Submissions Review Modal ──────────────────────────────────────────────────
const SubmissionsModal = ({ task, onClose, onAction }) => {
    const [processing, setProcessing] = useState(null);

    const { data: submissions = [], isLoading, refetch } = useQuery({
        queryKey: ['task-submissions', task._id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/task/${task._id}`);
            return res.data;
        },
    });

    const handleApprove = async (subId) => {
        setProcessing(subId + '-approve');
        try {
            await axiosSecure.patch(`/submissions/approve/${subId}`);
            refetch();
            onAction('success', '✅ Submission approved! Worker received coins.');
        } catch (err) {
            onAction('error', 'Failed to approve submission.');
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (subId) => {
        setProcessing(subId + '-reject');
        try {
            await axiosSecure.patch(`/submissions/reject/${subId}`);
            refetch();
            onAction('success', '❌ Submission rejected. Worker slot restored.');
        } catch (err) {
            onAction('error', 'Failed to reject submission.');
        } finally {
            setProcessing(null);
        }
    };

    const pending = submissions.filter(s => s.status === 'pending');
    const reviewed = submissions.filter(s => s.status !== 'pending');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
            <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col animate-slide-up" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black text-neutral-900 dark:text-white">Task Submissions</h2>
                        <p className="text-sm text-neutral-500 mt-1 truncate max-w-xs">{task.task_title}</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex-shrink-0">×</button>
                </div>

                <div className="overflow-y-auto flex-1 p-6 space-y-6">
                    {isLoading && (
                        <div className="space-y-3">
                            {[1,2,3].map(i => <div key={i} className="h-20 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-xl" />)}
                        </div>
                    )}

                    {!isLoading && submissions.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-3 opacity-20">📭</div>
                            <p className="text-neutral-500 font-medium">No submissions yet for this task.</p>
                        </div>
                    )}

                    {/* Pending Submissions */}
                    {pending.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-yellow-600 mb-3">Awaiting Review ({pending.length})</h3>
                            <div className="space-y-3">
                                {pending.map(sub => (
                                    <div key={sub._id} className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-2xl">
                                        <div className="flex items-start justify-between gap-4 flex-wrap">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-neutral-900 dark:text-white text-sm">{sub.worker_name}</p>
                                                <p className="text-xs text-neutral-500">{sub.worker_email}</p>
                                                <div className="mt-2 p-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                                                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Proof of Work</p>
                                                    <p className="text-sm text-neutral-700 dark:text-neutral-300 break-words">{sub.submission_details || sub.submission_proof || 'No details provided.'}</p>
                                                </div>
                                                <p className="text-xs text-neutral-400 mt-2">Reward: 🪙 {sub.payable_amount}</p>
                                            </div>
                                            <div className="flex gap-2 flex-shrink-0">
                                                <Button
                                                    size="sm"
                                                    className="bg-green-500 hover:bg-green-600 text-white font-black text-xs h-9 px-4 shadow-lg shadow-green-500/20"
                                                    loading={processing === sub._id + '-approve'}
                                                    onClick={() => handleApprove(sub._id)}
                                                >
                                                    Approve
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    className="font-black text-xs h-9 px-4"
                                                    loading={processing === sub._id + '-reject'}
                                                    onClick={() => handleReject(sub._id)}
                                                >
                                                    Reject
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Reviewed Submissions */}
                    {reviewed.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Reviewed ({reviewed.length})</h3>
                            <div className="space-y-2">
                                {reviewed.map(sub => (
                                    <div key={sub._id} className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl flex items-center justify-between gap-4">
                                        <div>
                                            <p className="font-bold text-neutral-900 dark:text-white text-sm">{sub.worker_name}</p>
                                            <p className="text-xs text-neutral-500">{sub.worker_email}</p>
                                        </div>
                                        <Badge variant={sub.status === 'approved' ? 'success' : 'danger'} className="text-[10px] font-black uppercase">
                                            {sub.status}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Main MyTasks Component ────────────────────────────────────────────────────
const MyTasks = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [editTask, setEditTask] = useState(null);
    const [reviewTask, setReviewTask] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [toast, setToast] = useState({ msg: '', type: '' });

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast({ msg: '', type: '' }), 4000);
    };

    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['buyer-tasks', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tasks/buyer/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleDelete = async (task) => {
        const refundAmount = task.required_workers * task.payable_amount;
        const confirm = window.confirm(
            `Delete "${task.task_title}"?\n\nYou will receive a refund of 🪙 ${refundAmount} coins (${task.required_workers} remaining worker slots × ${task.payable_amount} coins each).`
        );
        if (!confirm) return;

        setDeleting(task._id);
        try {
            const res = await axiosSecure.delete(`/tasks/buyer/${task._id}`);
            if (res.data.success) {
                refetch();
                queryClient.invalidateQueries(['buyer-stats']);
                showToast(`Task deleted! 🪙 ${refundAmount} coins refunded to your wallet.`);
            }
        } catch (err) {
            console.error(err);
            showToast('Failed to delete task.', 'error');
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
                        {[1, 2, 3].map(i => <div key={i} className="h-16 w-full bg-neutral-100 dark:bg-neutral-900 animate-pulse rounded-xl" />)}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Toast */}
            <Toast msg={toast.msg} type={toast.type} onClose={() => setToast({ msg: '', type: '' })} />

            {/* Modals */}
            {editTask && (
                <EditTaskModal
                    task={editTask}
                    onClose={() => setEditTask(null)}
                    onSave={() => { refetch(); showToast('Task updated successfully! ✏️'); }}
                />
            )}
            {reviewTask && (
                <SubmissionsModal
                    task={reviewTask}
                    onClose={() => setReviewTask(null)}
                    onAction={(type, msg) => showToast(msg, type)}
                />
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 dark:text-white">My Tasks</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Manage your posted tasks. Review worker submissions and approve or reject their work.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-2xl border border-primary-100 dark:border-primary-800/50">
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">Total Tasks:</span>
                    <span className="text-lg font-black text-primary-700 dark:text-primary-300">{tasks.length}</span>
                </div>
            </div>

            <Card variant="base" className="p-0 overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Task</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Workers Left</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Pay / Worker</th>
                                <th className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">Deadline</th>
                                <th className="py-5 px-6 text-right text-[10px] font-black uppercase tracking-widest text-neutral-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {tasks.map((task) => (
                                <tr key={task._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-4">
                                            <img src={task.task_image_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-neutral-200 dark:border-neutral-800 flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                                            <div className="min-w-0">
                                                <p className="font-bold text-neutral-900 dark:text-white text-sm truncate max-w-[200px]">{task.task_title}</p>
                                                <p className="text-[10px] text-neutral-500 font-medium">Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <Badge variant={task.required_workers > 0 ? 'warning' : 'outline'} className="text-[10px] font-black">
                                            {task.required_workers} left
                                        </Badge>
                                    </td>
                                    <td className="py-5 px-6 font-black text-primary-600 text-sm">
                                        🪙 {task.payable_amount}
                                    </td>
                                    <td className="py-5 px-6 text-sm text-neutral-500 font-medium">
                                        {task.completion_date ? new Date(task.completion_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                className="h-8 px-3 font-black text-[10px] uppercase bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                                onClick={() => setReviewTask(task)}
                                            >
                                                Review
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 px-3 font-black text-[10px] uppercase"
                                                onClick={() => setEditTask(task)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                className="h-8 px-3 font-black text-[10px] uppercase shadow-lg shadow-red-500/10"
                                                loading={deleting === task._id}
                                                onClick={() => handleDelete(task)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {tasks.length === 0 && (
                        <div className="text-center py-20 bg-white dark:bg-neutral-900">
                            <div className="text-5xl mb-4 opacity-20">📋</div>
                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">No tasks posted yet</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1 mb-6">Create your first task to get work done by global talent.</p>
                            <a href="/dashboard/add-tasks" className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors">
                                ➕ Post a Task
                            </a>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default MyTasks;
