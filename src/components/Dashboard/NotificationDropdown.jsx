import { useState, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
import axiosSecure from "../../services/axiosSecure";
import { Link } from "react-router-dom";

const NotificationDropdown = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const { data: notifications = [], isLoading, refetch } = useQuery({
        queryKey: ['notifications', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/notifications?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        refetchInterval: 15000, // Poll every 15 seconds
    });

    const unreadCount = notifications.filter(n => n.unread).length;

    const handleMarkRead = async () => {
        try {
            await axiosSecure.patch(`/notifications/mark-read?email=${user?.email}`);
            queryClient.invalidateQueries(['notifications', user?.email]);
        } catch (err) {
            console.error("Failed to mark notifications as read:", err);
        }
    };

    const handleClearAll = async () => {
        try {
            await axiosSecure.delete(`/notifications?email=${user?.email}`);
            queryClient.invalidateQueries(['notifications', user?.email]);
            setIsOpen(false);
        } catch (err) {
            console.error("Failed to clear notifications:", err);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    // Auto mark-read when opening
                    if (!isOpen && unreadCount > 0) handleMarkRead();
                }}
                className="relative w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center animate-bounce">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full right-0 mt-4 w-80 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50 animate-slide-up">
                        {/* Header */}
                        <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
                            <h3 className="font-black text-sm text-neutral-900 dark:text-white uppercase tracking-widest">Notifications</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full uppercase">
                                {notifications.length} Total
                            </span>
                        </div>

                        {/* List */}
                        <div className="max-h-[380px] overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 text-center space-y-3">
                                    {[1,2,3].map(i => <div key={i} className="h-10 bg-neutral-100 dark:bg-neutral-800 animate-pulse rounded-lg" />)}
                                </div>
                            ) : notifications.length > 0 ? (
                                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {notifications.map((notif) => (
                                        <Link
                                            key={notif._id}
                                            to={notif.actionRoute || '/dashboard'}
                                            onClick={() => setIsOpen(false)}
                                            className={`block p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group ${notif.unread ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.unread ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                                                <div className="min-w-0">
                                                    <p className={`text-sm leading-relaxed ${notif.unread ? 'text-neutral-900 dark:text-white font-bold' : 'text-neutral-500 dark:text-neutral-400 font-medium'}`}>
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-bold mt-1.5 uppercase tracking-wide">
                                                        🕒 {new Date(notif.time).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="text-4xl mb-3 opacity-20">🎗️</div>
                                    <p className="text-sm font-bold text-neutral-400">All caught up!</p>
                                    <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">No notifications yet</p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {notifications.length > 0 && (
                            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
                                <button
                                    onClick={handleMarkRead}
                                    className="text-[10px] font-black text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 uppercase tracking-widest transition-colors"
                                >
                                    Mark all read
                                </button>
                                <button
                                    onClick={handleClearAll}
                                    className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                                >
                                    Clear all
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
