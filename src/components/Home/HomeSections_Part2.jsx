import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Card, Button } from '../ui';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

/**
 * 🏷️ TASK CATEGORIES SECTION
 */
export const Categories = () => {
    const categories = [
        { name: "Social Media", count: "1200+ Tasks", icon: "🌐", color: "bg-blue-500" },
        { name: "Content Writing", count: "850+ Tasks", icon: "✍️", color: "bg-purple-500" },
        { name: "Data Annotation", count: "2100+ Tasks", icon: "📊", color: "bg-emerald-500" },
        { name: "App Testing", count: "400+ Tasks", icon: "📱", color: "bg-orange-500" },
        { name: "Surveys", count: "1500+ Tasks", icon: "🗳️", color: "bg-pink-500" },
        { name: "Language Translation", count: "300+ Tasks", icon: "🔤", color: "bg-indigo-500" }
    ];

    return (
        <section className="section-spacing bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl font-black mb-4">Explore Categories</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl">
                            Pick a category that matches your skills and start earning coins today.
                        </p>
                    </div>
                    <Button variant="outline">View All Tasks</Button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {categories.map((cat, index) => (
                        <Card key={index} variant="hover" className="group text-center p-6 bg-neutral-50 dark:bg-neutral-900 border-none">
                            <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 group-hover:rotate-12 transition-transform shadow-lg`}>
                                {cat.icon}
                            </div>
                            <h3 className="font-bold text-neutral-900 dark:text-white truncate">{cat.name}</h3>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">{cat.count}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * 🏆 BEST WORKERS (Leaderboard Preview)
 */
export const BestWorkers = () => {
    const workers = [
        { name: "Alex Rivera", coins: 4500, tasks: 320, image: "https://i.pravatar.cc/150?u=1", badge: "🥇" },
        { name: "Sarah Chen", coins: 4200, tasks: 280, image: "https://i.pravatar.cc/150?u=2", badge: "🥈" },
        { name: "Marcus Johnson", coins: 3900, tasks: 410, image: "https://i.pravatar.cc/150?u=3", badge: "🥉" },
        { name: "Elena Gomez", coins: 3500, tasks: 190, image: "https://i.pravatar.cc/150?u=4", badge: "🎖️" },
        { name: "David Kim", coins: 3100, tasks: 250, image: "https://i.pravatar.cc/150?u=5", badge: "🎖️" },
        { name: "Sofia Patel", coins: 2800, tasks: 150, image: "https://i.pravatar.cc/150?u=6", badge: "🎖️" }
    ];

    return (
        <section className="section-spacing bg-neutral-50 dark:bg-neutral-900/30">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Our Top Performers</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Meet the most dedicated workers on our platform who are consistently delivering quality results.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workers.map((worker, index) => (
                        <Card key={index} variant="base" className="flex items-center gap-6 p-6">
                            <div className="relative">
                                <img src={worker.image} alt={worker.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-neutral-800 shadow-md" />
                                <span className="absolute -top-3 -right-3 text-2xl">{worker.badge}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold truncate">{worker.name}</h3>
                                <div className="flex justify-between mt-2">
                                    <div className="text-sm">
                                        <p className="text-neutral-500">Coins</p>
                                        <p className="font-bold text-primary-600">{worker.coins}</p>
                                    </div>
                                    <div className="text-sm text-right">
                                        <p className="text-neutral-500">Tasks</p>
                                        <p className="font-bold">{worker.tasks}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * 💬 TESTIMONIALS SLIDER
 */
export const Testimonials = () => {
    const reviews = [
        { name: "Robert Fox", role: "UI Designer", text: "EarnStack has been a game changer for my passive income. The tasks are simple and payouts are always on time.", avatar: "https://i.pravatar.cc/150?u=10" },
        { name: "Jane Cooper", role: "Content Creator", text: "I found high-quality workers for my data entry project within minutes. The verification system works flawlessly.", avatar: "https://i.pravatar.cc/150?u=11" },
        { name: "Cody Fisher", role: "Software Tester", text: "The variety of tasks is amazing. I can spend an hour daily and earn enough coins to upgrade my tech gear.", avatar: "https://i.pravatar.cc/150?u=12" }
    ];

    return (
        <section className="section-spacing bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">What Users Say</h2>
                    <div className="w-24 h-1.5 bg-primary-500 mx-auto rounded-full" />
                </div>
                <Swiper
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="pb-16"
                >
                    {reviews.map((rev, index) => (
                        <SwiperSlide key={index}>
                            <Card className="h-full p-8 flex flex-col">
                                <div className="flex text-yellow-500 mb-6 font-bold">⭐⭐⭐⭐⭐</div>
                                <p className="text-neutral-600 dark:text-neutral-400 italic mb-8 flex-1">
                                    "{rev.text}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src={rev.avatar} className="w-12 h-12 rounded-full border-2 border-primary-500" alt={rev.name} />
                                    <div>
                                        <h4 className="font-bold">{rev.name}</h4>
                                        <p className="text-xs text-neutral-500">{rev.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};
