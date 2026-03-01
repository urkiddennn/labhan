import React from 'react';
import { Truck, Clock, ShieldCheck } from 'lucide-react';

const HeroSection: React.FC = () => {
    return (
        <section className="relative pt-32 pb-20 px-4 md:px-12 bg-[#F3FAFC] overflow-hidden min-h-[90vh] flex items-center">
            {/* Background decorations */}
            <div className="absolute top-20 left-10 text-[#f7a83a] opacity-50 grid grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                ))}
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full z-0 translate-x-10 pointer-events-none">
                <div className="w-full h-full bg-[#69b8c4] opacity-20" style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%, 15% 50%)', borderRadius: '40px' }} />
            </div>

            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center relative z-1">
                <div className="md:w-1/2 mt-10 md:mt-0 pt-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-[#69b8c4] leading-tight mb-6">
                        KAMI NA ANG <br /> BAHALA SA <br /> LABADA MO
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-md text-lg">
                        Magpahinga ka na, kami na ang maglalaba para sa iyo. Mabilis, malinis, at maaasahan.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-[#f7a83a] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-orange-200 hover:bg-orange-500 transition-colors transform hover:-translate-y-1">
                            Add Your Shop
                        </button>
                        <button className="bg-[#59E4E4] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-cyan-200 hover:bg-cyan-400 transition-colors transform hover:-translate-y-1">
                            Be a Customer
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0">
                    {/* Replace this div with an actual image of a laundry worker */}
                    <div className="w-full h-[500px] max-w-md relative bg-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?q=80&w=800&auto=format&fit=crop" alt="Laundry Service" className="w-full h-full object-cover object-center" />
                    </div>

                    {/* Floating Feature Cards */}
                    <div className="absolute top-10 -left-10 bg-white rounded-xl p-4 shadow-xl flex items-center gap-4 w-64 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="bg-orange-100 text-[#f7a83a] p-3 rounded-full">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Libreng Delivery</h4>
                            <p className="text-xs text-gray-500">Kukunin namin sa bahay mo</p>
                        </div>
                    </div>

                    <div className="absolute top-1/2 -right-4 bg-white rounded-xl p-4 shadow-xl flex items-center gap-4 w-60 transform -translate-y-1/2 delay-100 hidden md:flex">
                        <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Bukas 24 Oras</h4>
                            <p className="text-xs text-gray-500">Laging handang maglingkod</p>
                        </div>
                    </div>

                    <div className="absolute bottom-10 -left-6 bg-white rounded-xl p-4 shadow-xl flex items-center gap-4 w-64">
                        <div className="bg-orange-100 text-orange-500 p-3 rounded-full">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">Garantisadong Ligtas</h4>
                            <p className="text-xs text-gray-500">Iingatan ang iyong mga damit</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
