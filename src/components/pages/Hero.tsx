import React from "react";
import Header from "../Header";
import HeroSection from "../HeroSection";
import ServicesSection from "../ServicesSection";
import ShopMap from "../ShopMap";
import CTA1Section from "../CTA1Section";
import FAQSection from "../FAQSection";
import Footer from "../Footer";

const HeroPage: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 bg-white">
            <Header />
            <HeroSection />
            <ServicesSection />
            <ShopMap />
            <CTA1Section />
            <FAQSection />
            <Footer />
        </div>
    )
}

export default HeroPage
