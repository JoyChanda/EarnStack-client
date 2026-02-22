import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Input, Button } from "../components/ui";
import { validateEmail, validatePassword, validateRequired, validateURL } from "../utils/validation";
import useAuthToken from "../hooks/useAuthToken";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const getToken = useAuthToken();
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
        role: 'worker'
    });

    const [imageUploading, setImageUploading] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setImageUploading(true);
        const imgFormData = new FormData();
        imgFormData.append('image', file);
        
        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, imgFormData);
            if (res.data.success) {
                setUploadedImageUrl(res.data.data.url);
                setFormData(prev => ({ ...prev, photo: res.data.data.url }));
                setErrors(prev => ({ ...prev, photo: null }));
            }
        } catch (err) {
            console.error("Image upload failed:", err);
            setErrors(prev => ({ ...prev, photo: "Image upload failed. Try again." }));
        } finally {
            setImageUploading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const newErrors = {};
        
        const nameError = validateRequired(formData.name, 'Full name');
        if (nameError) newErrors.name = nameError;
        
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        
        const photoError = validateRequired(formData.photo, 'Profile Picture');
        if (photoError) newErrors.photo = photoError;
        
        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            // 1. Create User in Firebase
            const result = await createUser(formData.email, formData.password);
            const user = result.user;

            // 2. Update Profile (Name & Photo)
            await updateUserProfile(formData.name, formData.photo);

            // 3. Save User & Role to Database (MongoDB)
            const userInfo = {
                name: formData.name,
                email: formData.email,
                image: formData.photo,
                role: formData.role,
            };
            
            const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
            await axios.post(`${apiUrl}/users`, userInfo);

            // 4. Get JWT with correct role
            await getToken({ email: formData.email, role: formData.role });
            
            setLoading(false);
            navigate("/dashboard"); 
        } catch (err) {
            console.error(err);
            setErrors({ general: err.message });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center container-padding py-20 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
            {/* 🎭 BACKGROUND EFFECTS */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[45%] h-[45%] bg-primary-500/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[45%] h-[45%] bg-secondary-500/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 w-full max-w-xl">
                <Card variant="glass" className="p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border-white/20 dark:border-neutral-800/50 backdrop-blur-2xl rounded-[2.5rem] group">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-flex items-center gap-3 mb-6 group/logo">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover/logo:scale-110 transition-all duration-500">
                                <span className="text-2xl font-black">E</span>
                            </div>
                            <span className="text-3xl font-black tracking-tight text-neutral-900 dark:text-white">EarnStack</span>
                        </Link>
                        <h1 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">Create Account</h1>
                        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">Join thousands of others earning on EarnStack</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Full Name</label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                    className="py-4 px-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Email Address</label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                    className="py-4 px-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border-none focus:ring-2 focus:ring-primary-500/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Profile Picture</label>
                            <div className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                                uploadedImageUrl 
                                    ? 'border-primary-500/50 bg-primary-500/5' 
                                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-800/30 hover:border-primary-500/30'
                            }`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    disabled={imageUploading}
                                />
                                {imageUploading ? (
                                    <div className="flex flex-col items-center gap-3 py-2">
                                        <div className="w-8 h-8 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                                        <p className="text-xs font-black text-primary-500 uppercase tracking-widest">Uploading...</p>
                                    </div>
                                ) : uploadedImageUrl ? (
                                    <div className="flex items-center gap-6 text-left">
                                        <div className="relative">
                                            <img src={uploadedImageUrl} alt="Preview" className="w-16 h-16 rounded-2xl object-cover ring-4 ring-primary-500/20 shadow-lg" />
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-[10px] shadow-lg">✓</div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-neutral-900 dark:text-white">Profile Image Set</p>
                                            <p className="text-xs text-neutral-500 font-medium">Click to change your picture</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-2 space-y-2">
                                        <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                            <span className="text-2xl">📸</span>
                                        </div>
                                        <p className="text-sm font-black text-neutral-700 dark:text-neutral-300">Choose Profile Image</p>
                                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">JPG, PNG or WebP</p>
                                    </div>
                                )}
                            </div>
                            {errors.photo && <p className="text-xs text-red-500 font-bold ml-1">⚠️ {errors.photo}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Password</label>
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

                            <div className="space-y-1">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-500 dark:text-neutral-400 ml-1">Account Role</label>
                                <div className="relative group/select">
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full py-4 px-5 rounded-2xl bg-neutral-100/50 dark:bg-neutral-800/50 border-none focus:ring-2 focus:ring-primary-500/50 appearance-none cursor-pointer font-bold text-neutral-700 dark:text-neutral-300 transition-all"
                                        required
                                    >
                                        <option value="worker">Worker (Earn Coins)</option>
                                        <option value="buyer">Buyer (Post Tasks)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-400 group-hover/select:text-primary-500 transition-colors">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {errors.general && (
                            <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-3 animate-fade-in">
                                <span className="text-lg">⚠️</span>
                                {errors.general}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 mt-4"
                            loading={loading}
                        >
                            Create Free Account
                        </Button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-black text-primary-500 hover:text-primary-600 transition-colors underline underline-offset-4 decoration-primary-500/30"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Register;

