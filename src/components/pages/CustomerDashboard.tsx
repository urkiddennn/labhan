import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  LogOut,
  Package,
  Search,
  MapPin,
  Clock,
  Loader2,
  Plus,
  X,
  Check,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

const CustomerDashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const [selectedShop, setSelectedShop] = useState<any>(null);

  const shops = useQuery(api.shops.listAll);
  const myOrders = useQuery(api.orders.listUserOrders, {
    userId: (user?.id as any) || "",
  });
  const availableServices = useQuery(
    api.services.listServices,
    selectedShop ? { shopId: selectedShop._id } : "skip",
  );

  const bookLaundry = useMutation(api.orders.createOrder);

  const center: [number, number] = [14.5995, 120.9842];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSelectShop = (shop: any) => {
    setSelectedShop(shop);
  };

  const handleConfirmBooking = async (service: any) => {
    if (!user || !selectedShop) return;
    try {
      await bookLaundry({
        shopId: selectedShop._id,
        userId: user.id as any,
        serviceName: service.name,
        totalAmount: service.price,
      });
      alert(`Successfully booked ${service.name} at ${selectedShop.name}!`);
      setSelectedShop(null);
    } catch (err) {
      alert("Failed to book laundry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <span className="text-2xl font-bold text-[#69b8c4]">Labhan</span>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-600 hidden sm:block">
            Hi, {user?.name || user?.email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Package className="text-[#69b8c4]" size={24} />
            My Laundry Progress
          </h2>
          <div className="space-y-4">
            {myOrders === undefined ? (
              <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-[#69b8c4]" />
              </div>
            ) : myOrders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 italic">
                No active orders. Book one below!
              </div>
            ) : (
              myOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-slate-800">
                      {order.shopName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs font-bold text-[#69b8c4] uppercase tracking-tighter bg-[#69b8c4]/10 px-2 py-0.5 rounded-md">
                        {order.serviceName}
                      </p>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Clock size={14} /> {order.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === "Ready" || order.status === "collected"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MapPin className="text-[#69b8c4]" size={24} />
            Active Shops Map
          </h2>
          <div className="w-full h-[400px] rounded-3xl border border-slate-200 overflow-hidden relative">
            {shops === undefined ? (
              <div className="absolute inset-0 z-50 bg-slate-50/80 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#69b8c4]" size={32} />
              </div>
            ) : (
              <MapContainer
                center={center}
                zoom={13}
                className="w-full h-full z-0"
                scrollWheelZoom={false}
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
                      <div className="p-2 text-center">
                        <h3 className="font-bold text-slate-800 text-sm mb-1">
                          {shop.name}
                        </h3>
                        <button
                          onClick={() => handleSelectShop(shop)}
                          className="bg-[#69b8c4] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase w-full mt-2"
                        >
                          Select Shop
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Search className="text-[#69b8c4]" size={24} />
            All Registered Shops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {shops === undefined ? (
              <div className="col-span-full flex justify-center p-8">
                <Loader2 className="animate-spin text-[#69b8c4]" />
              </div>
            ) : shops.length === 0 ? (
              <div className="col-span-full text-center text-slate-400 py-10 italic">
                No shops found in your area yet.
              </div>
            ) : (
              shops.map((shop) => (
                <div
                  key={shop._id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#69b8c4] transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 group-hover:text-[#69b8c4] transition-colors">
                        {shop.name}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={14} /> {shop.latitude.toFixed(4)},{" "}
                        {shop.longitude.toFixed(4)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSelectShop(shop)}
                      className="bg-[#69b8c4] text-white px-5 py-2 rounded-xl text-sm font-bold border border-[#69b8c4] hover:scale-105 active:scale-95 transition-all flex items-center gap-1"
                    >
                      <Plus size={16} /> Book
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Service Selection Modal */}
      {selectedShop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-black text-slate-800 italic uppercase tracking-tight">
                  Select Service
                </h3>
                <p className="text-[#69b8c4] font-bold text-sm italic">
                  {selectedShop?.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedShop(null)}
                className="p-2 bg-white text-slate-400 hover:text-red-500 rounded-full transition-colors border border-slate-100"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
              {availableServices === undefined ? (
                <div className="flex justify-center p-20">
                  <Loader2 className="animate-spin text-[#69b8c4]" size={32} />
                </div>
              ) : availableServices.length === 0 ? (
                <div className="text-center py-10 text-slate-400 italic font-medium">
                  No services currently available at this shop.
                </div>
              ) : (
                availableServices.map((service) => (
                  <button
                    key={service._id}
                    onClick={() => handleConfirmBooking(service)}
                    className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-white border-2 border-transparent hover:border-[#69b8c4]/40 rounded-3xl transition-all group text-left"
                  >
                    <div>
                      <h4 className="font-black text-slate-800 group-hover:text-[#69b8c4] transition-colors italic uppercase">
                        {service.name}
                      </h4>
                      <p className="text-[#69b8c4] text-xl font-black italic">
                        ₱{service.price}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl text-slate-300 group-hover:text-[#69b8c4] group-hover:scale-110 transition-all border border-slate-50">
                      <Check size={24} />
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="p-8 bg-slate-50/50 text-center">
              <p className="text-xs text-slate-400 font-bold italic uppercase tracking-widest">
                Select a service to finalize your order
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
