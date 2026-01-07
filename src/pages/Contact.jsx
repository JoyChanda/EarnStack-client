import { Card, Input, Button } from "../components/ui";

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto container-padding section-spacing pt-32">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black">Get in <span className="text-primary-600">Touch</span></h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400">
                            Have questions about our platform or facing an issue with a task? Our support team is here to help you 24/7.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center rounded-xl text-2xl">📍</div>
                            <div>
                                <h4 className="font-bold">Our Headquarters</h4>
                                <p className="text-sm text-neutral-500">123 Payment Street, Digital City, 56789</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
                            <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 flex items-center justify-center rounded-xl text-2xl">📧</div>
                            <div>
                                <h4 className="font-bold">Email Support</h4>
                                <p className="text-sm text-neutral-500">support@earnstack.com</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
                            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 text-accent-600 flex items-center justify-center rounded-xl text-2xl">💬</div>
                            <div>
                                <h4 className="font-bold">Live Chat</h4>
                                <p className="text-sm text-neutral-500">Available Mon-Fri, 9am - 6pm EST</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="p-8 md:p-12 shadow-2xl border-none bg-white dark:bg-neutral-900">
                    <form className="space-y-6">
                        <h2 className="text-2xl font-black mb-4">Send us a Message</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Input label="First Name" placeholder="John" required />
                            <Input label="Last Name" placeholder="Doe" required />
                        </div>
                        <Input label="Email Address" type="email" placeholder="john@example.com" required />
                        <div className="space-y-1.5">
                            <label className="label-base">Message</label>
                            <textarea 
                                placeholder="How can we help you?"
                                className="w-full bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4 text-sm font-medium border-none focus:ring-2 ring-primary-500 outline-none h-40"
                                required
                            />
                        </div>
                        <Button className="w-full py-4 font-bold">Send Message</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Contact;
