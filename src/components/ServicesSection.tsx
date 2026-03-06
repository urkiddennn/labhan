import React from 'react';
import { Droplets, Percent, Shirt, Search } from 'lucide-react';

const services = [
    {
        icon: <Search size={32} className="text-[#69b8c4]" />,
        title: 'Find Shops Nearby',
        description: 'See every active laundry shop in your area on a live map.',
        link: 'Explore Map'
    },
    {
        icon: <Droplets size={32} className="text-[#69b8c4]" />,
        title: 'Instant Booking',
        description: 'Pumili ng shop at mag-book agad ng iyong labada gamit ang app.',
        link: 'Book Now'
    },
    {
        icon: <Shirt size={32} className="text-[#69b8c4]" />,
        title: 'Real-time Tracking',
        description: 'Malaman ang status ng iyong labahin kung ito ay nilalabhan na o pwede na kunin.',
        link: 'Track Progress'
    },
    {
        icon: <Percent size={32} className="text-[#69b8c4]" />,
        title: 'Simple Pricing',
        description: 'Transparent na presyo para sa lahat ng uri ng serbisyo ng labada.',
        link: 'View Prices'
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-slate-800 italic uppercase tracking-tighter mb-4">
                        Aming <span className="text-[#69b8c4]">System</span>
                    </h2>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-sm italic">Simpler, Faster, Better Laundry</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-slate-50 group hover:bg-white rounded-md p-10 flex flex-col items-center text-center transition-all duration-500 border border-slate-100 hover:border-[#69b8c4]/30 hover:-translate-y-2">
                            <div className="bg-white p-6 rounded-md mb-8 inline-flex group-hover:scale-110 transition-transform duration-500 border border-slate-100">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-800 mb-4 italic uppercase tracking-tight">{service.title}</h3>
                            <p className="text-slate-500 mb-8 flex-grow font-medium text-sm italic">{service.description}</p>
                            <span className="text-xs font-black uppercase tracking-widest text-[#69b8c4] group-hover:tracking-[0.2em] transition-all duration-500">
                                {service.link}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
