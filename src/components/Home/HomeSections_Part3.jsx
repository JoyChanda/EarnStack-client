import { useState } from 'react';
import { Card, Button, Input } from '../ui';

/**
 * ❓ FAQ SECTION
 */
export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
        { q: "How do I earn coins?", a: "Browse the 'Available Tasks' section, choose a task that matches your skills, follow the instructions, and submit your proof. Once verified, coins will be added to your account." },
        { q: "Can I withdraw my earnings?", a: "Yes, you can exchange your coins for various rewards or withdraw them to supported cryptocurrency wallets once you reach the minimum threshold." },
        { q: "What happens if a task is rejected?", a: "If your task is rejected, you will receive feedback from the creator. You can appeal or fix the issue if given the chance. We ensure fair disputes through our audit team." },
        { q: "How do I create a task?", a: "Switch your account type to 'Task Creator', deposit coins, and click 'Create New Task'. Fill in the instructions and required proof, then publish it for the community." }
    ];

    return (
        <section className="section-spacing bg-neutral-50 dark:bg-neutral-900/30">
            <div className="max-w-7xl mx-auto container-padding">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6">Frequently Asked Questions</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-lg">
                            Can't find what you're looking for? Reach out to our support team and we'll get back to you within 24 hours.
                        </p>
                        <Button variant="secondary">Contact Support</Button>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card 
                                key={index} 
                                className={`cursor-pointer overflow-hidden transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-primary-500' : ''}`}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                <div className="flex justify-between items-center p-2">
                                    <h4 className="font-bold text-neutral-900 dark:text-white">{faq.q}</h4>
                                    <span className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>
                                <div className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-40 opacity-100 p-4 pt-0' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <p className="text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                                        {faq.a}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * 📣 CALL TO ACTION SECTION
 */
export const CTA = () => {
    return (
        <section className="container-padding py-20">
            <div className="relative rounded-card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600" />
                <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" />
                <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-4xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Ready to Start Your <span className="underline decoration-accent-400">Earning Journey</span>?
                    </h2>
                    <p className="text-xl text-neutral-100/90 leading-relaxed">
                        Join over 150,000+ members already earning daily rewards. It takes less than 60 seconds to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" className="bg-white text-primary-600 hover:bg-neutral-100 sm:w-auto w-full">Join as Worker</Button>
                        <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 sm:w-auto w-full">Post Your Tasks</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

/**
 * 📧 NEWSLETTER SECTION
 */
export const Newsletter = () => {
    return (
        <section className="section-spacing bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto container-padding">
                <Card variant="glass" className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30 p-12 text-center rounded-[2rem]">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="text-5xl mb-4">🚀</div>
                        <h2 className="text-3xl md:text-4xl font-black">Stay Ahead with EarnStack</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                            Get information about new high-paying task categories and platform updates delivered straight to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 mt-8">
                            <Input 
                                type="email" 
                                name="newsletter" 
                                placeholder="Enter your email address" 
                                className="flex-1 bg-white dark:bg-neutral-800"
                            />
                            <Button size="lg">Subscribe Now</Button>
                        </form>
                        <p className="text-xs text-neutral-500">We respect your privacy. Unsubscribe at any time.</p>
                    </div>
                </Card>
            </div>
        </section>
    );
};
