import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosSecure from "../services/axiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { Card, Button, Badge, Skeleton, SkeletonText, SkeletonTitle } from "../components/ui";

const TaskDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [submissionLoading, setSubmissionLoading] = useState(false);
    const [submissionText, setSubmissionText] = useState("");

    const { data: task, isLoading: isTaskLoading } = useQuery({
        queryKey: ['task', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
            return res.data;
        }
    });

    const handleSubmitToken = async (e) => {
        e.preventDefault();
        if (!submissionText.trim()) return alert("Please provide submission details.");

        setSubmissionLoading(true);
        try {
            const submissionData = {
                task_id: task._id,
                task_title: task.task_title,
                payable_amount: task.payable_amount,
                worker_email: user?.email,
                worker_name: user?.displayName,
                buyer_email: task.buyer_email,
                submission_details: submissionText,
                status: "pending",
            };

            const res = await axiosSecure.post("/submissions", submissionData);
            if (res.data.success) {
                alert("Submission sent successfully! 🎉");
                navigate("/dashboard/my-submissions");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setSubmissionLoading(false);
        }
    };

    if (isTaskLoading) {
        return (
            <div className="max-w-7xl mx-auto container-padding section-spacing pt-24">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="aspect-video w-full rounded-2xl" />
                        <SkeletonTitle className="h-10 w-3/4" />
                        <SkeletonText lines={6} />
                    </div>
                    <div>
                        <Skeleton className="h-[400px] w-full rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!task) return <div className="text-center py-20 font-bold text-2xl animate-pulse">Task not found</div>;

    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-24 animate-fade-in">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/tasks" className="hover:text-primary-500 transition-colors">Tasks</Link>
                <span>/</span>
                <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">{task.task_title}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Media Gallery */}
                    <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl">
                            <img src={task.task_image_url} alt={task.task_title} className="w-full object-cover max-h-[500px]" />
                        </div>
                    </div>

                    {/* Description */}
                    <section className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
                                {task.task_title}
                            </h1>
                            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold px-4 py-1.5 rounded-full text-sm">
                                🪙 {task.payable_amount} Coins
                            </div>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Overview</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                                {task.task_detail}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Proof Requirements</h3>
                            <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                                    {task.submission_info}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar Info */}
                <aside className="space-y-8">
                    <Card variant="base" className="sticky top-24 p-8 space-y-6 border-2 border-primary-500/20">
                        <div className="space-y-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-lg font-bold">Project Details</h3>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Reward</span>
                                <span className="font-bold text-primary-600">🪙 {task.payable_amount} Coins</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Deadline</span>
                                <span className="font-bold">{new Date(task.completion_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Slots Left</span>
                                <span className="font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">{task.required_workers}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Posted By</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-black border-2 border-primary-500">
                                    {task.buyer_name?.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm truncate max-w-[150px]">{task.buyer_name}</h4>
                                    <p className="text-xs text-neutral-500">Verified Buyer</p>
                                </div>
                            </div>
                        </div>

                        {/* Submission Form for Worker */}
                        <div className="pt-4 space-y-4 border-t border-neutral-100 dark:border-neutral-800">
                            <h3 className="text-lg font-bold">Complete & Submit</h3>
                            <form onSubmit={handleSubmitToken} className="space-y-4">
                                <textarea 
                                    className="input-base min-h-[100px] resize-none text-sm"
                                    placeholder="Paste your submission proof here (Text, Links, etc.)"
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    required
                                ></textarea>
                                <p className="text-[10px] text-neutral-500 text-center">
                                    * Make sure your proof matches the requirements exactly.
                                </p>
                                <Button 
                                    type="submit"
                                    className="w-full py-4 text-base font-bold shadow-xl shadow-primary-500/20"
                                    loading={submissionLoading}
                                    disabled={task.required_workers <= 0}
                                >
                                    {task.required_workers > 0 ? 'Submit Proof' : 'No More Slots'}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
};

export default TaskDetails;
