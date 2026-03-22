"use client";

import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import RouteLoader from "@/components/RouteLoader";
import { usePathname } from "next/navigation";

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showInitialLoader, setShowInitialLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const pathname = usePathname();

  // --- Initial Loader (on first load only) ---
  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500);
    const removeTimer = setTimeout(() => setShowInitialLoader(false), 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  // --- Route Change Loader ---
  useEffect(() => {
    if (!showInitialLoader) {
      setRouteLoading(true);
      const timer = setTimeout(() => setRouteLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (showInitialLoader) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          backgroundColor: "#ffffff",
          transition: "opacity 0.8s ease",
          opacity: fadeOut ? 0 : 1,
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <>
      {routeLoading && <RouteLoader />}
      {children}
    </>
  );
}
