// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function decodeJwt(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function useAuth(role) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenKey = role === "admin" ? "adminToken" : "studentToken";
    const token = typeof window !== "undefined" ? localStorage.getItem(tokenKey) : null;

    if (!token) {
      router.push(`/${role}/login`);
      return;
    }

    // Try to decode token to get user info (if JWT)
    const payload = decodeJwt(token);
    if (payload) {
      // typical JWT uses 'email' and maybe 'name' in payload
      setUser({
        email: payload.email || payload.sub || null,
        name: payload.name || null,
        raw: payload,
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [router, role]);

  return { loading, user };
}