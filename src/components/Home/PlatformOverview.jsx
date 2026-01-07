import { Button } from '../ui';

/**
 * 🌐 PLATFORM OVERVIEW SECTION
 */
export const PlatformOverview = () => {
    return (
        <section className="section-spacing overflow-hidden bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 space-y-8 animate-fade-in">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-bold tracking-wider uppercase">
                            Secure Micro-Tasking
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-neutral-900 dark:text-white">
                            Bridge the Gap Between <span className="text-primary-600">Work</span> and <span className="text-secondary-600">Earnings</span>
                        </h2>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                            EarnStack is not just another task platform. We've built a decentralized ecosystems where trust is automated through smart verification systems. Whether you're a student looking to earn pocket money or a startup needing scalable human intelligence, we've got you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg">Explore Platform</Button>
                            <Button variant="ghost" size="lg" className="flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                See Video Tutorial
                            </Button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-neutral-100 dark:border-neutral-900 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                                alt="Platform Dashboard Preview" 
                                className="w-full object-cover"
                            />
                        </div>
                        {/* Decorative Blobs */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};
