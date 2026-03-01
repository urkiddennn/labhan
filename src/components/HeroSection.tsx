import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <section className="relative pt-32 pb-20 px-4 md:px-12 bg-[#F3FAFC] overflow-hidden min-h-[85vh] flex items-center">
            <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center relative z-1">
                <div className="md:w-1/2 mt-10 md:mt-0 pt-10 text-center md:text-left">
                    <h1 className="text-6xl md:text-8xl font-black text-[#69b8c4] leading-none mb-6 italic uppercase tracking-tighter">
                        Labada Mo, <br /> Sagot Namin.
                    </h1>
                    <p className="text-slate-500 mb-10 max-w-sm mx-auto md:mx-0 text-xl font-black italic uppercase tracking-tight">
                        Find active laundry shops near you. Fast, clean, and hassle-free.
                    </p>

                    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                        <button onClick={handleLogin} className="bg-[#f7a83a] text-white px-10 py-5 rounded-3xl font-black italic uppercase tracking-widest hover:bg-orange-500 transition-all border-2 border-orange-300 hover:-translate-y-1 active:scale-95">
                            Register Shop
                        </button>
                        <button onClick={handleLogin} className="bg-[#69b8c4] text-white px-10 py-5 rounded-3xl font-black italic uppercase tracking-widest hover:bg-[#5aa7b3] transition-all border-2 border-cyan-400 hover:-translate-y-1 active:scale-95">
                            Find a Shop
                        </button>
                    </div>
                </div>

                <div className="md:w-1/2 relative flex justify-center mt-8 md:mt-0">
                    <div className="w-full h-[500px] max-w-md relative bg-white p-2 rounded-[4rem] border-4 border-slate-100 -rotate-3 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop"
                            alt="Laundry Setup"
                            className="w-full h-full object-cover rounded-[3.5rem]"
                        />

                        {/* Status Bubbles - Simplified, no shadows */}
                        <div className="absolute top-12 -right-4 bg-[#f7a83a] text-white p-4 rounded-3xl flex items-center gap-3 border-4 border-white animate-bounce" style={{ animationDuration: '4s' }}>
                            <MapPin size={24} />
                            <div className="hidden sm:block">
                                <h4 className="font-black text-xs uppercase tracking-tighter italic leading-none">Shops</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Active</p>
                            </div>
                        </div>

                        <div className="absolute bottom-12 -left-4 bg-[#69b8c4] text-white p-4 rounded-3xl flex items-center gap-3 border-4 border-white">
                            <Clock size={24} />
                            <div className="hidden sm:block">
                                <h4 className="font-black text-xs uppercase tracking-tighter italic leading-none">Status</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Real-time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
