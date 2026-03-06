import React from 'react';

const NewsletterSection: React.FC = () => {
    return (
        <section className="py-24 px-4 md:px-12 bg-[#69b8c4]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-5/12 relative">
                    {/* Replace with actual image of a happy worker */}
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-md overflow-hidden border-8 border-[#59a8b4] mx-auto">
                        <img
                            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=400&h=400&fit=crop"
                            alt="Happy Worker"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="md:w-7/12 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center md:text-left">
                        Sumali Sa Aming <br /> Newsletter
                    </h2>
                    <p className="mb-8 text-blue-50 text-lg text-center md:text-left">
                        Makatanggap ng mga updates, exclusive promos, at discount codes derecho
                        sa inyong email box. Maging una sa mga balita tungkol sa amin.
                    </p>

                    <div className="flex flex-col sm:flex-row bg-white rounded-md p-1 max-w-md mx-auto md:mx-0 border border-blue-400">
                        <input
                            type="email"
                            placeholder="Ilagay ang iyong Email"
                            className="flex-grow px-6 py-3 rounded-md outline-none text-gray-700"
                        />
                        <button className="bg-[#f7a83a] text-white px-6 py-3 rounded-md font-bold hover:bg-orange-500 transition-colors mt-2 sm:mt-0">
                            Mag-Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
