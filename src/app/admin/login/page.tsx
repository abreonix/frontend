"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { Lock, Mail } from "lucide-react";


export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 🔐 Replace this with actual API call
    if (email === "admin@abreonix.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Login | Abreonix</title>
        <meta name="description" content="Login to Abreonix Admin Dashboard." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600 p-6">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Enter your credentials to access the admin panel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@abreonix.com"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Abreonix. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
