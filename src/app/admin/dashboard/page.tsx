"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import CoursesSection from "@/components/admin/CoursesSection";
import StudentsSection from "@/components/admin/StudentsSection";
import DashboardAnalytics from "@/components/admin/DashboardAnalytics";
import Settings from "@/components/admin/Settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex">
   

      <Sidebar onSelect={setActiveTab} />


      <div className="flex-1 p-8 ml-64">
        {activeTab === "dashboard" && <DashboardAnalytics />}
        {activeTab === "courses" && <CoursesSection />}
        {activeTab === "students" && <StudentsSection />}
        {activeTab === "settings" && <Settings />}
      </div>
    </div>
  );
}
