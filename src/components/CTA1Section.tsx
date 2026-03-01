
const CTA1Section: React.FC = () => {
    return (
        <section className="py-0 flex flex-col md:flex-row min-h-[400px]">
            <div className="md:w-1/2 relative bg-[#E6F4F8]">
                {/* Replace with actual image */}
                <img
                    src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop"
                    alt="Tired with Laundry"
                    className="w-full h-full object-cover"
                />
                {/* Top blue splash graphic representation */}
                <div className="absolute top-0 left-0 w-full h-16 bg-[#69b8c4]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 80% 80%, 60% 30%, 40% 100%, 20% 50%, 0 80%)' }} />
            </div>

            <div className="md:w-1/2 bg-[#E6F4F8] flex items-center justify-center p-12 lg:p-24">
                <div className="max-w-lg">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#69b8c4] mb-6 leading-tight">
                        Napapagod Ka Ba Sa <br /> Paglalaba?
                    </h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Hayaan mong kami na ang sumalo ng gawain mo. Sa Labhan, makakasiguro kang
                        malinis at mabango ang mga damit mo na parang bago. Tipid sa oras, tipid sa pagod.
                    </p>
                    <button className="bg-[#f7a83a] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-500 transition-colors transform hover:-translate-y-1">
                        Tawagan Kami Ngayon
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CTA1Section;
