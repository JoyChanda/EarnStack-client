import { Card, Button } from '../../components/ui';

const WorkerSubmissions = () => {
    const submissions = [
        { id: 1, title: "Twitter Follow Task", creator: "TechBrand", coins: 25, status: "Approved", date: "Oct 24, 2023" },
        { id: 2, title: "App Review Task", creator: "FitLife", coins: 50, status: "Pending", date: "Oct 25, 2023" },
        { id: 3, title: "Data Annotation", creator: "AIData", coins: 80, status: "Rejected", date: "Oct 26, 2023" }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-black">My Submissions</h1>
            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800 text-xs font-bold uppercase text-neutral-400">
                                <th className="pb-4 px-2">Task Title</th>
                                <th className="pb-4 px-2">Creator</th>
                                <th className="pb-4 px-2">Coins</th>
                                <th className="pb-4 px-2">Status</th>
                                <th className="pb-4 px-2">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="text-sm">
                                    <td className="py-4 px-2 font-bold">{sub.title}</td>
                                    <td className="py-4 px-2">{sub.creator}</td>
                                    <td className="py-4 px-2 text-primary-600 font-bold">🪙 {sub.coins}</td>
                                    <td className="py-4 px-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                            sub.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                                            sub.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                            {sub.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-2 text-neutral-500">{sub.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default WorkerSubmissions;
