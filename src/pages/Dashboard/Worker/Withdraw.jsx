import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import axiosSecure from "../../../services/axiosSecure";
import useUser from "../../../hooks/useUser";
import { Card, Input, Button, Badge } from "../../../components/ui";

const Withdraw = () => {
    const { user } = useContext(AuthContext);
    const [dbUser, isUserLoading, refetch] = useUser();
    const [loading, setLoading] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [withdrawCoin, setWithdrawCoin] = useState(0);

    const COIN_TO_USD = 20; // 20 coins = 1 dollar

    useEffect(() => {
        // Calculate USD based on coins
        setWithdrawAmount(withdrawCoin / COIN_TO_USD);
    }, [withdrawCoin]);

    const handleWithdraw = async (e) => {
        e.preventDefault();
        
        if (withdrawCoin > dbUser?.coin) {
            return alert("Insufficient coin balance!");
        }

        if (withdrawCoin < 200) {
            return alert("Minimum withdrawal is 200 coins ($10)!");
        }

        setLoading(true);
        try {
            const formData = e.target;
            const withdrawData = {
                worker_email: user?.email,
                worker_name: user?.displayName,
                withdrawal_coin: Number(withdrawCoin),
                withdrawal_amount: Number(withdrawAmount),
                payment_system: formData.payment_system.value,
                account_number: formData.account_number.value,
                status: "pending",
                createdAt: new Date(),
            };

            const res = await axiosSecure.post("/withdraw", withdrawData);
            if (res.data.success) {
                alert("Withdrawal request sent! 🎉 Waiting for admin approval.");
                setWithdrawCoin(0);
                formData.reset();
                refetch();
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Withdraw Earnings</h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-2">Convert your hard-earned coins into real money instantly.</p>
                </div>
                <div className="flex items-center gap-4 px-6 py-4 bg-primary-500 rounded-2xl shadow-xl shadow-primary-500/20 text-white">
                    <div className="text-3xl">🪙</div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Available Coins</p>
                        <p className="text-2xl font-black">{isUserLoading ? "..." : dbUser?.coin || 0}</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                {/* Form Area */}
                <Card variant="base" className="md:col-span-3 p-8 border-2 border-primary-500/10 h-fit">
                    <form onSubmit={handleWithdraw} className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Withdraw Coins</label>
                                <input 
                                    type="number" 
                                    min="200"
                                    value={withdrawCoin}
                                    onChange={(e) => setWithdrawCoin(e.target.value)}
                                    className="input-base text-lg font-black"
                                    placeholder="e.g. 500"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Amount (USD)</label>
                                <div className="input-base flex items-center bg-neutral-50 dark:bg-neutral-900/50 text-lg font-black text-primary-600">
                                    <span className="opacity-50 mr-1">$</span>
                                    {withdrawAmount.toFixed(2)}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Payment System</label>
                            <select name="payment_system" className="input-base font-bold" required>
                                <option value="bkash">Bkash</option>
                                <option value="rocket">Rocket</option>
                                <option value="nagad">Nagad</option>
                            </select>
                        </div>

                        <Input 
                            label="Account Number"
                            name="account_number"
                            placeholder="e.g. 017XXXXXXXX"
                            required
                        />

                        <div className="pt-4">
                            <Button 
                                type="submit" 
                                className="w-full py-4 text-base font-black shadow-xl shadow-primary-500/25"
                                loading={loading}
                                disabled={withdrawCoin > (dbUser?.coin || 0) || withdrawCoin < 200}
                            >
                                Submit Request
                            </Button>
                        </div>
                    </form>
                </Card>

                {/* Info Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/50 p-6 rounded-2xl">
                        <h4 className="font-bold text-primary-900 dark:text-primary-100 flex items-center gap-2">
                            <span>ℹ️</span> Withdrawal Rules
                        </h4>
                        <ul className="mt-4 space-y-3">
                            <li className="flex gap-3 text-xs font-medium text-primary-700 dark:text-primary-400">
                                <span className="text-primary-500 font-black">•</span>
                                Minimum withdrawal is 200 coins ($10.00)
                            </li>
                            <li className="flex gap-3 text-xs font-medium text-primary-700 dark:text-primary-400">
                                <span className="text-primary-500 font-black">•</span>
                                Conversion rate: 20 Coins = $1.00
                            </li>
                            <li className="flex gap-3 text-xs font-medium text-primary-700 dark:text-primary-400">
                                <span className="text-primary-500 font-black">•</span>
                                Processing time: 24 - 48 Hours
                            </li>
                            <li className="flex gap-3 text-xs font-medium text-primary-700 dark:text-primary-400">
                                <span className="text-primary-500 font-black">•</span>
                                Verified accounts only
                            </li>
                        </ul>
                    </div>

                    <Card variant="base" className="p-6 border-dashed border-2 border-neutral-200 dark:border-neutral-800 text-center space-y-2">
                        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Need Help?</p>
                        <p className="text-sm font-medium text-neutral-500">Contact support for payment related issues.</p>
                        <Button variant="ghost" className="text-xs font-black">Support Center ➔</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
