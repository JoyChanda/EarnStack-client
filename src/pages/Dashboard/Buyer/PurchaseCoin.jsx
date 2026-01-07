import { useContext, useState } from "react";
import axiosSecure from "../../../services/axiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { Card, Button } from "../../../components/ui";

const PurchaseCoin = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(null);

    const coinPacks = [
        { coins: 10, price: 1, label: 'Starter Pack' },
        { coins: 150, price: 10, label: 'Standard Pack', popular: true },
        { coins: 500, price: 20, label: 'Power Pack' },
        { coins: 1000, price: 35, label: 'Ultimate Pack' },
    ];

    const handlePurchase = async (packId, coins, price) => {
        setLoading(packId);
        try {
            const res = await axiosSecure.post("/payments", {
                coin: coins,
                price: price,
                email: user?.email,
                userName: user?.displayName,
            });

            if (res.data.success) {
                alert(`Successfully purchased ${coins} coins! 🎉`);
                // In a real app, you'd trigger a global state update or refetch balance here
            }
        } catch (error) {
            console.error("Purchase error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-neutral-900 dark:text-white">Refill Your Coins</h1>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
                    Choose a pack to instantly boost your balance. Use coins to post tasks and get your work done by global talent.
                </p>
            </div>

            {/* Coin Packs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coinPacks.map((pack, index) => (
                    <Card 
                        key={index} 
                        variant="base" 
                        className={`relative p-8 flex flex-col items-center text-center transition-all hover:scale-105 duration-300 ${pack.popular ? 'border-2 border-primary-500 shadow-2xl shadow-primary-500/10' : 'border border-neutral-200 dark:border-neutral-800'}`}
                    >
                        {pack.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6 w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                            🪙
                        </div>

                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{pack.label}</h3>
                        <div className="flex items-baseline gap-1 mb-6">
                            <span className="text-3xl font-black text-primary-600">{pack.coins}</span>
                            <span className="text-sm font-bold text-neutral-500 uppercase">Coins</span>
                        </div>

                        <div className="w-full pt-6 border-t border-neutral-100 dark:border-neutral-800">
                            <div className="text-2xl font-black text-neutral-900 dark:text-white mb-6">
                                ${pack.price}
                            </div>
                            <Button 
                                onClick={() => handlePurchase(index, pack.coins, pack.price)}
                                variant={pack.popular ? 'primary' : 'outline'}
                                className="w-full font-bold py-4"
                                loading={loading === index}
                            >
                                Purchase Now
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Security Note */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-neutral-400 text-sm font-medium pt-8">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🔒</span> Secure SSL Encryption
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span> Instant Delivery
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">💳</span> Major Cards Supported
                </div>
            </div>
        </div>
    );
};

export default PurchaseCoin;
