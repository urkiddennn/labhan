import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: 'Magkano ang pagpapalaba per kilo?',
        answer: 'Naka-depende sa klase ng labahin (wash & fold, dry cleaning, etc.). Karaniwan itong nagsisimula sa ₱35 per kilo para sa regular wash and fold.'
    },
    {
        question: 'Gaano katagal bago makuha ang mga labahin?',
        answer: 'Aabutin ng 24 oras para sa regular na serbisyo. Subalit mayroon din kaming express service (rush) na maaring makuha sa loob ng 3-6 oras.'
    },
    {
        question: 'Mayroon bang delivery fee?',
        answer: 'Libre ang delivery kung aabot sa minimum na tig-5 kilo ang iyong papalabhan. Para sa mga mas mababa sa 5 kilo, may maliit na delivery fee na ₱50.'
    },
    {
        question: 'Paano magbayad?',
        answer: 'Tumatanggap kami ng Cash on Delivery, GCash, at credit/debit card sa pamamagitan ng aming app.'
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 px-4 md:px-12 bg-white flex flex-col md:flex-row gap-12 max-w-7xl mx-auto items-center">
            <div className="md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#69b8c4] mb-10 leading-tight">
                    Mga Madalas <br /> Itanong
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl overflow-hidden transition-colors ${openIndex === index ? 'bg-[#f7a83a] text-white' : 'bg-[#e7f5f8] text-gray-700'
                                }`}
                        >
                            <button
                                className="w-full p-5 text-left font-bold flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>

                            {openIndex === index && (
                                <div className="p-5 pt-0 text-orange-50 bg-white bg-opacity-10 text-sm leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="md:w-1/2 relative flex justify-center">
                {/* Decorative elements */}
                <div className="w-full max-w-md relative">
                    <img
                        src="https://images.unsplash.com/photo-1582735689369-0fe89e00caeb?q=80&w=600&auto=format&fit=crop"
                        alt="Customer asking questions"
                        className="w-full auto rounded-[2rem] shadow-2xl"
                    />
                    <div className="absolute top-10 right-10 flex -space-x-4">
                        <div className="w-16 h-16 rounded-full bg-[#f7a83a] opacity-50 absolute -top-4 -right-4 blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
