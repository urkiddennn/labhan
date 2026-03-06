// src/components/pages/Signup.tsx
import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2, UserCircle, Store } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import TurnstileWidget from "../common/TurnstileWidget";

const SignupPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState<"customer" | "owner">("customer");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const setAuth = useAuthStore((state) => state.setAuth);
    const signupAction = useAction(api.auth_actions.signup);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!turnstileToken) {
            setError("Please complete the bot protection check.");
            setIsLoading(false);
            return;
        }

        try {
            const result = await signupAction({ email, password, name, role, turnstileToken });
            setAuth(result.user, result.token);

            // Redirect based on role
            if (result.user.role === "owner") {
                navigate("/setup-shop");
            } else {
                navigate("/customer-dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-[#69b8c4] mb-2">Create Account</h1>
                            <p className="text-gray-500">Join Labhan today</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 italic text-center">
                                    {error}
                                </div>
                            )}

                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <button
                                    type="button"
                                    onClick={() => setRole("customer")}
                                    className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${role === "customer"
                                        ? "border-[#69b8c4] bg-[#69b8c4]/5 text-[#69b8c4]"
                                        : "border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100"
                                        }`}
                                >
                                    <UserCircle size={24} className="mb-2" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Customer</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole("owner")}
                                    className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${role === "owner"
                                        ? "border-[#69b8c4] bg-[#69b8c4]/5 text-[#69b8c4]"
                                        : "border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100"
                                        }`}
                                >
                                    <Store size={24} className="mb-2" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Business</span>
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#69b8c4] transition-colors" size={20} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#69b8c4]/20 focus:border-[#69b8c4] transition-all"
                                        placeholder="Juan Dela Cruz"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#69b8c4] transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#69b8c4]/20 focus:border-[#69b8c4] transition-all"
                                        placeholder="name@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#69b8c4] transition-colors" size={20} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#69b8c4]/20 focus:border-[#69b8c4] transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                            <TurnstileWidget onVerify={setTurnstileToken} />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#69b8c4] hover:bg-[#5aa7b3] disabled:bg-[#a5d5db] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#69b8c4]/30 transform transition-all active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <>
                                        Sign Up
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account? <Link to="/login" className="font-bold text-[#69b8c4] hover:underline">Log In</Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignupPage;
