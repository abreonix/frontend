"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/login`, { email, password });
      localStorage.setItem("adminToken", res.data.token); // store JWT if backend returns one
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <><nav>
      <div className="flex items-center gap-2 p-4 bg-gray-900 text-white"> 
      <div className="flex items-center gap-2 font-medium">
          <Link href="/">
                  <Image
                      src="/logo2.png"
                      alt="Abreonix Logo"
                      width={24}
                      height={24}
                      className="object-contain" />
                </Link>                
                       </div>
                       <Link href="/">
                  Abreonix Student Portal
    </Link>  
</div>
    </nav><div className="flex items-center justify-center h-screen bg-gray-50">

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Input
            type="email"
            placeholder="Email"
            className="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            className="mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div></>
  );
}
