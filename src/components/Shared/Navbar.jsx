import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import useUser from "../../hooks/useUser";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [dbUser, isUserLoading] = useUser();
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if we are at the top of the home page (which has a dark hero section)
    const isTransparentDarkBg = location.pathname === '/' && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logOut();
            localStorage.removeItem("access-token");
            navigate("/");
            setIsProfileOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => `font-black text-xs uppercase tracking-widest transition-all hover:text-primary-500 hover:scale-105 ${isActive ? 'text-primary-500' : (isTransparentDarkBg ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 dark:text-neutral-400')}`}>Home</NavLink>
            {user && (
                <NavLink to="/dashboard" className={({ isActive }) => `font-black text-xs uppercase tracking-widest transition-all hover:text-primary-500 hover:scale-105 ${isActive ? 'text-primary-500' : (isTransparentDarkBg ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 dark:text-neutral-400')}`}>Dashboard</NavLink>
            )}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`font-black text-xs uppercase tracking-widest transition-all hover:text-primary-500 hover:scale-105 flex items-center gap-1 ${isTransparentDarkBg ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 dark:text-neutral-400'}`}>
                Developer Area
            </a>
        </>
    );

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
            isScrolled 
                ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] py-3 border-b border-neutral-200/50 dark:border-neutral-800/50' 
                : 'bg-transparent py-5'
        }`}>
            <div className="max-w-7xl mx-auto container-padding flex items-center justify-between">
                {/* 🚀 LOGO */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 outline outline-4 outline-transparent group-hover:outline-primary-500/10">
                        <span className="text-2xl font-black">E</span>
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`text-xl font-black tracking-tighter ${isTransparentDarkBg ? 'text-white' : 'text-neutral-900 dark:text-white'}`}>
                            Earn<span className="text-primary-500">Stack</span>
                        </span>
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-neutral-400 mt-0.5">Micro-Tasks</span>
                    </div>
                </Link>

                {/* 💻 DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks}
                </div>

                {/* ⚡ ACTIONS */}
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="hidden xs:flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-inner">
                            <span className="text-lg">💰</span>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-neutral-400 uppercase leading-none">Balance</span>
                                <span className="text-sm font-black text-neutral-900 dark:text-white leading-tight">
                                    {isUserLoading ? '...' : (dbUser?.coins || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    )}

                    <ThemeToggle className="hidden sm:flex" />

                    {user ? (
                        <div className="relative">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-11 h-11 rounded-2xl border-2 border-primary-500/20 hover:border-primary-500 overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-primary-500/10"
                            >
                                <img 
                                    src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff"} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            </button>

                            {isProfileOpen && (
                                <div className="absolute top-[120%] right-0 w-64 bg-white dark:bg-neutral-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-neutral-200 dark:border-neutral-800 p-2 animate-slide-up z-[70]">
                                    <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 mb-2">
                                        <p className="text-sm font-black text-neutral-900 dark:text-white truncate">{user.displayName || 'Stacker'}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Link to="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-sm font-bold transition-all text-neutral-700 dark:text-neutral-300 group">
                                            <div className="w-8 h-8 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                            Profile Settings
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800/50 text-sm font-bold transition-all text-neutral-700 dark:text-neutral-300 group">
                                            <div className="w-8 h-8 rounded-xl bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                            </div>
                                            Dashboard
                                        </Link>
                                        <div className="pt-2">
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-sm font-black transition-all group"
                                            >
                                                <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center transition-transform group-hover:rotate-12">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                </div>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <button className={`hidden xs:flex px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 ${isTransparentDarkBg ? 'text-white hover:text-primary-400' : 'text-neutral-800 dark:text-neutral-200 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                                    Login
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-primary-600 hover:bg-primary-700 text-white rounded-2xl transition-all shadow-xl shadow-primary-500/20 active:scale-95">
                                    Join Now
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* 📱 MOBILE TOGGLE */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`md:hidden p-2.5 rounded-2xl transition-all active:scale-95 overflow-hidden ${isTransparentDarkBg ? 'text-white hover:bg-white/10' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5 relative">
                            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                            <span className={`w-4 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* 📱 MOBILE SIDEBAR */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl border-t border-neutral-200 dark:border-neutral-800 shadow-2xl p-6 flex flex-col gap-6 animate-fade-in z-50">
                    <div className="flex flex-col gap-6 py-4">
                        {navLinks}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-xs font-black uppercase tracking-widest text-neutral-500">Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
