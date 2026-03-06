import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Loader2 } from "lucide-react";

const { BaseLayer } = LayersControl;
// Fix for Leaflet default icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Setelite tiles
// const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// const osmAttr =
//   '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ShopMap: React.FC = () => {
  const shops = useQuery(api.shops.listAll);

  // lat & long Cooridinate
  const center: [number, number] = [7.190708, 125.455341];

  return (
    <section className="py-24 px-4 md:px-12 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black text-slate-800 italic uppercase tracking-tighter mb-4 leading-tight">
            Active <span className="text-[#69b8c4]">Shops</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 font-black uppercase tracking-tight text-lg italic">
            Real-time map of laundry shops. Clear, simple, and direct.
          </p>
        </div>

        <div className="w-full h-[600px] rounded-[3rem] border-8 border-slate-50 overflow-hidden relative group transition-all duration-700 ">
          {shops === undefined ? (
            <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#69b8c4]" size={48} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                  Syncing active shops
                </p>
              </div>
            </div>
          ) : (
            <MapContainer
              center={center}
              zoom={13}
              className="w-full h-full z-0"
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution="Google Maps"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
              />
              {shops.map((shop) => (
                <Marker
                  key={shop._id}
                  position={[shop.latitude, shop.longitude]}
                >
                  <Popup>
                    <div className="p-3 text-center bg-white rounded-2xl">
                      <h3 className="font-black italic uppercase tracking-tighter text-slate-800 text-lg mb-1 leading-none">
                        {shop.name}
                      </h3>
                      <p className="text-[#69b8c4] font-black text-[10px] uppercase tracking-widest italic mb-3">
                        Live Now
                      </p>
                      <button className="bg-[#69b8c4] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#5aa7b3] transition-all w-full border-2 border-cyan-400 active:scale-95">
                        Select Shop
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShopMap;
