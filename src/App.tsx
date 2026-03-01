

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import CTA1Section from './components/CTA1Section';
import CTA2Section from './components/CTA2Section';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans text-gray-800 bg-white">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CTA1Section />
      <CTA2Section />
      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default App;
