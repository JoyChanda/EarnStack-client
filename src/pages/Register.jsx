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
        role: 'Worker'
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
        
        // Name validation
        const nameError = validateRequired(formData.name, 'Full name');
        if (nameError) newErrors.name = nameError;
        
        // Email validation
        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;
        
        // Photo URL validation
        const photoError = validateURL(formData.photo);
        if (photoError) newErrors.photo = photoError;
        
        // Password validation
        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        // If there are errors, show them and stop
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
            console.log("User created:", user);

            // 2. Update Profile (Name & Photo)
            await updateUserProfile(formData.name, formData.photo);

            // 3. Save User & Role to Database (MongoDB)
            const normalizedRole = formData.role === "TaskCreator" ? "buyer" : "worker";
            const userInfo = {
                name: formData.name,
                email: formData.email,
                image: formData.photo,
                role: normalizedRole,
            };
            
            // Note: We use the base API URL directly or an axios call here
            await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);

            // 4. Get JWT with correct role
            await getToken({ email: formData.email, role: normalizedRole });
            
            setLoading(false);
            navigate("/dashboard"); 
        } catch (err) {
            console.error(err);
            setErrors({ general: err.message });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-secondary-900 to-primary-800 text-white container-padding py-12">
            <div className="w-full max-w-md card-glass">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-gradient text-3xl font-bold mb-2">
                        Join EarnStack
                    </h2>
                    <p className="text-neutral-300">Start your journey to earn and grow</p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-6">
                    {/* Name Input */}
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        className="bg-white/5"
                    />

                    {/* Email Input */}
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        className="bg-white/5"
                    />

                    {/* Photo Upload (imgBB) */}
                    <div className="space-y-2">
                        <label className="label-base text-neutral-300">
                            Profile Picture <span className="text-red-400">*</span>
                        </label>
                        <div className={`relative border-2 border-dashed rounded-2xl p-4 text-center transition-all bg-white/5 ${
                            uploadedImageUrl ? 'border-primary-500/50 bg-primary-500/5' : 'border-white/10 hover:border-white/20'
                        }`}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={imageUploading}
                            />
                            {imageUploading ? (
                                <div className="flex flex-col items-center gap-2 py-2">
                                    <div className="w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
                                    <p className="text-[10px] font-bold text-primary-400">Uploading...</p>
                                </div>
                            ) : uploadedImageUrl ? (
                                <div className="flex items-center gap-4 text-left">
                                    <img src={uploadedImageUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary-500/30" />
                                    <div>
                                        <p className="text-xs font-bold text-primary-400">Success!</p>
                                        <p className="text-[10px] text-neutral-400">Click to change</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-2">
                                    <p className="text-sm font-bold text-neutral-300">Choose Profile Image</p>
                                    <p className="text-[10px] text-neutral-500 mt-0.5">JPG, PNG or WebP</p>
                                </div>
                            )}
                        </div>
                        {errors.photo && <p className="text-[10px] text-red-400 font-bold mt-1">{errors.photo}</p>}
                    </div>

                    {/* Password Input */}
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        required
                        className="bg-white/5"
                    />

                    {/* Role Select */}
                    <div>
                        <label className="label-base text-neutral-300">
                            Select Role <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="input-base bg-white/5 appearance-none cursor-pointer"
                                required
                            >
                                <option value="Worker">Worker</option>
                                <option value="TaskCreator">Buyer</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-neutral-400">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* General Error Message */}
                    {errors.general && (
                        <div className="error-message bg-red-900/20 p-3 rounded-lg border border-red-500/50">
                            {errors.general}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        loading={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-neutral-400 text-sm">
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                    >
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;

