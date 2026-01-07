import { useState, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Card, Input, Button } from '../../components/ui';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        photo: user?.photoURL || '',
        email: user?.email || '',
        phone: '+1 (555) 000-0000', // Placeholder
        address: 'Digital City, EarnLand', // Placeholder
        bio: 'Passionate digital worker and community member since 2023.' // Placeholder
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserProfile(formData.name, formData.photo);
            setIsEditing(false);
            // In a real app, you'd also update the backend DB here
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in space-y-8">
            {/* Header / Avatar Section */}
            <div className="relative">
                <div className="h-48 w-full bg-gradient-to-r from-primary-600 to-secondary-600 rounded-[2rem] shadow-xl" />
                <div className="absolute -bottom-12 left-8 flex items-end gap-6">
                    <div className="relative group">
                        <img 
                            src={formData.photo || "https://i.pravatar.cc/150"} 
                            alt="Avatar" 
                            className="w-32 h-32 rounded-[2rem] border-8 border-white dark:border-neutral-900 object-cover shadow-2xl" 
                        />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center cursor-pointer group-hover:opacity-100 transition-opacity">
                                <span className="text-white text-xs font-bold">Edit</span>
                            </div>
                        )}
                    </div>
                    <div className="pb-4">
                        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">{formData.name}</h1>
                        <p className="text-neutral-500 font-medium">Verified Worker • Joined Oct 2023</p>
                    </div>
                </div>
                <div className="absolute top-4 right-4">
                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)} size="sm" className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30">
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mt-16 pt-12">
                {/* Information Card */}
                <Card className="lg:col-span-2 p-8 border-none bg-white dark:bg-neutral-900 shadow-sm">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black">Personal Information</h2>
                            {isEditing && (
                                <div className="flex gap-2">
                                    <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                                    <Button type="submit" size="sm" loading={loading}>Save Changes</Button>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Input 
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input 
                                label="Email Address"
                                value={formData.email}
                                disabled={true} // Email usually not editable directly
                            />
                            <Input 
                                label="Photo URL"
                                value={formData.photo}
                                onChange={(e) => setFormData({...formData, photo: e.target.value})}
                                disabled={!isEditing}
                            />
                            <Input 
                                label="Phone Number"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="label-base">Biography</label>
                            <textarea 
                                value={formData.bio}
                                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                disabled={!isEditing}
                                className="w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-sm font-medium border-none focus:ring-2 ring-primary-500 outline-none h-32 disabled:opacity-70"
                            />
                        </div>
                    </form>
                </Card>

                {/* Account Stats / Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm space-y-6">
                        <h3 className="font-black text-lg">Account Status</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/10 text-green-600 text-sm font-bold">
                                <span>Verification Status</span>
                                <span>Verified ✅</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-primary-50 dark:bg-primary-900/10 text-primary-600 text-sm font-bold">
                                <span>Available Coins</span>
                                <span>🪙 1,250</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm space-y-6">
                        <h3 className="font-black text-lg">Quick Actions</h3>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" className="justify-start">Withdraw Funds</Button>
                            <Button variant="outline" className="justify-start">Transaction History</Button>
                            <Button variant="outline" className="justify-start">Security Settings</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
