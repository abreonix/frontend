"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

type SidebarProps = {
  onSelect: (tab: string) => void;
};

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ onSelect }: SidebarProps) {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleClick = (tab: string) => {
    setActive(tab);
    onSelect(tab);
  };

  const handleLogout = () => {
    // Remove admin authentication data
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // Redirect to admin login
    router.push("/admin/login");
  };

  return (
    <section className="fixed z-50">
      <div
        className={cn(
          "h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col relative",
          collapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center w-full"
            )}
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center overflow-hidden">
              <Image
                src="/logo2.png"
                alt="Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight">
                  Abreonix
                </span>
                <span className="text-xs text-gray-400">Education</span>
              </div>
            )}
          </div>

          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-12 px-4 hover:bg-gray-700/50 transition-colors rounded-lg",
                  isActive &&
                    "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-500",
                  collapsed && "justify-center px-0"
                )}
                onClick={() => handleClick(item.id)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      isActive
                        ? "bg-gradient-to-br from-blue-500 to-purple-600"
                        : "bg-gray-700/50"
                    )}
                  >
                    <Icon
                      size={20}
                      className={
                        isActive ? "text-white" : "text-gray-400"
                      }
                    />
                  </div>
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10",
              collapsed && "justify-center"
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -left-4 w-8 h-8 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 -right-4 w-12 h-12 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
}
