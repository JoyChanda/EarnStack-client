import { Card, Button } from "../components/ui";

const About = () => {
    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-32">
            {/* Mission Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
                <div className="lg:w-1/2 space-y-8">
                    <h1 className="text-5xl md:text-7xl font-black leading-tight">
                        Our Mission is to <span className="text-gradient">Empower</span> Global Talent
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        EarnStack was founded on the belief that everyone should have access to earning opportunities, regardless of their location. We provide the tools for workers to earn in digital currencies while helping businesses scale through human-powered intelligence.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg">Join the Community</Button>
                        <Button variant="outline" size="lg">Read Our Whitepaper</Button>
                    </div>
                </div>
                <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" className="rounded-2xl shadow-lg mt-8" alt="Team" />
                    <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop" className="rounded-2xl shadow-lg" alt="Office" />
                </div>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-24">
                <Card variant="base" className="p-10 space-y-4 border-none bg-primary-50 dark:bg-primary-900/10">
                    <div className="text-4xl">🤝</div>
                    <h3 className="text-2xl font-bold">Trust & Security</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">We prioritize the security of your earnings and the quality of the work through rigorous verification.</p>
                </Card>
                <Card variant="base" className="p-10 space-y-4 border-none bg-secondary-50 dark:bg-secondary-900/10">
                    <div className="text-4xl">🌍</div>
                    <h3 className="text-2xl font-bold">Global Accessibility</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">Our platform is available in 150+ countries, bringing opportunities to remote regions worldwide.</p>
                </Card>
                <Card variant="base" className="p-10 space-y-4 border-none bg-accent-50 dark:bg-accent-900/10">
                    <div className="text-4xl">⚡</div>
                    <h3 className="text-2xl font-bold">Fast Payouts</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">No more waiting weeks for payments. Our coin-based system allows for near-instant withdrawals.</p>
                </Card>
            </div>

            {/* Stats Overview */}
            <div className="bg-neutral-900 rounded-[3rem] p-12 md:p-20 text-center text-white space-y-8">
                <h2 className="text-4xl font-black">Our Impact in Numbers</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    <div>
                        <p className="text-5xl font-black text-primary-500">2023</p>
                        <p className="text-neutral-400 mt-2 uppercase tracking-widest text-xs font-bold">Founded</p>
                    </div>
                    <div>
                        <p className="text-5xl font-black text-secondary-500">150K+</p>
                        <p className="text-neutral-400 mt-2 uppercase tracking-widest text-xs font-bold">Community Members</p>
                    </div>
                    <div>
                        <p className="text-5xl font-black text-accent-500">5M+</p>
                        <p className="text-neutral-400 mt-2 uppercase tracking-widest text-xs font-bold">Tasks Verified</p>
                    </div>
                    <div>
                        <p className="text-5xl font-black text-primary-400">$10M+</p>
                        <p className="text-neutral-400 mt-2 uppercase tracking-widest text-xs font-bold">Total Earnings</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
