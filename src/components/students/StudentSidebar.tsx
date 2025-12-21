"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  User,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

type StudentSidebarProps = {
  onSelect: (tab: string) => void;
  activeTab: string;
  studentName: string;
  studentImage: string;
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
  studentImage 
}: StudentSidebarProps) {
  const router = useRouter();
  const collapsed = false; // You can add collapse functionality if needed

  const handleClick = (tab: string) => {
    onSelect(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentEmail");
    router.push("/student/login");
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 hidden lg:flex flex-col",
        collapsed && "w-20"
      )}
    >
      {/* Logo & Student Info */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16 rounded-full border-4 border-white/20 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
            <Avatar className="w-full h-full">
              <AvatarImage src={studentImage} alt={studentName} />
              <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-blue-500 to-purple-600">
                {studentName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-lg truncate">{studentName}</h2>
            <p className="text-sm text-gray-400 mt-1">Student Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-12 px-4 hover:bg-gray-700/50 transition-colors rounded-lg",
                isActive && "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-500",
                collapsed && "justify-center px-0"
              )}
              onClick={() => handleClick(item.id)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  isActive 
                    ? "bg-gradient-to-br from-blue-500 to-purple-600" 
                    : "bg-gray-700/50"
                )}>
                  <Icon size={20} className={isActive ? "text-white" : "text-gray-400"} />
                </div>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </div>
            </Button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10",
            collapsed && "justify-center"
          )}
          onClick={handleLogout}
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
    </aside>
  );
}