import { useContext, useState } from "react";
import axiosSecure from "../../../services/axiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { Card, Input, Button } from "../../../components/ui";
import useUser from "../../../hooks/useUser";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, , refetchUser] = useUser();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [workers, setWorkers] = useState('');
    const [pay, setPay] = useState('');

    const totalPayable = (Number(workers) || 0) * (Number(pay) || 0);
    const hasEnoughCoins = (dbUser?.coin || 0) >= totalPayable && totalPayable > 0;

    const handleAddTask = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const task = {
            task_title: form.title.value,
            task_detail: form.detail.value,
            required_workers: Number(form.workers.value),
            payable_amount: Number(form.pay.value),
            completion_date: form.date.value,
            submission_info: form.submission.value,
            task_image_url: form.image.value,
            buyer_email: user?.email,
            buyer_name: user?.displayName,
            createdAt: new Date(),
        };

        const totalCost = task.required_workers * task.payable_amount;

        try {
            const res = await axiosSecure.post("/tasks", {
                task,
                totalPayable: totalCost,
            });

            if (res.data.error) {
                alert("Not enough coins! Please purchase more coins.");
            } else {
                alert("Task added successfully! 🎉");
                form.reset();
                setPreviewImage(null);
                setWorkers('');
                setPay('');
                refetchUser();
            }
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Create New Task</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Fill in the details below to post a task and find global talent.</p>
            </div>

            <Card variant="base" className="p-8 md:p-10 border-2 border-primary-500/10 shadow-xl overflow-hidden relative">
                {/* Decorative background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <form onSubmit={handleAddTask} className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <Input
                                label="Task Title"
                                name="title"
                                placeholder="e.g. Complete Social Media Audit"
                                required
                            />
                        </div>

                        {/* Details */}
                        <div className="md:col-span-2 space-y-1">
                            <label className="label-base">Task Details</label>
                            <textarea
                                name="detail"
                                className="input-base min-h-[120px] resize-none"
                                placeholder="Describe the task in detail..."
                                required
                            ></textarea>
                        </div>

                        {/* Workers & Pay */}
                        <Input
                            label="Required Workers"
                            name="workers"
                            type="number"
                            min="1"
                            placeholder="10"
                            required
                            value={workers}
                            onChange={(e) => setWorkers(e.target.value)}
                        />
                        <Input
                            label="Payable Amount (Per Worker) 🪙"
                            name="pay"
                            type="number"
                            min="1"
                            placeholder="150"
                            required
                            value={pay}
                            onChange={(e) => setPay(e.target.value)}
                        />

                        {/* Date & Submission */}
                        <Input
                            label="Completion Date"
                            name="date"
                            type="date"
                            required
                        />
                        <Input
                            label="Submission Proof Requirements"
                            name="submission"
                            placeholder="e.g. Screenshot of the final step"
                            required
                        />

                        {/* Image URL */}
                        <div className="md:col-span-2">
                            <Input
                                label="Task Image URL"
                                name="image"
                                type="url"
                                placeholder="https://example.com/image.jpg"
                                onChange={(e) => setPreviewImage(e.target.value)}
                                required
                            />
                        </div>

                        {/* Image Preview */}
                        {previewImage && (
                            <div className="md:col-span-2 mt-2">
                                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Image Preview</p>
                                <div className="aspect-video w-full max-h-[300px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg">
                                    <img 
                                        src={previewImage} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                        onError={() => setPreviewImage(null)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Area */}
                    <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                        {/* Coin Summary */}
                        <div className="mb-6 p-4 rounded-2xl bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/50">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Cost Summary</p>
                                    <p className="text-2xl font-black text-primary-600">
                                        🪙 {totalPayable > 0 ? totalPayable.toLocaleString() : '—'}
                                    </p>
                                    <p className="text-xs text-neutral-500 mt-1">
                                        {workers && pay ? `${workers} workers × ${pay} coins each` : 'Enter workers and pay amount'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Your Balance</p>
                                    <p className={`text-2xl font-black ${hasEnoughCoins || totalPayable === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        🪙 {dbUser?.coin || 0}
                                    </p>
                                    {totalPayable > 0 && !hasEnoughCoins && (
                                        <p className="text-xs text-red-500 font-bold mt-1">Insufficient coins!</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                        <Button 
                            type="submit" 
                            size="lg" 
                            className="px-12 font-black shadow-primary-500/25"
                            loading={loading}
                            disabled={totalPayable > 0 && !hasEnoughCoins}
                        >
                            Publish Task
                        </Button>
                        </div>
                    </div>
                </form>
            </Card>

            {/* Hint Card */}
            <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/50 p-6 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary-500/20">💡</div>
                <div>
                    <h4 className="font-bold text-primary-900 dark:text-primary-100">Quick Tip for Success</h4>
                    <p className="text-sm text-primary-700 dark:text-primary-400 mt-1">Be very specific in the 'Submission Proof' field. Clear instructions lead to higher quality results and fewer disputes with workers.</p>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
