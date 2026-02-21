import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { Input, Button, Card } from "../components/ui";
import { validateEmail, validateRequired } from "../utils/validation";
import useAuthToken from "../hooks/useAuthToken";

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);
    const navigate = useNavigate();
    const getToken = useAuthToken();

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
            // Save to DB (server ignores if already exists)
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                name: fbUser.displayName,
                email: fbUser.email,
                image: fbUser.photoURL,
                role: "worker",
            });
            await getToken(fbUser);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
        } finally {
            setSocialLoading(false);
        }
    };

    const handleDemoLogin = async (role) => {
        const demoCredentials = {
            admin: { email: "admin@earnstack.com", pass: "Admin123!" },
            worker: { email: "worker@earnstack.com", pass: "Worker123!" },
            buyer: { email: "buyer@earnstack.com", pass: "Buyer123!" }
        };
        const creds = demoCredentials[role];
        
        setLoading(true);
        try {
            const result = await signInUser(creds.email, creds.pass);
            await getToken(result.user);
            navigate("/dashboard");
        } catch (error) {
            setErrors({ general: "Demo login failed. Please try again." });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center container-padding py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-600 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-secondary-600 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <Card variant="glass" className="p-8 md:p-10 shadow-2xl border-white/20 dark:border-neutral-800/50">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                <span className="text-xl font-black">E</span>
                            </div>
                            <span className="text-2xl font-bold text-neutral-900 dark:text-white">EarnStack</span>
                        </Link>
                        <h1 className="text-2xl font-black">Welcome Back</h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Please enter your details to sign in</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input 
                            label="Email Address"
                            type="email"
                            name="email"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="label-base">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary-500 hover:text-primary-600 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Input 
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                required
                            />
                        </div>

                        {errors.general && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium">
                                {errors.general}
                            </div>
                        )}

                        <Button type="submit" className="w-full py-4 font-bold" loading={loading}>
                            Sign In
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200 dark:border-neutral-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-neutral-900 px-2 text-neutral-500 font-bold">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <Button 
                        variant="outline" 
                        onClick={handleGoogleLogin} 
                        loading={socialLoading}
                        className="w-full flex items-center justify-center gap-3 py-4 font-bold"
                    >
                        {!socialLoading && (
                            <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        )}
                        Google Account
                    </Button>

                    {/* Demo Login Shortcuts */}
                    <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800">
                        <p className="text-center text-xs font-bold text-neutral-400 uppercase tracking-widest mb-4">Quick Demo Access</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            <button onClick={() => handleDemoLogin('admin')} className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-500 hover:text-white transition-all text-[10px] font-black uppercase">Admin</button>
                            <button onClick={() => handleDemoLogin('worker')} className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-500 hover:text-white transition-all text-[10px] font-black uppercase">Worker</button>
                            <button onClick={() => handleDemoLogin('buyer')} className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-primary-500 hover:text-white transition-all text-[10px] font-black uppercase">Buyer</button>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-bold text-primary-500 hover:text-primary-600 transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
