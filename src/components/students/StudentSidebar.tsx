"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  User,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type StudentSidebarProps = {
  onSelect: (tab: string) => void;
  activeTab: string;
  studentName: string;
  studentImage: string;
  isOpen?: boolean;      // ✅ for mobile
  onClose?: () => void;  // ✅ for mobile
};

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "My Profile", icon: User },
  { id: "course", label: "Course Details", icon: BookOpen },
  { id: "chatbot", label: "ONIX Chatbot", icon: MessageSquare },
];

export default function StudentSidebar({
  onSelect,
  activeTab,
  studentName,
  studentImage,
  isOpen = false,
  onClose,
}: StudentSidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentEmail");
    router.push("/student/login");
  };

  const SidebarContent = (
    <>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-16 h-16 border-4 border-white/20">
            <AvatarImage src={studentImage} />
            <AvatarFallback>
              {studentName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="font-bold text-lg truncate">{studentName}</h2>
            <p className="text-sm text-gray-400">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <Button
              key={id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-12 px-4 rounded-lg",
                isActive &&
                  "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-500"
              )}
              onClick={() => {
                onSelect(id);
                onClose?.(); // close on mobile
              }}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* ✅ Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-40 flex-col">
        {SidebarContent}
      </aside>

      {/* ✅ Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ✅ Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform transition-transform lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        {SidebarContent}
      </aside>
    </>
  );
}
