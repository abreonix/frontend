"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  UserPlus,
  Calendar,
  MoreVertical,
  Download,
  Filter,
  Eye,
  Trash2,
  CreditCard,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Student {
  _id: string;
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  course: {
    _id: string;
    name: string;
    duration: string;
    creditsRequired: number;
  };
  credits: number;
  dob: string;
  createdAt: string;
}

interface Course {
  _id: string;
  name: string;
  duration: string;
  creditsRequired: number;
  posterUrl: string;
  createdAt: string;
}

interface AnalyticsData {
  totalCourses: number;
  totalStudents: number;
  recentStudents: Student[];
  recentCourses: Course[];
  studentsByCourse: { courseName: string; count: number }[];
  monthlyEnrollment: { month: string; enrollments: number }[];
  creditDistribution: { range: string; count: number }[];
}

export default function EnhancedDashboardAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      
      const [coursesRes, studentsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const courses = coursesRes.data;
      const students = studentsRes.data;

      const studentsByCourse = courses.map((course: Course) => ({
        courseName: course.name,
        count: students.filter((s: Student) => s.course?._id === course._id).length,
      }));

      const monthlyEnrollment = generateMonthlyEnrollment(students);

      const creditDistribution = [
        { range: "0-25", count: students.filter((s: Student) => s.credits <= 25).length },
        { range: "26-50", count: students.filter((s: Student) => s.credits > 25 && s.credits <= 50).length },
        { range: "51-75", count: students.filter((s: Student) => s.credits > 50 && s.credits <= 75).length },
        { range: "76-100", count: students.filter((s: Student) => s.credits > 75).length },
      ];

      setAnalytics({
        totalCourses: courses.length,
        totalStudents: students.length,
        recentStudents: students.slice(-5).reverse(),
        recentCourses: courses.slice(-5).reverse(),
        studentsByCourse,
        monthlyEnrollment,
        creditDistribution,
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const generateMonthlyEnrollment = (students: Student[]) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const enrollmentsByMonth: { [key: string]: number } = {};
    
    students.forEach(student => {
      const month = new Date(student.createdAt).getMonth();
      if (!enrollmentsByMonth[months[month]]) {
        enrollmentsByMonth[months[month]] = 0;
      }
      enrollmentsByMonth[months[month]]++;
    });

    return months.map(month => ({
      month,
      enrollments: enrollmentsByMonth[month] || 0,
    }));
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  };

  const handleViewAllStudents = () => {
    router.push("/admin/students");
  };

  const StudentDetailsView = ({ student }: { student: Student }) => (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student.image} alt={student.name} />
          <AvatarFallback className="text-lg">
            {student.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{student.name}</h3>
          <p className="text-gray-500">{student.email}</p>
          <Badge variant="outline" className="mt-2">
            {student.course?.name || "No Course"}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Father's Name</p>
            <p className="font-medium">{student.fatherName}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{student.phone}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{new Date(student.dob).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{student.address}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Enrolled On</p>
            <p className="font-medium">{new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

    function handleDeleteCourse(_id: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div className="space-y-8">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Analytics</h1>
          <p className="text-gray-500 mt-2">
            Comprehensive overview of your educational platform
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="quarter">This quarter</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalStudents}</div>
            <div className="flex items-center text-xs text-green-600 mt-2">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>
                +{
                  analytics?.recentStudents.filter(s => 
                    new Date(s.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length || 0
                } this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analytics?.totalCourses}</div>
            <p className="text-xs text-gray-500 mt-2">
              Active academic programs
            </p>
          </CardContent>
        </Card>

   
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students by Course</CardTitle>
            <CardDescription>Distribution of students across different courses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.studentsByCourse}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Number of Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

       
     

      {/* Recent Students Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Students</CardTitle>
              <CardDescription>Recently enrolled students with details</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={handleViewAllStudents}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics?.recentStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.image} alt={student.name} />
                        <AvatarFallback>
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {student.course?.name || "No Course"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(student.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" className="w-full" onClick={handleViewAllStudents}>
            <Users className="mr-2 h-4 w-4" />
            View All Students ({analytics?.totalStudents})
          </Button>
        </CardFooter>
      </Card>

       </div>

        {/* Recent Courses Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Recently added courses with details</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analytics?.recentCourses.map((course) => (
              <Card key={course._id} className="overflow-hidden">
                <div className="aspect-video relative">
                  {course.posterUrl ? (
                    <img
                      src={course.posterUrl}
                      alt={course.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <Badge variant="secondary">{course.duration}</Badge>
                  </div>
                  <div className="space-y-2">
    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Enrolled Students:</span>
                      <span className="font-semibold">
                        {analytics?.studentsByCourse.find(sc => sc.courseName === course.name)?.count || 0}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      Created: {new Date(course.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>



      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Complete information about the student
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && <StudentDetailsView student={selectedStudent} />}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              router.push(`/admin/students?edit=${selectedStudent!._id}`);
            }}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Edit Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}