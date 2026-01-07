import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Card, Button } from '../../components/ui';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    
    // Mock user role
    const userRole = user?.email === 'admin@earnstack.com' ? 'admin' : 'worker';

    // Mock Data
    const stats = [
        { label: "Total Earnings", value: "🪙 1,250", icon: "💰", trend: "+12%" },
        { label: "Tasks Completed", value: "48", icon: "✅", trend: "+5%" },
        { label: "Active Tasks", value: "5", icon: "⚡", trend: "0%" },
        { label: "Pending Verification", value: "12", icon: "⏳", trend: "-2%" }
    ];

    const chartData = [
        { name: 'Mon', earnings: 400, tasks: 24 },
        { name: 'Tue', earnings: 300, tasks: 13 },
        { name: 'Wed', earnings: 200, tasks: 90 },
        { name: 'Thu', earnings: 278, tasks: 39 },
        { name: 'Fri', earnings: 189, tasks: 48 },
        { name: 'Sat', earnings: 239, tasks: 38 },
        { name: 'Sun', earnings: 349, tasks: 43 },
    ];

    const pieData = [
        { name: 'Completed', value: 400 },
        { name: 'Pending', value: 300 },
        { name: 'Rejected', value: 100 },
    ];

    const COLORS = ['#8b5cf6', '#3b82f6', '#ef4444'];

    const recentActions = [
        { id: 1, action: "Task Submitted", project: "Audit TechBrand", status: "Pending", date: "2 mins ago" },
        { id: 2, action: "Payment Received", project: "Product Review", status: "Completed", date: "4 hours ago" },
        { id: 3, action: "New Task Available", project: "AI Annotation", status: "System", date: "1 day ago" },
        { id: 4, action: "Identity Verified", project: "Profile", status: "Completed", date: "2 days ago" }
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Banner */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-primary-600 to-secondary-600 p-8 rounded-3xl text-white shadow-xl">
                <div>
                    <h1 className="text-3xl font-black mb-2">Welcome back, {user?.displayName || 'User'}! 👋</h1>
                    <p className="text-primary-100/90 text-sm">You have 5 new tasks available and 3 pending verifications today.</p>
                </div>
                <Button className="bg-white text-primary-600 hover:bg-neutral-100 font-bold">
                    Browse All Tasks
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <Card key={i} variant="hover" className="border-none bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div className="text-2xl p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl mb-4">{stat.icon}</div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h4 className="text-neutral-500 dark:text-neutral-500 text-xs font-bold uppercase tracking-widest">{stat.label}</h4>
                        <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Bar Chart */}
                <Card className="lg:col-span-2 p-6 bg-white dark:bg-neutral-900 border-none shadow-sm">
                    <h3 className="text-lg font-black mb-6">Earnings vs Tasks Weekly</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#171717', border: 'none', borderRadius: '12px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Bar dataKey="earnings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="tasks" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Pie Chart */}
                <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm flex flex-col">
                    <h3 className="text-lg font-black mb-6">Task Distribution</h3>
                    <div className="h-64 w-full flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {pieData.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                                <span className="text-xs font-bold text-neutral-500">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Table Section */}
            <Card className="p-6 bg-white dark:bg-neutral-900 border-none shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-black">Recent Activity</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-neutral-100 dark:border-neutral-800">
                            <tr className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                <th className="pb-4 px-2">Action</th>
                                <th className="pb-4 px-2">Project</th>
                                <th className="pb-4 px-2">Status</th>
                                <th className="pb-4 px-2">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {recentActions.map((action) => (
                                <tr key={action.id} className="text-sm">
                                    <td className="py-4 px-2 font-bold text-neutral-900 dark:text-white">{action.action}</td>
                                    <td className="py-4 px-2 text-neutral-600 dark:text-neutral-400">{action.project}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            action.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                                            action.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            {action.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-neutral-500">{action.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default DashboardHome;
