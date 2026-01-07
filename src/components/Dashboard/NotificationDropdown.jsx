import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import axiosSecure from "../../services/axiosSecure";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const { data: notifications, isLoading, refetch } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        refetchInterval: 10000 // Refetch every 10 seconds for real-time feel
    });

    const unreadCount = notifications?.filter(n => n.unread).length || 0;

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center animate-bounce">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-80 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50 animate-slide-up">
                        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
                            <h3 className="font-black text-sm text-neutral-900 dark:text-white uppercase tracking-widest">Notifications</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full uppercase">
                                {notifications?.length || 0} Total
                            </span>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 text-center text-sm font-medium text-neutral-400 animate-pulse italic">
                                    Loading alerts...
                                </div>
                            ) : notifications?.length > 0 ? (
                                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {notifications.map((notif) => (
                                        <Link
                                            key={notif._id}
                                            to={notif.actionRoute}
                                            onClick={() => setIsOpen(false)}
                                            className="block p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
                                        >
                                            <p className={`text-sm leading-relaxed ${notif.unread ? 'text-neutral-900 dark:text-white font-bold' : 'text-neutral-500 dark:text-neutral-400 font-medium'}`}>
                                                {notif.message}
                                            </p>
                                            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold mt-2 flex items-center gap-2 uppercase tracking-wide">
                                                <span>🕒 {new Date(notif.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                {notif.unread && <span className="w-1.5 h-1.5 bg-primary-500 rounded-full"></span>}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="text-4xl mb-3 opacity-20">🎗️</div>
                                    <p className="text-sm font-bold text-neutral-400">All caught up!</p>
                                    <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">No new alerts found</p>
                                </div>
                            )}
                        </div>

                        {notifications?.length > 0 && (
                            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
                                <button className="text-[10px] font-black text-primary-500 hover:text-primary-600 uppercase tracking-widest">
                                    Clear all notifications
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationDropdown;
