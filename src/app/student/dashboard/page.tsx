"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import StudentSidebar from "@/components/students/StudentSidebar";
import StudentProfile from "@/components/students/StudentProfile";
import CourseDetails from "@/components/students/CourseDetails";
import StudentChatbot from "@/components/students/StudentChatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User, BookOpen, MessageSquare, Home } from "lucide-react";

interface StudentData {
  _id: string;
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  dob: string;
  usermail: string;
  course: {
    _id: string;
    name: string;
    code: string;
    duration: string;
    creditsRequired?: number;
    posterUrl?: string;
  };
  credits?: number;
  enrollmentDate: string;
  createdAt: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("studentToken");
      
      if (!token) {
        router.push("/student/login");
        return;
      }

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/student-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setStudent(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch student data");
        if (err.response?.status === 401) {
          localStorage.removeItem("studentToken");
          localStorage.removeItem("studentEmail");
          router.push("/student/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentEmail");
    router.push("/student/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
  <StudentSidebar
  onSelect={setActiveTab}
  activeTab={activeTab}
  studentName={student?.name || ""}
  studentImage={student?.image || ""}
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
/>


      {/* Main Content */}
      <div className="flex-1 ml-0 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex items-center gap-3">
  {/* Mobile menu button */}
  <Button
    variant="ghost"
    size="icon"
    className="lg:hidden"
    onClick={() => setSidebarOpen(true)}
  >
    ☰
  </Button>

  <div>
    <h1 className="text-xl font-semibold text-gray-900">
      {activeTab === "dashboard" && "Student Dashboard"}
      {activeTab === "profile" && "My Profile"}
      {activeTab === "course" && "Course Details"}
      {activeTab === "chatbot" && "ONIX Chatbot"}
    </h1>
    <p className="text-sm text-gray-600">
      Welcome back, {student?.name}
    </p>
  </div>
  <div className="flex items-baseline-last space-x-3">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                  <span>{student?.course.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>Student ID: {student?._id.substring(0, 8)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
</div>
          </div>


          
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Tab Content */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome to Abreonix Cyber Security</CardTitle>
                  <CardDescription className="text-blue-100">
                    {student?.course.name} • Student Portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-100 mb-4">
                    Access your learning materials, track your progress, and get AI-powered assistance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white"
                      onClick={() => setActiveTab("chatbot")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Ask ONIX AI
                    </Button>
                  </div>
                </CardContent>
              </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="h-4 w-4 mr-2" />
                      View Complete Profile
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("course")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Course Syllabus & Details
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => setActiveTab("chatbot")}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      AI Learning Assistant
                    </Button>
                  </CardContent>
                </Card>

              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Enrollment Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {new Date(student?.enrollmentDate || student?.createdAt || "").toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {new Date(student?.enrollmentDate || student?.createdAt || "").toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Course Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{student?.course.duration}</div>
                    <p className="text-sm text-gray-600 mt-2">Full Program</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Student Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Active</div>
                    <p className="text-sm text-gray-600 mt-2">Currently enrolled</p>
                  </CardContent>
                </Card>
              </div>

            
            </div>
          )}

          {activeTab === "profile" && student && (
            <StudentProfile student={student} />
          )}

          {activeTab === "course" && student && (
            <CourseDetails />
          )}

          {activeTab === "chatbot" && (
            <StudentChatbot student={student} />
          )}
        </main>
      </div>
    </div>
  );
}