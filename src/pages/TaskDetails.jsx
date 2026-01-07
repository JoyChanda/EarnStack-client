import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Badge, Skeleton, SkeletonText, SkeletonTitle } from "../components/ui";

const TaskDetails = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState(null);

    useEffect(() => {
        // Simulate fetch
        const timer = setTimeout(() => {
            setTask({
                id,
                title: "Complete Social Media Audit for TechBrand",
                description: "This task involves reviewing the current social media presence of TechBrand across platforms like LinkedIn, Twitter, and Instagram. You will need to check for consistency in brand voice, post frequency, and engagement levels. A spreadsheet with specific metrics will be provided for data entry.",
                instructions: [
                    "Visit the provided LinkedIn company page.",
                    "Download the audit template.",
                    "Review posts from the last 30 days.",
                    "Record engagement rates (Likes/Comments/Shares).",
                    "Suggest 3 improvements based on the audit.",
                    "Submit the completed spreadsheet as proof."
                ],
                coins: 150,
                deadline: "Oct 30, 2023",
                category: "Social Media",
                creator: {
                    name: "TechBrand Marketing",
                    image: "https://i.pravatar.cc/150?u=tech",
                    rating: 4.8
                },
                media: [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2000&auto=format&fit=crop"
                ]
            });
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, [id]);

    if (loading) {
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

    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-24 animate-fade-in">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
                <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
                <span>/</span>
                <Link to="/tasks" className="hover:text-primary-500 transition-colors">Tasks</Link>
                <span>/</span>
                <span className="text-neutral-900 dark:text-white font-medium truncate max-w-xs">{task.title}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Media Gallery */}
                    <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl">
                            <img src={task.media[0]} alt={task.title} className="w-full object-cover max-h-[500px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {task.media.slice(1).map((m, i) => (
                                <div key={i} className="rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-lg h-32 md:h-48">
                                    <img src={m} alt="" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Description */}
                    <section className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white leading-tight">
                                {task.title}
                            </h1>
                            <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold px-4 py-1.5 rounded-full text-sm">
                                🪙 {task.coins} Coins
                            </div>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                            <h3 className="text-xl font-bold">Overview</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                                {task.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Instructions</h3>
                            <ul className="space-y-4">
                                {task.instructions.map((step, i) => (
                                    <li key={i} className="flex gap-4 items-start bg-neutral-50 dark:bg-neutral-900/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
                                        <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                            {i + 1}
                                        </span>
                                        <span className="text-neutral-700 dark:text-neutral-300">{step}</span>
                                    </li>
                                ))}
                            </ul>
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
                                <span className="font-bold text-primary-600">🪙 {task.coins} Coins</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Deadline</span>
                                <span className="font-bold">{task.deadline}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-neutral-500">Category</span>
                                <span className="font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">{task.category}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Created By</h3>
                            <div className="flex items-center gap-4">
                                <img src={task.creator.image} className="w-12 h-12 rounded-full border-2 border-primary-500" alt={task.creator.name} />
                                <div>
                                    <h4 className="font-bold text-sm truncate max-w-[150px]">{task.creator.name}</h4>
                                    <p className="text-xs text-yellow-500 font-bold">⭐ {task.creator.rating}/5.0</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <p className="text-xs text-neutral-500 text-center">
                                * Submit proof carefully. Multiple rejections may lead to a permanent ban.
                            </p>
                            <Button className="w-full py-4 text-base font-bold shadow-xl">
                                Start Task Now
                            </Button>
                            <Button variant="ghost" className="w-full">
                                Report Issue
                            </Button>
                        </div>
                    </Card>

                    {/* Related Tasks Hint */}
                    <div className="p-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                        <h4 className="font-bold text-sm mb-4">You might also like</h4>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-3 group cursor-pointer">
                                    <div className="w-16 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="min-w-0">
                                        <h5 className="text-xs font-bold truncate group-hover:text-primary-500 transition-colors">App engagement task {i}</h5>
                                        <p className="text-[10px] text-primary-500 font-bold">🪙 80 Coins</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default TaskDetails;
