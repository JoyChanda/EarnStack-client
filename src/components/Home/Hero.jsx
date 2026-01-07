import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const slides = [
        {
            title: "Earn Crypto by Completing Simple Tasks",
            description: "Join thousands of workers earning daily by performing micro-tasks. Simple, fast, and secure payments directly to your wallet.",
            buttonText: "Start Earning",
            buttonLink: "/register",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop",
            accent: "from-primary-600 to-secondary-600"
        },
        {
            title: "Crowdsource Your Tasks to Global Talent",
            description: "Need help with data labeling, testing, or content creation? Tap into our global workforce for high-quality results at scale.",
            buttonText: "Post a Task",
            buttonLink: "/register",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
            accent: "from-secondary-600 to-accent-600"
        },
        {
            title: "Verified Identity & Secure Payments",
            description: "Our platform ensures trust with verified profiles and escrowed payments. Your earnings are always safe and transparent.",
            buttonText: "Join Community",
            buttonLink: "/about",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop",
            accent: "from-accent-600 to-primary-600"
        }
    ];

    return (
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-neutral-900">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0">
                                <img 
                                    src={slide.image} 
                                    className="w-full h-full object-cover" 
                                    alt={slide.title} 
                                />
                                <div className="absolute inset-0 bg-neutral-900/70 backdrop-blur-[2px]" />
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent} opacity-20`} />
                            </div>

                            {/* Content */}
                            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto space-y-6">
                                <h1 className="text-4xl md:text-6xl font-black text-white leading-tight animate-slide-up">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-neutral-300 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                    {slide.description}
                                </p>
                                <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                                    <Link to={slide.buttonLink}>
                                        <Button size="lg" className="shadow-2xl">{slide.buttonText}</Button>
                                    </Link>
                                    <Link to="/how-it-works">
                                        <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-neutral-900">Learn More</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-white rounded-full" />
                </div>
            </div>
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-primary-500/10 blur-[150px] rounded-full" />
                <div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-secondary-500/10 blur-[150px] rounded-full" />
            </div>
        </section>
    );
};

export default Hero;
