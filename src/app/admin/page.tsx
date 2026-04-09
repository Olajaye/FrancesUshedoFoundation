"use client";

import { Mail, Lock, ArrowRight, Heart, Users, Globe } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password }).unwrap();

      dispatch(setCredentials({ name: data.name, email }));
      router.refresh();
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data: { error: string } }).data?.error
          : "Something went wrong. Please try again.";
      setError(message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-darckLilac/30 via-white to-lilac">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left panel */}
          <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Welcome Back,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-darckLilac to-lilac">
                  The Frances Ushedo Foundation
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-md">
                Access your dashboard to manage donations, track impact, and
                connect with our community.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Users, value: "10K+", label: "Lives Impacted" },
                { icon: Globe, value: "15+", label: "Countries" },
                { icon: Heart, value: "5K+", label: "Donors" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6 text-darckLilac/85" />
                  </div>
                  <div className="font-bold text-xl text-gray-800">{value}</div>
                  <div className="text-xs text-gray-600">{label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-md">
              <p className="text-gray-700 italic">
                &quot;Being part of TFUF has transformed how I contribute to
                causes I care about. The platform makes giving meaningful and
                transparent.&quot;
              </p>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Sign In
                </h3>
                <p className="text-gray-600 text-sm">
                  Only admins can access this area.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-darckLilac pointer-events-none" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-darckLilac focus:border-darckLilac bg-white/50 backdrop-blur-sm transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-darckLilac pointer-events-none" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-darckLilac focus:border-darckLilac bg-white/50 backdrop-blur-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-darckLilac to-lilac text-white py-3 px-4 rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darckLilac transition-all font-medium flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? "Signing in…" : "Sign In"}</span>
                  {!isLoading && (
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
