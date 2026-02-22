import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import { Card, Button } from '../../components/ui';
import useUser from '../../hooks/useUser';
import axiosSecure from '../../services/axiosSecure';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';

const StatCard = ({ icon, label, value, sub }) => (
    <Card variant="hover" className="border-none bg-white dark:bg-neutral-900 shadow-sm">
        <div className="text-3xl mb-3">{icon}</div>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">{value}</p>
        {sub && <p className="text-xs text-neutral-400 mt-1">{sub}</p>}
    </Card>
);

// ─── Worker Dashboard ──────────────────────────────────────────────────────────
const WorkerDashboard = ({ user, dbUser }) => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['worker-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/worker-stats/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const COLORS = ['#8b5cf6', '#f59e0b', '#ef4444'];
    const pieData = [
        { name: 'Total', value: stats?.totalSubmissions || 0 },
        { name: 'Pending', value: stats?.pendingSubmissions || 0 },
        { name: 'Earnings', value: stats?.totalEarnings || 0 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary-600 to-secondary-600 p-8 rounded-3xl text-white shadow-xl">
                <div>
                    <h1 className="text-3xl font-black mb-2">Welcome, {user?.displayName || 'Worker'}! 👋</h1>
                    <p className="text-primary-100/90 text-sm">You have <span className="font-black">🪙 {dbUser?.coin || 0}</span> coins in your wallet.</p>
                </div>
                <Link to="/tasks">
                    <button className="px-6 py-2.5 bg-white text-primary-700 font-black rounded-xl hover:bg-neutral-100 transition-colors shadow-lg text-sm">
                        Browse Tasks
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />)
                ) : (
                    <>
                        <StatCard icon="📤" label="Total Submissions" value={stats?.totalSubmissions ?? 0} />
                        <StatCard icon="⏳" label="Pending Review" value={stats?.pendingSubmissions ?? 0} />
                        <StatCard icon="🏆" label="Total Earnings" value={`🪙 ${stats?.totalEarnings ?? 0}`} />
                    </>
                )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm">
                    <h3 className="text-lg font-black mb-6">Submission Breakdown</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={5} dataKey="value">
                                    {pieData.map((_, index) => <Cell key={index} fill={COLORS[index]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '12px', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {pieData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-xs font-bold text-neutral-500">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm flex flex-col justify-between">
                    <h3 className="text-lg font-black mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/tasks" className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors group">
                            <span className="text-2xl">🔍</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">Find New Tasks</p>
                                <p className="text-xs text-neutral-500">Browse available tasks to earn coins</p>
                            </div>
                        </Link>
                        <Link to="/dashboard/my-submissions" className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                            <span className="text-2xl">📋</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">My Submissions</p>
                                <p className="text-xs text-neutral-500">Track your submitted work</p>
                            </div>
                        </Link>
                        <Link to="/dashboard/withdraw" className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                            <span className="text-2xl">💳</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">Withdraw Earnings</p>
                                <p className="text-xs text-neutral-500">Convert coins to real money</p>
                            </div>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// ─── Buyer Dashboard ───────────────────────────────────────────────────────────
const BuyerDashboard = ({ user, dbUser }) => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['buyer-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/buyer-stats/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-secondary-600 to-primary-600 p-8 rounded-3xl text-white shadow-xl">
                <div>
                    <h1 className="text-3xl font-black mb-2">Welcome, {user?.displayName || 'Buyer'}! 🛒</h1>
                    <p className="text-primary-100/90 text-sm">Balance: <span className="font-black">🪙 {dbUser?.coin || 0}</span> coins available.</p>
                </div>
                <Link to="/dashboard/add-tasks">
                    <button className="px-6 py-2.5 bg-white text-secondary-700 font-black rounded-xl hover:bg-neutral-100 transition-colors shadow-lg text-sm">
                        Post New Task
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />)
                ) : (
                    <>
                        <StatCard icon="📋" label="Total Tasks Posted" value={stats?.totalTasks ?? 0} />
                        <StatCard icon="👷" label="Pending Workers" value={stats?.pendingTaskWorkers ?? 0} sub="Workers yet to complete tasks" />
                        <StatCard icon="💸" label="Total Spent" value={`$${stats?.totalPayment ?? 0}`} />
                    </>
                )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm flex flex-col justify-between">
                    <h3 className="text-lg font-black mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <Link to="/dashboard/add-tasks" className="flex items-center gap-3 p-4 rounded-xl bg-secondary-50 dark:bg-secondary-900/20 hover:bg-secondary-100 dark:hover:bg-secondary-900/40 transition-colors">
                            <span className="text-2xl">➕</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">Post a New Task</p>
                                <p className="text-xs text-neutral-500">Create tasks for workers to complete</p>
                            </div>
                        </Link>
                        <Link to="/dashboard/my-tasks" className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                            <span className="text-2xl">📂</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">My Tasks & Reviews</p>
                                <p className="text-xs text-neutral-500">Approve or reject worker submissions</p>
                            </div>
                        </Link>
                        <Link to="/dashboard/payments" className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors">
                            <span className="text-2xl">🪙</span>
                            <div>
                                <p className="font-bold text-neutral-900 dark:text-white text-sm">Purchase Coins</p>
                                <p className="text-xs text-neutral-500">Refill your balance to post more tasks</p>
                            </div>
                        </Link>
                    </div>
                </Card>

                <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm">
                    <h3 className="text-lg font-black mb-4">Coin Balance</h3>
                    <div className="flex flex-col items-center justify-center h-full gap-4 py-6">
                        <div className="w-24 h-24 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-5xl shadow-inner">
                            🪙
                        </div>
                        <p className="text-4xl font-black text-primary-600">{dbUser?.coin || 0}</p>
                        <p className="text-sm text-neutral-500 font-medium">Coins Available</p>
                        <Link to="/dashboard/payments">
                            <Button size="sm" className="font-bold">Buy More Coins</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

// ─── Admin Dashboard ───────────────────────────────────────────────────────────
const AdminDashboard = ({ user }) => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        },
    });

    const chartData = [
        { name: 'Workers', value: stats?.totalWorkers ?? 0 },
        { name: 'Buyers', value: stats?.totalBuyers ?? 0 },
        { name: 'Coins', value: stats?.totalCoins ?? 0 },
        { name: 'Payments', value: stats?.totalPaymentsCount ?? 0 },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-neutral-800 to-neutral-700 p-8 rounded-3xl text-white shadow-xl">
                <div>
                    <h1 className="text-3xl font-black mb-2">Admin Control Panel 🛡️</h1>
                    <p className="text-neutral-300 text-sm">Manage the entire EarnStack platform from here.</p>
                </div>
                <Link to="/dashboard/manage-users">
                    <button className="px-6 py-2.5 bg-white text-neutral-900 font-black rounded-xl hover:bg-neutral-100 transition-colors shadow-lg text-sm">
                        Manage Users
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, i) => <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-2xl" />)
                ) : (
                    <>
                        <StatCard icon="👷" label="Workers" value={stats?.totalWorkers ?? 0} />
                        <StatCard icon="🛒" label="Buyers" value={stats?.totalBuyers ?? 0} />
                        <StatCard icon="🪙" label="Total Coins" value={(stats?.totalCoins ?? 0).toLocaleString()} />
                        <StatCard icon="💰" label="Payments" value={`$${(stats?.totalPaymentAmount ?? 0).toLocaleString()}`} />
                        <StatCard icon="🧾" label="Pending Revenue" value={`🪙 ${(stats?.totalPendingRevenue ?? 0).toLocaleString()}`} />
                        <StatCard icon="💳" label="Withdrawals" value={`$${(stats?.totalWithdrawalAmount ?? 0).toLocaleString()}`} />
                    </>
                )}
            </div>

            <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm">
                <h3 className="text-lg font-black mb-6">Platform Overview</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                            <Tooltip contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '12px', color: '#fff' }} />
                            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: '👥', label: 'Manage Users', desc: 'View, promote, or remove users', path: '/dashboard/manage-users' },
                    { icon: '📋', label: 'All Tasks', desc: 'Moderate platform tasks', path: '/dashboard/manage-tasks' },
                    { icon: '💰', label: 'Withdrawals', desc: 'Approve worker withdrawals', path: '/dashboard/withdrawals' },
                ].map((action) => (
                    <Link key={action.path} to={action.path}>
                        <Card variant="hover" className="p-6 border-none shadow-sm cursor-pointer">
                            <div className="text-3xl mb-3">{action.icon}</div>
                            <p className="font-black text-neutral-900 dark:text-white">{action.label}</p>
                            <p className="text-xs text-neutral-500 mt-1">{action.desc}</p>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const DashboardHome = () => {
    const { user, loading: authLoading, logOut } = useContext(AuthContext);
    const [dbUser, isUserLoading] = useUser();
    const navigate = useNavigate();

    const userRole = dbUser?.role;

    const handleDashboardLogout = async () => {
        await logOut();
        localStorage.removeItem("access-token");
        navigate("/login");
    };

    if (isUserLoading || authLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-40 bg-neutral-200 dark:bg-neutral-800 rounded-3xl" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    if (!user) return <div className="text-center py-20 font-bold opacity-50">Please login to continue.</div>;

    if (userRole === 'admin') return <AdminDashboard user={user} />;
    if (userRole === 'buyer') return <BuyerDashboard user={user} dbUser={dbUser} />;
    if (userRole === 'worker') return <WorkerDashboard user={user} dbUser={dbUser} />;

    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
            <div className="text-5xl mb-4">⌛</div>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Verifying Permissions...</h2>
            <p className="text-neutral-500 mt-2 max-w-sm">We're confirming your access level. This can happen during a role update or if your session needs a refresh.</p>
            <div className="flex gap-4 mt-8">
                <Button onClick={() => window.location.reload()} variant="primary">Refresh Data</Button>
                <Button onClick={handleDashboardLogout} variant="outline" className="text-red-500">Logout & Re-login</Button>
            </div>
        </div>
    );
};

export default DashboardHome;
