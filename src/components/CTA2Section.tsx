

const CTA2Section: React.FC = () => {
    return (
        <section className="relative py-24 px-4 md:px-12 bg-[#69b8c4] overflow-hidden text-center">
            {/* Background patterns */}
            <div className="absolute top-10 left-10 hidden md:block">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C60 20 80 40 100 50C80 60 60 80 50 100C40 80 20 60 0 50C20 40 40 20 50 0Z" fill="white" />
                </svg>
            </div>

            <div className="absolute bottom-10 left-10 hidden md:block">
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 80 L80 20 M20 20 L80 80" stroke="#f7a83a" strokeWidth="20" strokeLinecap="round" />
                </svg>
            </div>

            <div className="absolute bottom-0 right-10 text-white opacity-30 grid grid-cols-4 gap-4">
                {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-current" />
                ))}
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Sulosyon sa Paglalaba <br /> Para sa Abalang Buhay
                </h2>
                <p className="text-blue-50 mb-10 text-lg md:text-xl font-medium max-w-3xl mx-auto">
                    Ibigay mo sa amin ang iyong oras. Mula sa pagkuha hanggang sa
                    paghatid ng iyong malinis na damit, kami ang iyong maaasahang partner.
                </p>
                <button className="bg-white text-orange-400 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors transform hover:-translate-y-1">
                    Alamin Ang Detalye
                </button>
            </div>
        </section>
    );
};

export default CTA2Section;
