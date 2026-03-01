import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '#' },
        { name: 'Services', path: '#' },
    ];

    const handleLogin = () => {
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <header className="absolute top-0 left-0 w-full z-[100] py-6 px-4 md:px-12 flex justify-between items-center bg-transparent">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/')}>
                <div className="bg-[#69b8c4] w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[#69b8c4]/20 group-hover:scale-110 transition-transform">L</div>
                <span className="font-black text-3xl text-[#69b8c4] italic tracking-tighter uppercase">Labhan</span>
            </div>

            <nav className="hidden md:flex gap-10 items-center text-slate-500 font-black uppercase tracking-widest text-xs italic">
                {navLinks.map((link) => (
                    <a key={link.name} href={link.path} className="hover:text-[#69b8c4] transition-all hover:tracking-[0.2em]">{link.name}</a>
                ))}
                <button
                    onClick={handleLogin}
                    className="bg-[#f7a83a] text-white px-8 py-3 rounded-full font-black uppercase tracking-wide hover:bg-orange-500 transition-all border border-orange-300 hover:-translate-y-1 shadow-lg shadow-orange-200"
                >
                    Login / Signup
                </button>
            </nav>

            <button
                className="md:hidden text-[#69b8c4] z-[110] bg-white p-2 rounded-xl shadow-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {isMenuOpen && (
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[105] flex flex-col items-center justify-center gap-10 animate-in fade-in zoom-in-95 duration-300 md:hidden">
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#69b8c4]/20 rounded-full blur-3xl" />
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className="text-4xl font-black text-white italic uppercase tracking-tighter hover:text-[#69b8c4] transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={handleLogin}
                        className="bg-[#f7a83a] text-white px-12 py-5 rounded-full font-black text-2xl italic uppercase tracking-widest border-2 border-orange-300 shadow-2xl shadow-orange-500/20 active:scale-95 transition-all"
                    >
                        Get Started
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="mt-10 text-slate-400 font-bold uppercase tracking-widest text-xs border border-slate-700 px-6 py-2 rounded-full"
                    >
                        Close Menu
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
