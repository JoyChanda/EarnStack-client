import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Input, Button } from "../components/ui";
import { validateEmail, validatePassword, validateRequired, validateURL } from "../utils/validation";

const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
        password: '',
        role: 'Worker'
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
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

            // 3. TODO: Save User & Role to Database (MongoDB) 
            console.log("Role selected:", formData.role);

            setLoading(false);
            navigate("/"); 
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

                    {/* Photo URL Input */}
                    <Input
                        label="Photo URL"
                        type="url"
                        name="photo"
                        placeholder="https://example.com/photo.jpg"
                        value={formData.photo}
                        onChange={handleChange}
                        error={errors.photo}
                        required
                        className="bg-white/5"
                    />

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
                                <option value="TaskCreator">Task Creator</option>
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

