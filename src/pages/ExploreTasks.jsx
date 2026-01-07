import { useState, useEffect } from "react";
import { Input, Button, Card, CardSkeleton } from "../components/ui";
import TaskCard from "../components/Tasks/TaskCard";

const ExploreTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [coinRange, setCoinRange] = useState(250);

    const categories = ["All", "Social Media", "Content Writing", "Data Annotation", "App Testing", "Surveys"];

    useEffect(() => {
        // Simulate fetch with filtering
        setLoading(true);
        const timer = setTimeout(() => {
            const mockTasks = [
                { id: 1, title: "Follow & Like TechBrand on Twitter", category: "Social Media", coins: 25, creatorName: "TechBrand", date: "Oct 24, 2023", description: "Follow our official Twitter handle and like the pinned post." },
                { id: 2, title: "Write a 500-word product review", category: "Content Writing", coins: 50, creatorName: "ShopSmart", date: "Oct 23, 2023", description: "Read the product manual and write a balanced review." },
                { id: 3, title: "Label 50 images for AI training", category: "Data Annotation", coins: 80, creatorName: "AIData", date: "Oct 22, 2023", description: "Identify objects in street view images for autonomous driving." },
                { id: 4, title: "Test beta version of FitnessApp", category: "App Testing", coins: 120, creatorName: "FitLife", date: "Oct 21, 2023", description: "Install the APK and report any UI bugs or crashes." },
                { id: 5, title: "Complete Market Survey 2023", category: "Surveys", coins: 35, creatorName: "Insights", date: "Oct 20, 2023", description: "A quick 5-minute survey about consumer electronic habits." },
                { id: 6, title: "Translate UI to Spanish", category: "Content Writing", coins: 200, creatorName: "GlobalApp", date: "Oct 19, 2023", description: "Translate 500 strings from English to Spanish." },
                { id: 7, title: "Social Media Post Design", category: "Social Media", coins: 45, creatorName: "CreativeCo", date: "Oct 18, 2023", description: "Create a simple Canva design for our upcoming webinar." },
                { id: 8, title: "Audio Transcription (5 mins)", category: "Data Annotation", coins: 150, creatorName: "ListenUp", date: "Oct 17, 2023", description: "Transcribe a short interview clip with high accuracy." }
            ];

            // Apply filters
            let filtered = mockTasks;
            if (category !== "All") {
                filtered = filtered.filter(t => t.category === category);
            }
            if (search) {
                filtered = filtered.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
            }
            filtered = filtered.filter(t => t.coins <= coinRange);

            // Sorting
            if (sortBy === "Lowest Price") filtered.sort((a, b) => a.coins - b.coins);
            if (sortBy === "Highest Price") filtered.sort((a, b) => b.coins - a.coins);

            setTasks(filtered);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [search, category, sortBy, coinRange]);

    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-24">
            {/* Header & Search */}
            <div className="space-y-6 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-4xl font-black mb-2">Explore Available Tasks</h1>
                        <p className="text-neutral-600 dark:text-neutral-400">Discover thousands of ways to earn coins daily.</p>
                    </div>
                    <div className="w-full md:w-96 relative group">
                        <Input 
                            type="text" 
                            placeholder="Search tasks..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-12 bg-neutral-100 dark:bg-neutral-900 border-none group-focus-within:ring-2 ring-primary-500"
                        />
                        <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                    {/* Category Filter */}
                    <div className="space-y-1.5 flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-neutral-500 uppercase px-1">Category</label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-2 text-sm font-medium border-none focus:ring-2 ring-primary-500 outline-none h-10"
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Sorting */}
                    <div className="space-y-1.5 flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-neutral-500 uppercase px-1">Sort By</label>
                        <select 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl px-4 py-2 text-sm font-medium border-none focus:ring-2 ring-primary-500 outline-none h-10"
                        >
                            <option>Newest</option>
                            <option>Lowest Price</option>
                            <option>Highest Price</option>
                            <option>Oldest</option>
                        </select>
                    </div>

                    {/* Coin Range */}
                    <div className="space-y-1.5 flex-1 min-w-[200px]">
                        <div className="flex justify-between px-1">
                            <label className="text-xs font-bold text-neutral-500 uppercase">Max Coins</label>
                            <span className="text-xs font-bold text-primary-500">🪙 {coinRange}</span>
                        </div>
                        <input 
                            type="range" 
                            min="10" 
                            max="500" 
                            step="10" 
                            value={coinRange}
                            onChange={(e) => setCoinRange(parseInt(e.target.value))}
                            className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-primary-500"
                        />
                    </div>

                    {/* Reset Button */}
                    <div className="pt-5">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                                setCategory("All");
                                setSearch("");
                                setSortBy("Newest");
                                setCoinRange(500);
                            }}
                        >
                            Reset Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tasks Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
                </div>
            ) : tasks.length > 0 ? (
                <div className="space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                    
                    {/* Pagination Placeholder */}
                    <div className="flex justify-center items-center gap-4 py-8">
                        <Button variant="outline" disabled size="sm">Previous</Button>
                        <div className="flex items-center gap-2">
                            <Button size="sm" className="w-10 h-10 p-0 rounded-lg">1</Button>
                            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-lg">2</Button>
                            <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-lg">3</Button>
                        </div>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 bg-neutral-50 dark:bg-neutral-900/50 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <div className="text-6xl mb-4">🔍</div>
                    <h2 className="text-2xl font-bold mb-2">No tasks found</h2>
                    <p className="text-neutral-500">Try adjusting your filters or search keywords.</p>
                </div>
            )}
        </div>
    );
};

export default ExploreTasks;
