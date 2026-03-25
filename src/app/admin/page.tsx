"use client";
// import Image from "next/image";
// import Link from "next/link";
import { Mail, Lock, ArrowRight, Heart, Users, Globe } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const handleSubmite = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      route.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-darckLilac/30 via-white to-lilac">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          <div className="space-y-8 lg:space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                Welcome Back,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-darckLilac to-lilac">
                  The Frences Ushedo Foundation
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-md">
                Continue your journey of making a difference. Access your
                dashboard to manage donations, track impact, and connect with
                our community.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="flex justify-center mb-2">
                  <Users className="w-6 h-6 text-darckLilac/85" />
                </div>
                <div className="font-bold text-xl text-gray-800">10K+</div>
                <div className="text-xs text-gray-600">Lives Impacted</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="flex justify-center mb-2">
                  <Globe className="w-6 h-6 text-darckLilac/85" />
                </div>
                <div className="font-bold text-xl text-gray-800">15+</div>
                <div className="text-xs text-gray-600">Countries</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="flex justify-center mb-2">
                  <Heart className="w-6 h-6 text-darckLilac/85" />
                </div>
                <div className="font-bold text-xl text-gray-800">5K+</div>
                <div className="text-xs text-gray-600">Donors</div>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/30 max-w-md">
              <p className="text-gray-700 italic">
                &quot;Being part of HopeBridge has transformed how I contribute
                to causes I care about. The platform makes giving meaningful and
                transparent.&quot;
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/50">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Sign In
                </h3>
                <p className="text-gray-600">
                  Don&apos;t have an account?{" "}
                  <span className="text-darckLilac/85 hover:text-darckLilac font-medium transition-colors">
                    Only admin can add new user
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmite} className="space-y-6">
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
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-darckLilac" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-darckLilac focus:border-darckLilac bg-white/50 backdrop-blur-sm transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-darckLilac" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-darckLilac focus:border-darckLilac bg-white/50 backdrop-blur-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-darckLilac to-lilac text-white py-3 px-4 rounded-xl hover:from-darckLilac hover:to-lilac focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darckLilac transition-all font-medium flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{loading ? "Signing in..." : "Sign In"}</span>
                  {!loading && (
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
