import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Input, Button, Card } from "../components/ui";
import { validateEmail, validateRequired } from "../utils/validation";
import useAuthToken from "../hooks/useAuthToken";

const Login = () => {
    const { user, loading: authLoading, signInUser, googleSignIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const navigate = useNavigate();
    const getToken = useAuthToken();

    // Redirect if already logged in AND has token
    useEffect(() => {
        const token = localStorage.getItem("access-token");
        if (user && !authLoading && token) {
            navigate("/dashboard");
        }
    }, [user, authLoading, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        // Validation
        const newErrors = {};
        const emailErr = validateEmail(formData.email);
        const passErr = validateRequired(formData.password, "Password");
        
        if (emailErr) newErrors.email = emailErr;
        if (passErr) newErrors.password = passErr;
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const result = await signInUser(formData.email, formData.password);
            await getToken(result.user);
            navigate("/dashboard");
        } catch (error) {
            setErrors({ general: "Invalid email or password. Please try again." });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setSocialLoading(true);
        try {
            const result = await googleSignIn();
            const fbUser = result.user;
            
            // Step 1: Sync with DB (Ensures user exists and role is assigned)
            try {
                const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
                await axios.post(`${apiUrl}/users`, {
                    name: fbUser.displayName,
                    email: fbUser.email,
                    image: fbUser.photoURL,
                    role: "worker", // Default for Google signup
                });
            } catch (err) {
                console.warn("User sync skipped (likely already exists)", err);
            }

            // Step 2: Get JWT and redirect
            await getToken(fbUser);
            navigate("/dashboard");
        } catch (error) {
            console.error("Google Login Error:", error);
            setErrors({ general: "Google sign-in failed. Please try again." });
        } finally {
            setSocialLoading(false);
        }
    };

    const handleDemoLogin = async (role) => {
        const demoCredentials = {
            admin:  { email: "admin@earnstack.com",  pass: "Admin123!",  name: "Admin User"  },
            worker: { email: "worker@earnstack.com", pass: "Worker123!", name: "Demo Worker" },
            buyer:  { email: "buyer@earnstack.com",  pass: "Buyer123!",  name: "Demo Buyer"  }
        };
        const creds = demoCredentials[role];

        setLoading(true);
        setErrors({});
        try {
            let fbUser;

            // Step 1: Firebase sign-in/up
            try {
                const result = await signInUser(creds.email, creds.pass);
                fbUser = result.user;
            } catch (signInErr) {
                if (signInErr.code === "auth/user-not-found" || signInErr.code === "auth/invalid-credential" || signInErr.code === "auth/wrong-password") {
                    const { createUserWithEmailAndPassword, updateProfile, getAuth } = await import("firebase/auth");
                    const { app } = await import("../firebase/firebase.config");
                    const auth = getAuth(app);
                    const newResult = await createUserWithEmailAndPassword(auth, creds.email, creds.pass);
                    fbUser = newResult.user;
                    await updateProfile(fbUser, {
                        displayName: creds.name,
                        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(creds.name)}&background=8b5cf6&color=fff`,
                    });
                } else {
                    throw signInErr;
                }
            }

            // Step 2: Critical Sync with DB for role accuracy
            const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
            await axios.post(`${apiUrl}/users`, {
                name: fbUser.displayName || creds.name,
                email: creds.email,
                image: fbUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(creds.name)}&background=8b5cf6&color=fff`,
                role,
            });

            // Step 3: Clear old tokens and get new one
            localStorage.removeItem("access-token");
            await getToken({ email: fbUser.email, role });
            
            // Short delay for storage readiness
            setTimeout(() => navigate("/dashboard"), 300);

        } catch (error) {
            console.error("Demo login error:", error);
            setErrors({ general: `Demo login failed: ${error.message || "Please try again."}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center container-padding py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
            {/* 🎭 HIGH-END BACKGROUND EFFECTS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.03)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <Card variant="glass" className="p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-white/20 dark:border-neutral-800/50 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden group">
                    {/* Inner Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                    
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6 group/logo">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover/logo:scale-110 group-hover/logo:rotate-3 transition-all duration-500">
                                <span className="text-2xl font-black">E</span>
                            </div>
                            <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">EarnStack</span>
                        </Link>
                        <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">Welcome Back</h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Please enter your credentials to access your dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Email Address</label>
                            <Input 
                                type="email"
                                name="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                required
                                className="py-4 px-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border-none focus:ring-2 focus:ring-primary-500/50"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Password</label>
                            </div>
                            <Input 
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                required
                                className="py-4 px-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border-none focus:ring-2 focus:ring-primary-500/50"
                            />
                        </div>

                        {errors.general && (
                            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3 animate-fade-in">
                                <span className="text-lg">⚠️</span>
                                {errors.general}
                            </div>
                        )}

                        <Button type="submit" className="w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300" loading={loading}>
                            Sign In
                        </Button>
                    </form>

                    {/* ───────────────── DIVIDER ───────────────── */}
                    <div className="relative my-10 flex items-center justify-center">
                        <div className="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
                        <span className="absolute bg-white dark:bg-[#0d0d0d] px-4 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">Or Continue With</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <Button 
                            variant="outline" 
                            onClick={handleGoogleLogin} 
                            loading={socialLoading}
                            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 text-sm font-bold"
                        >
                            {!socialLoading && (
                                <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                            )}
                            Google Account
                        </Button>
                    </div>

                    {/* ───────────────── QUICK ACCESS ───────────────── */}
                    <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-6">Quick Demo Access</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['admin', 'worker', 'buyer'].map((role) => (
                                <button 
                                    key={role}
                                    onClick={() => handleDemoLogin(role)} 
                                    className="px-5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-wider shadow-sm hover:shadow-lg hover:shadow-primary-500/25 active:scale-95 capitalize"
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-black text-primary-500 hover:text-primary-600 transition-colors underline underline-offset-4 decoration-primary-500/30">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
