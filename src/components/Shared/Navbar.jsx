import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";
import ThemeToggle from "./ThemeToggle";
import { Button } from "../ui";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();

    // Mock coins - Replace with real data from DB later
    const userCoins = 50; 

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
            navigate("/");
            setIsProfileOpen(false);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinks = (
        <>
            <NavLink to="/" className={({ isActive }) => `font-medium text-sm transition-colors hover:text-primary-500 ${isActive ? 'text-primary-500' : 'text-neutral-700 dark:text-neutral-300'}`}>Home</NavLink>
            {user && (
                <NavLink to="/dashboard" className={({ isActive }) => `font-medium text-sm transition-colors hover:text-primary-500 ${isActive ? 'text-primary-500' : 'text-neutral-700 dark:text-neutral-300'}`}>Dashboard</NavLink>
            )}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="font-medium text-sm text-neutral-700 dark:text-neutral-300 transition-colors hover:text-primary-500 flex items-center gap-1">
                Join as Developer
            </a>
        </>
    );

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto container-padding flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-xl font-black">E</span>
                    </div>
                    <span className="text-xl font-bold text-neutral-900 dark:text-white hidden sm:block">
                        Earn<span className="text-primary-600">Stack</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <ThemeToggle className="hidden sm:flex" />

                    {user ? (
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* Coin Display */}
                            <div className="flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 px-3 py-1.5 rounded-full border border-primary-200 dark:border-primary-800/50">
                                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] font-bold text-yellow-900 shadow-sm">
                                    $
                                </div>
                                <span className="font-bold text-xs sm:text-sm text-primary-700 dark:text-primary-400">{userCoins}</span>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-primary-500 overflow-hidden hover:scale-105 transition-transform"
                                >
                                    <img 
                                        src={user.photoURL || "https://i.pravatar.cc/150"} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                {isProfileOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 p-2 animate-slide-up">
                                        <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 mb-2">
                                            <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{user.displayName || 'User'}</p>
                                            <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/dashboard/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition-colors text-neutral-700 dark:text-neutral-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            View Profile
                                        </Link>
                                        <Link to="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition-colors text-neutral-700 dark:text-neutral-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                            Dashboard
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 text-sm font-medium transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="hidden xs:flex">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="primary" size="sm">Register</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 shadow-xl p-4 flex flex-col gap-4 animate-fade-in">
                    <div className="flex flex-col gap-4 py-2">
                        {navLinks}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Switch Theme</span>
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
