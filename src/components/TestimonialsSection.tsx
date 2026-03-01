import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: 'Juan Dela Cruz',
        role: 'Suki',
        content: 'Napakabilis at napakalinis ng serbisyo nila. Laging bago ang amoy ng damit ko!',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop'
    },
    {
        name: 'Maria Clara',
        role: 'Abalang Nanay',
        content: 'Malaking tulong ang Labhan para sa pamilya namin. Wala na akong inaalalang labahin tuwing weekend.',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    {
        name: 'Pedro Penduko',
        role: 'Estudyante',
        content: 'Swak sa budget ng estudyante at may libreng hatid pa. Highly recommended!',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&fit=crop'
    }
];

const TestimonialsSection: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-12 bg-[#F3FAFC]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#69b8c4] mb-4">
                        Ano Ang Sinasabi <br /> Ng Aming Mga Suki
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 border-t-8 border-t-yellow-100 flex flex-col items-center text-center">
                            <div className="flex gap-1 text-yellow-400 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" stroke="none" />
                                ))}
                            </div>

                            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-[#E6F4F8]">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                            <p className="text-sm font-medium text-[#69b8c4] mb-4">{item.role}</p>
                            <p className="text-gray-500 italic">"{item.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
