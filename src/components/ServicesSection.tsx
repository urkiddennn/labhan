import React from 'react';
import { Truck, Droplets, Percent, Shirt } from 'lucide-react';

const services = [
    {
        icon: <Truck size={32} className="text-orange-500" />,
        title: 'Laundry Pickup',
        description: 'Kukunin namin ang labahin mo sa iyong bahay.',
        link: 'Alamin ang detalye'
    },
    {
        icon: <Droplets size={32} className="text-orange-400" />,
        title: 'Wash And Fold',
        description: 'Malinis na paglalaba at maayos na pagtutupi ng mga damit.',
        link: 'Alamin ang detalye'
    },
    {
        icon: <Percent size={32} className="text-yellow-600" />,
        title: 'Bulk Discount',
        description: 'Makakuha ng diskwento sa maramihang pagpapalaba.',
        link: 'Alamin ang detalye'
    },
    {
        icon: <Shirt size={32} className="text-blue-400" />,
        title: 'Dry Cleaning',
        description: 'Espesyal na paglilinis para sa mga maseselang tela.',
        link: 'Alamin ang detalye'
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#69b8c4] mb-16">
                    Aming Serbisyo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-[#E6F4F8] rounded-3xl p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
                            <div className="bg-white p-4 rounded-full shadow-md mb-6 inline-flex">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                            <p className="text-gray-500 mb-6 flex-grow">{service.description}</p>
                            <a href="#" className="flex items-center text-orange-400 font-semibold hover:text-orange-600 transition-colors">
                                {service.link} <span className="ml-2">→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
