import React, { lazy, Suspense } from "react";
import Header from "../Header";
import HeroSection from "../HeroSection";
import ServicesSection from "../ServicesSection";
import CTA1Section from "../CTA1Section";
import FAQSection from "../FAQSection";
import Footer from "../Footer";
import { Loader2 } from "lucide-react";

// Lazy load the map component since it is heavy and below the fold
const ShopMap = lazy(() => import("../ShopMap"));

const HeroPage: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 bg-white">
            <Header />
            <HeroSection />
            <ServicesSection />
            <Suspense fallback={
                <div className="w-full h-[600px] flex flex-col items-center justify-center bg-slate-50/50">
                    <Loader2 className="animate-spin text-[#69b8c4]" size={40} />
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-[#69b8c4] animate-pulse">Loading Map...</p>
                </div>
            }>
                <ShopMap />
            </Suspense>
            <CTA1Section />
            <FAQSection />
            <Footer />
        </div>
    )
}

export default HeroPage
