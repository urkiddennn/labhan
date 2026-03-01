import React, { useState } from "react";
import { Mail, Lock, Chrome, Facebook, ArrowRight, Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const setAuth = useAuthStore((state) => state.setAuth);
    const loginAction = useAction(api.auth_actions.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const result = await loginAction({ email, password });
            setAuth(result.user, result.token);

            // Redirect based on role
            if (result.user.role === "owner") {
                navigate("/owner-dashboard");
            } else if (result.user.role === "admin") {
                navigate("/admin-dashboard"); // Assuming you'll add this
            } else {
                navigate("/customer-dashboard");
            }
        } catch (err: any) {
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
            <main className="flex-grow flex items-center justify-center relative py-20 px-4 overflow-hidden">
                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white rounded-3xl  border border-gray-200 overflow-hidden transform transition-all hover:scale-[1.01]">
                        <div className="p-8 md:p-10">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl font-bold text-[#69b8c4] mb-2">Welcome Back</h1>
                                <p className="text-gray-500">Sign in to continue to Labhan</p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#69b8c4] transition-colors" size={20} />
                                        <input
                                            type="email"
                                            placeholder="name@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#69b8c4]/20 focus:border-[#69b8c4] transition-all disabled:opacity-50"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-sm font-semibold text-gray-700">Password</label>
                                        <a href="#" className="text-xs font-semibold text-[#69b8c4] hover:underline">Forgot?</a>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#69b8c4] transition-colors" size={20} />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#69b8c4]/20 focus:border-[#69b8c4] transition-all disabled:opacity-50"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-1">
                                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-[#69b8c4] focus:ring-[#69b8c4]" />
                                    <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">Remember me</label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#69b8c4] hover:bg-[#5aa7b3] disabled:bg-[#a5d5db] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#69b8c4]/30 transform transition-all active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <Loader2 size={20} className="animate-spin" />
                                    ) : (
                                        <>
                                            Sign In
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-gray-400 font-medium">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors font-semibold text-sm">
                                    <Chrome size={18} className="text-[#DB4437]" />
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors font-semibold text-sm">
                                    <Facebook size={18} className="text-[#4267B2]" />
                                    Facebook
                                </button>
                            </div>

                            <p className="mt-8 text-center text-sm text-gray-600">
                                Don't have an account?
                                <a href="#" onClick={() => navigate("/signup")} className="ml-1 font-bold text-[#f7a83a] hover:underline">Create account</a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>


        </div>
    );
};

export default LoginPage;