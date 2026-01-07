import Hero from "../components/Home/Hero";
import { Stats, HowItWorks, Features } from "../components/Home/HomeSections_Part1";
import { Categories, BestWorkers, Testimonials } from "../components/Home/HomeSections_Part2";
import { FAQ, CTA, Newsletter } from "../components/Home/HomeSections_Part3";
import { PlatformOverview } from "../components/Home/PlatformOverview";

const Home = () => {
    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            {/* 1. Hero / Carousel Section */}
            <Hero />

            {/* 2. Platform Introduction / Overview */}
            <PlatformOverview />

            {/* 3. Stats Section */}
            <Stats />

            {/* 4. How It Works Section */}
            <HowItWorks />

            {/* 5. Features Section */}
            <Features />

            {/* 6. Categories / Explore Section */}
            <Categories />

            {/* 7. Best Workers / Leaderboard Preview */}
            <BestWorkers />

            {/* 8. Call To Action (High Impact) */}
            <CTA />

            {/* 9. Testimonials (Customer Reviews) */}
            <Testimonials />

            {/* 10. FAQ Section */}
            <FAQ />

            {/* 11. Newsletter Subscription */}
            <Newsletter />
        </div>
    );
};

export default Home;
