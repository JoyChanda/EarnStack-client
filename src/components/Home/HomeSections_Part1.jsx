import { Card } from '../ui';

/**
 * 📊 PLATFORM STATISTICS SECTION
 */
export const Stats = () => {
    const stats = [
        { label: "Active Workers", value: "15,000+", icon: "👥", color: "from-blue-500 to-indigo-500" },
        { label: "Tasks Completed", value: "450K+", icon: "✅", color: "from-green-500 to-emerald-500" },
        { label: "Coins Paid Out", value: "2.5M+", icon: "🪙", color: "from-yellow-400 to-orange-500" },
        { label: "Verified Buyers", value: "2,500+", icon: "🏢", color: "from-purple-500 to-pink-500" }
    ];

    return (
        <section className="section-spacing bg-neutral-50 dark:bg-neutral-900/50">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <Card key={index} variant="hover" className="text-center p-8">
                            <div className={`text-4xl mb-4 p-4 rounded-2xl bg-gradient-to-br ${stat.color} bg-opacity-10 inline-block`}>
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl font-black text-neutral-900 dark:text-white mb-2">{stat.value}</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 font-medium">{stat.label}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * 🛠️ HOW IT WORKS SECTION
 */
export const HowItWorks = () => {
    const steps = [
        { title: "Register Account", desc: "Create your profile as a Worker or Task Creator in seconds.", icon: "📝" },
        { title: "Complete Tasks", desc: "Browse through thousands of available micro-tasks and pick what suits you.", icon: "⚡" },
        { title: "Verify & Earn", desc: "Submit your proof, wait for verification, and get paid instantly to your wallet.", icon: "💰" }
    ];

    return (
        <section className="section-spacing bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-16">
                    <h2 className="text-gradient text-4xl md:text-5xl font-black mb-4">How it Works</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                        Getting started with EarnStack is easy. Follow these simple steps to start earning or crowdsourcing.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connection Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-200 dark:bg-neutral-800 -translate-y-12 z-0" />
                    
                    {steps.map((step, index) => (
                        <div key={index} className="relative z-10 text-center space-y-4">
                            <div className="w-20 h-20 bg-primary-500 text-white text-3xl rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-primary-500/20 mb-8 border-4 border-white dark:border-neutral-950">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * ✨ CORE FEATURES SECTION
 */
export const Features = () => {
    const features = [
        { title: "Escrow Protection", desc: "Payments are held in escrow to ensure trust between workers and buyers.", icon: "🛡️" },
        { title: "Fast Verification", desc: "Our system facilitates quick task verification and payout cycles.", icon: "🚀" },
        { title: "Identity Verification", desc: "All users are verified to maintain a high-quality community.", icon: "🆔" },
        { title: "Multiple Categories", desc: "From social media engagement to complex data annotation.", icon: "🧩" },
        { title: "Real-time Support", desc: "Dedicated support team available 24/7 to resolve disputes.", icon: "🎧" },
        { title: "Low Fees", desc: "Maximize your earnings with our transparent and low fee structure.", icon: "📉" }
    ];

    return (
        <section className="section-spacing bg-neutral-50 dark:bg-neutral-900/30">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">Why Choose EarnStack?</h2>
                    <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
                        We provide the most robust and secure environment for micro-tasking globally.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} variant="hover" className="flex gap-4 items-start p-8">
                            <div className="text-3xl bg-white dark:bg-neutral-800 p-3 rounded-xl shadow-sm">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 text-sm">{feature.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
