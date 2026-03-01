import React from 'react';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="absolute top-0 left-0 w-full z-10 py-6 px-4 md:px-12 flex justify-between items-center bg-transparent">
            <div className="flex items-center gap-2">
                <div className="bg-[#69b8c4] w-8 h-8 rounded text-white flex items-center justify-center font-bold text-xl">L</div>
                <span className="font-bold text-2xl text-[#69b8c4]">Labhan</span>
            </div>

            <nav className="hidden md:flex gap-8 items-center text-gray-500 font-medium">
                <a href="#" className="hover:text-[#69b8c4] transition-colors">Home</a>
                <a href="#" className="hover:text-[#69b8c4] transition-colors">About</a>
                <div className="relative group cursor-pointer flex items-center gap-1">
                    <span>Pages</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                <button className="border-2 border-[#f7a83a] text-[#69b8c4] px-6 py-2 rounded-full font-semibold hover:bg-[#f7a83a] hover:text-white transition-colors">
                    Contact
                </button>
            </nav>

            <button className="md:hidden text-[#69b8c4]">
                <Menu size={28} />
            </button>
        </header>
    );
};

export default Header;
