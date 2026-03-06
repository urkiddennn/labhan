import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  LogOut,
  Plus,
  Send,
  CheckCircle,
  WashingMachine,
  Edit2,
  Save,
  X,
  Trash2,
  Loader2,
  User,
  MapPin,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
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

const LocationMarker = ({
  position,
  setPosition,
}: {
  position: [number, number];
  setPosition: (p: [number, number]) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const OwnerDashboard: React.FC = () => {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const shops = useQuery(api.shops.getShopsByOwner, {
    token: token || "",
  });
  const shop = shops && shops.length > 0 ? shops[0] : null;

  const services = useQuery(
    api.services.listServices,
    shop ? { shopId: shop._id } : "skip",
  );
  const orders = useQuery(
    api.orders.listActiveOrders,
    shop ? { shopId: shop._id } : "skip",
  );

  const addService = useMutation(api.services.addService);
  const updateService = useMutation(api.services.updateService);
  const deleteService = useMutation(api.services.deleteService);
  const updateOrderStatus = useMutation(api.orders.updateStatus);
  const updateShopInfo = useMutation(api.shops.updateShop);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const [mapPos, setMapPos] = useState<[number, number] | null>(null);
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  useEffect(() => {
    if (shop && !mapPos) {
      setMapPos([shop.latitude, shop.longitude]);
    }
  }, [shop, mapPos]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Handle save Location
  const handleSaveLocation = async () => {
    if (!shop || !mapPos) return;
    try {
      setIsUpdatingLocation(true);
      await updateShopInfo({
        token: token || "",
        shopId: shop._id,
        latitude: mapPos[0],
        longitude: mapPos[1],
      });
      alert("Shop location updated successfully!");
    } catch (err) {
      alert("Failed to update location.");
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  // Handle edit
  const handleEdit = (service: any) => {
    setEditingId(service._id);
    setEditPrice(service.price.toString());
  };

  // handle save
  const handleSave = async (serviceId: any) => {
    try {
      await updateService({ token: token || "", serviceId, price: Number(editPrice) });
      setEditingId(null);
    } catch (err) {
      alert("Failed to update price");
    }
  };

  const handleAdd = async () => {
    if (!shop) return;
    try {
      await addService({
        token: token || "",
        shopId: shop._id,
        name: newName,
        price: Number(newPrice),
      });
      setIsAdding(false);
      setNewName("");
      setNewPrice("");
    } catch (err) {
      alert("Failed to add service");
    }
  };

  const handleDelete = async (serviceId: any) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService({ token: token || "", serviceId });
    }
  };

  const handleUpdateStatus = async (orderId: any, status: string) => {
    try {
      await updateOrderStatus({ token: token || "", orderId, status });
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-[#1e293b] text-white px-6 py-4 flex  items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <WashingMachine className="text-[#69b8c4]" />
          <span className="text-xl font-bold">Labhan Biz</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      <main className="max-w-8xl mx-auto p-6 space-y-10 md:flex justify-center items-start block gap-2">
        {!shop ? (
          <div className="text-center py-20 bg-white rounded-md border border-dashed border-slate-300">
            <h2 className="text-2xl font-bold text-slate-400 italic">
              No shop associated with your account.
            </h2>
            <p className="text-slate-400 mt-2">
              Please contact support or set up your shop profile.
            </p>
          </div>
        ) : (
          <>
            <section className="bg-white p-8 rounded-md border border-slate-200 space-y-6 md:w-3/5 w-full">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="text-[#69b8c4]" size={24} />
                Shop Location Settings
              </h2>
              <p className="text-sm text-slate-500 italic">
                Click on the map to set your laundry shop's new location.
              </p>

              <div className="w-full h-[400px] md:h-[600px] rounded-md border border-slate-200 overflow-hidden relative z-0">
                {mapPos && (
                  <MapContainer
                    center={mapPos}
                    zoom={15}
                    className="w-full h-full"
                  >
                    <TileLayer
                      attribution="Google Maps"
                      url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                    />
                    <LocationMarker position={mapPos} setPosition={setMapPos} />
                  </MapContainer>
                )}
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-mono text-slate-400">
                  {mapPos
                    ? `${mapPos[0].toFixed(6)}, ${mapPos[1].toFixed(6)}`
                    : "Loading..."}
                </div>
                <button
                  onClick={handleSaveLocation}
                  disabled={isUpdatingLocation}
                  className="bg-[#69b8c4] text-white px-6 py-2.5 rounded-md text-sm font-bold border border-[#69b8c4] hover:scale-105 transition-all disabled:opacity-50"
                >
                  {isUpdatingLocation ? "Updating..." : "Save New Location"}
                </button>
              </div>
            </section>
            <div className="flex flex-col gap-2 md:w-1/3 w-full">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 italic">
                    Manage Orders - {shop.name}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {orders === undefined ? (
                    <div className="flex justify-center p-8">
                      <Loader2 className="animate-spin text-[#69b8c4]" />
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="bg-white p-8 rounded-md border border-slate-200 text-center">
                      <p className="text-slate-400 font-medium italic">
                        No active orders at the moment. Update your prices below
                        to attract more customers!
                      </p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order._id}
                        className="bg-white p-6 rounded-md border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-slate-100 p-3 rounded-md text-[#69b8c4]">
                            <User size={24} />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-bold text-lg text-slate-800">
                              Order ID: {order._id.slice(-6)}
                            </h3>
                            <p className="text-slate-500 text-sm italic">
                              Status:{" "}
                              <span className="font-bold text-[#69b8c4] uppercase">
                                {order.status}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateStatus(order._id, e.target.value)
                            }
                            className="bg-slate-50 border border-slate-200 rounded-md px-4 py-2 text-sm font-semibold focus:ring-2 focus:ring-[#69b8c4]/20 outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="washing">Washing</option>
                            <option value="drying">Drying</option>
                            <option value="ready">Ready</option>
                            <option value="collected">Collected</option>
                          </select>

                          <button
                            onClick={() =>
                              handleUpdateStatus(order._id, "ready")
                            }
                            className="flex items-center gap-2 bg-[#69b8c4] text-white px-4 py-2 rounded-md text-sm font-bold hover:scale-105 transition-all border border-[#69b8c4]"
                          >
                            <Send size={16} />
                            Mark as Ready
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>

              <section className="bg-white p-8 rounded-md border border-slate-200 transition-all">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle className="text-[#69b8c4]" size={24} />
                    Manage Laundry Prices
                  </h2>
                  <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#69b8c4] text-white px-5 py-2.5 rounded-md text-sm font-bold border border-[#69b8c4] hover:scale-105 active:scale-95 transition-all"
                  >
                    {isAdding ? <X size={18} /> : <Plus size={18} />}
                    {isAdding ? "Cancel" : "Add Service"}
                  </button>
                </div>

                {isAdding && (
                  <div className="mb-8 p-6 bg-slate-50 rounded-md border border-[#69b8c4]/30 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Service Name (e.g. Wash & Fold)"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#69b8c4]/20 outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Price (₱)"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-md px-4 py-3 text-sm focus:ring-2 focus:ring-[#69b8c4]/20 outline-none"
                      />
                    </div>
                    <button
                      onClick={handleAdd}
                      className="w-full bg-[#69b8c4] text-white py-3 rounded-md font-bold hover:bg-[#5aa7b3] transition-all border border-[#69b8c4]"
                    >
                      Save New Service
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {services?.map((service) => (
                    <div
                      key={service._id}
                      className="group flex items-center justify-between p-5 bg-slate-50 hover:bg-white rounded-md border border-slate-100 hover:border-[#69b8c4]/30 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-slate-700 italic">
                          {service.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {editingId === service._id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 font-bold">
                                ₱
                              </span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1 text-sm font-bold text-[#69b8c4]"
                              />
                            </div>
                          ) : (
                            <span className="text-[#69b8c4] font-black text-lg italic">
                              ₱{service.price}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {editingId === service._id ? (
                          <>
                            <button
                              onClick={() => handleSave(service._id)}
                              className="p-2 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition-colors border border-emerald-100"
                            >
                              <Save size={20} />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-2 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 transition-colors border border-slate-200"
                            >
                              <X size={20} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(service)}
                              className="p-2 bg-white text-slate-400 rounded-md hover:text-[#69b8c4] hover:bg-slate-50 transition-all border border-slate-100"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(service._id)}
                              className="p-2 bg-white text-slate-400 rounded-md hover:text-red-500 hover:bg-red-50 transition-all border border-slate-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {services === undefined ? (
                    <div className="flex justify-center p-4">
                      <Loader2 className="animate-spin text-[#69b8c4]" />
                    </div>
                  ) : services.length === 0 && !isAdding ? (
                    <div className="text-center py-6 text-slate-400 italic">
                      No services added yet. Add your first service to get
                      started!
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default OwnerDashboard;
