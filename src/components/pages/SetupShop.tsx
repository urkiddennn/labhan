import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useAuthStore } from '../../store/useAuthStore';
import { MapPin, Store, ArrowRight, Loader2, Map as MapIcon } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet icon not showing in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LocationPicker = ({ position, setPosition }: { position: L.LatLng | null, setPosition: (pos: L.LatLng) => void }) => {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    return position ? <Marker position={position} /> : null;
};

const SetupShop: React.FC = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const createShop = useMutation(api.shops.createShop);

    const [shopName, setShopName] = useState("");
    const [position, setPosition] = useState<L.LatLng | null>(new L.LatLng(14.5995, 120.9842)); // Default to Manila
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !position) return;

        setIsLoading(true);
        setError(null);

        try {
            await createShop({
                ownerId: user.id,
                name: shopName,
                latitude: position.lat,
                longitude: position.lng,
            });
            navigate('/owner-dashboard');
        } catch (err: any) {
            setError(err.message || "Failed to create shop. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <nav className="bg-white border-b border-slate-200 px-6 py-4">
                <span className="text-2xl font-bold text-[#69b8c4]">Labhan</span>
            </nav>

            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
                    {/* Left Side: Form */}
                    <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-slate-100">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-slate-800">Shop Setup</h1>
                            <p className="text-slate-500 text-sm mt-1 italic">Tell us about your business location.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100 italic">{error}</div>}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Shop Name</label>
                                <div className="relative group">
                                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        required
                                        value={shopName}
                                        onChange={(e) => setShopName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#69b8c4]/20 outline-none transition-all"
                                        placeholder="e.g. Fresh & Clean"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Location (Lat, Lng)</label>
                                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-600 text-xs font-mono">
                                    {position ? (
                                        <div className="flex justify-between">
                                            <span>{position.lat.toFixed(4)}, {position.lng.toFixed(4)}</span>
                                            <MapPin size={14} className="text-[#69b8c4]" />
                                        </div>
                                    ) : (
                                        "Click on the map to set location"
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !position || !shopName}
                                className="w-full bg-[#69b8c4] hover:bg-[#5aa7b3] disabled:bg-slate-200 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#69b8c4]/20 transition-all border-none"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Finish Setup
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Map */}
                    <div className="w-full md:w-2/3 h-[400px] md:h-auto bg-slate-100 relative">
                        <MapContainer
                            center={[14.5995, 120.9842]}
                            zoom={13}
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationPicker position={position} setPosition={setPosition} />
                        </MapContainer>
                        <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 pointer-events-none">
                            <MapIcon size={18} className="text-[#69b8c4]" />
                            <span className="text-xs font-bold text-slate-700">Click map to pin your shop</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SetupShop;
