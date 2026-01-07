import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button, Badge, SkeletonCard } from "../components/ui";

const ExploreTasks = () => {
    const { data: tasks, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto container-padding section-spacing pt-24">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-24 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <Badge variant="primary" className="mb-4">Available Tasks</Badge>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
                        Earn Coins by <br />
                        <span className="text-primary-600">Completing Tasks</span>
                    </h1>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
                    Browse through hundreds of available tasks, follow simple instructions, and get paid instantly in coins.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tasks?.map((task) => (
                    <Card key={task._id} variant="base" className="group flex flex-col h-full border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 transition-all duration-300">
                        {/* Task Image */}
                        <div className="aspect-video w-full overflow-hidden rounded-xl mb-6 relative">
                            <img 
                                src={task.task_image_url} 
                                alt={task.task_title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-sm font-black text-primary-600">
                                    🪙 {task.payable_amount}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 line-clamp-1 group-hover:text-primary-500 transition-colors">
                                {task.task_title}
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 mb-6">
                                {task.task_detail}
                            </p>

                            {/* Meta */}
                            <div className="mt-auto pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold ring-2 ring-white dark:ring-neutral-900">
                                        {task.buyer_name?.charAt(0)}
                                    </div>
                                    <div className="text-xs">
                                        <p className="font-bold text-neutral-900 dark:text-white truncate max-w-[80px]">{task.buyer_name}</p>
                                        <p className="text-neutral-500">Buyer</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Slots Left</p>
                                    <p className="text-sm font-black text-primary-500">{task.required_workers}</p>
                                </div>
                            </div>

                            <Link to={`/tasks/${task._id}`} className="mt-6">
                                <Button className="w-full font-bold">View Details</Button>
                            </Link>
                        </div>
                    </Card>
                ))}
            </div>

            {tasks?.length === 0 && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">No tasks found</h2>
                    <p className="text-neutral-500 mt-2">Come back later or refresh the page to see new opportunities.</p>
                </div>
            )}
        </div>
    );
};

export default ExploreTasks;
