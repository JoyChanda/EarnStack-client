import { useState, useContext } from "react";
import { Link, NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useTheme } from "../providers/ThemeProvider";
import ThemeToggle from "../components/Shared/ThemeToggle";
import useUser from "../hooks/useUser";
import NotificationDropdown from "../components/Dashboard/NotificationDropdown";

const DashboardLayout = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const [dbUser, isUserLoading] = useUser();
    const { theme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const userRole = dbUser?.role;

    const handleLogout = async () => {
        try {
            await logOut();
            localStorage.removeItem("access-token");
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const adminLinks = [
        { name: 'Admin Home', path: '/dashboard/admin-home', icon: '🏠' },
        { name: 'Manage Users', path: '/dashboard/manage-users', icon: '👥' },
        { name: 'All Tasks', path: '/dashboard/manage-tasks', icon: '📋' },
        { name: 'Withdrawals', path: '/dashboard/withdrawals', icon: '💰' }
    ];

    const workerLinks = [
        { name: 'Worker Home', path: '/dashboard/worker-home', icon: '🏠' },
        { name: 'My Submissions', path: '/dashboard/my-submissions', icon: '📤' },
        { name: 'Withdraw', path: '/dashboard/withdraw', icon: '💳' }
    ];

    const buyerLinks = [
        { name: 'Buyer Home', path: '/dashboard/buyer-home', icon: '🏠' },
        { name: 'Add Tasks', path: '/dashboard/add-tasks', icon: '➕' },
        { name: 'My Tasks', path: '/dashboard/my-tasks', icon: '📂' },
        { name: 'Purchase Coins', path: '/dashboard/payments', icon: '💰' }
    ];

    const token = localStorage.getItem("access-token");

    // Auth & Role loading guard
    if (loading || (isUserLoading && !dbUser)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
                <div className="flex flex-col items-center gap-6 max-w-xs text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-primary-500/10 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-[0.2em] animate-pulse">Verifying Role</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Please wait while we secure your session...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!user || !token || (!isUserLoading && !dbUser)) {
        localStorage.removeItem("access-token");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // STRICT Role-based links
    const getLinks = () => {
        if (userRole === 'admin') return adminLinks;
        if (userRole === 'buyer') return buyerLinks;
        if (userRole === 'worker') return workerLinks;
        return [];
    };

    const links = getLinks();

    return (
        <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                {/* Logo Area */}
                <div className="h-16 flex items-center gap-3 px-4 border-b border-neutral-100 dark:border-neutral-800">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="min-w-[32px] w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                        {isSidebarOpen && <span className="font-black text-xl text-neutral-900 dark:text-white">EarnStack</span>}
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="p-4 space-y-2 mt-4">
                    {links.map((link) => (
                        <NavLink 
                            key={link.path} 
                            to={link.path}
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                        >
                            <span className="text-xl">{link.icon}</span>
                            {isSidebarOpen && <span className="font-bold text-sm whitespace-nowrap">{link.name}</span>}
                        </NavLink>
                    ))}
                    
                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 mt-4 space-y-2">
                         <NavLink 
                            to="/dashboard/profile"
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${isActive ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                        >
                            <span className="text-xl">👤</span>
                            {isSidebarOpen && <span className="font-bold text-sm">My Profile</span>}
                        </NavLink>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
                        >
                            <span className="text-xl text-red-500">🚪</span>
                            {isSidebarOpen && <span className="font-bold text-sm">Logout</span>}
                        </button>
                    </div>
                </nav>

                {/* Collapse Button */}
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3 top-20 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 text-[10px]"
                >
                    {isSidebarOpen ? '◀' : '▶'}
                </button>
            </aside>

            {/* Main Content Area */}
            <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Top Navbar */}
                <header className="h-16 flex items-center justify-between px-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h2 className="font-bold text-lg hidden sm:block">Dashboard Overview</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationDropdown />
                        <ThemeToggle />
                        
                        {userRole !== 'admin' && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-black text-sm">
                                {isUserLoading ? (
                                    <div className="w-8 h-4 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
                                ) : (
                                    <>🪙 {dbUser?.coin || 0}</>
                                )}
                            </div>
                        )}

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-9 h-9 rounded-full border-2 border-primary-500 overflow-hidden"
                            >
                                <img src={user?.photoURL || "https://i.pravatar.cc/150"} alt="User" className="w-full h-full object-cover" />
                            </button>
                            
                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-2 animate-slide-up">
                                    <Link to="/" className="block px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-bold">Home</Link>
                                    <Link to="/dashboard/profile" onClick={()=>setIsProfileOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-bold">Profile</Link>
                                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500 text-sm font-bold">Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 flex-grow">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
