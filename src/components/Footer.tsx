import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#2D2D2D] text-gray-300 py-16 px-4 md:px-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-12 mb-8">

                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-[#69b8c4] w-8 h-8 rounded text-white flex items-center justify-center font-bold text-xl">L</div>
                        <span className="font-bold text-2xl text-white">Labhan</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Ang iyong maaasahang kasama sa paglalaba. Pinapadali namin ang buhay mo
                        upang mailaan mo ang oras mo sa mga bagay na mahalaga.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Kompanya</h4>
                    <ul className="space-y-3 font-medium text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Tungkol sa Amin</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Serbisyo</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Kontakin Kami</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Iba Pang Liks</h4>
                    <ul className="space-y-3 font-medium text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Balita</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Recruitment</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold text-lg mb-6">Makipag-ugnayan</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-[#69b8c4] shrink-0" size={18} />
                            <span>123 Taft Avenue, Malate, Manila Philippines 1004</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-[#69b8c4] shrink-0" size={18} />
                            <span>+63 917 123 4567</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-[#69b8c4] shrink-0" size={18} />
                            <span>support@labhan.ph</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Labhan. All Rights Reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Facebook</a>
                    <a href="#" className="hover:text-white">Twitter</a>
                    <a href="#" className="hover:text-white">Instagram</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
