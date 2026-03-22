"use client";

import { useEffect, useState, useMemo, useCallback, memo } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Eye,
  Edit,
  Trash2,
  User,
  Phone,
  Mail,
  Home,
  Calendar,
  GraduationCap,
  UserPlus,
  MoreVertical,
  Filter,
  Download,
  Search,
  RefreshCw,
  Users,
} from "lucide-react";

interface Student {
  _id: string;
  name: string;
  fatherName: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  dob: string;
  course: {
    _id: string;
    name: string;
    duration: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Course {
  _id: string;
  name: string;
  duration: string;
  posterUrl: string;
}

// Memoized form inputs to prevent unnecessary re-renders
const MemoizedInput = memo(({ label, type = "text", value, onChange, placeholder, required = false, ...props }: any) => (
  <div className="space-y-2">
    <Label htmlFor={label}>{label}{required && " *"}</Label>
    <Input
      id={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="transition-all duration-150 focus:ring-2 focus:ring-offset-1"
      {...props}
    />
  </div>
));

MemoizedInput.displayName = "MemoizedInput";

const MemoizedTextarea = memo(({ label, value, onChange, placeholder, rows = 3 }: any) => (
  <div className="space-y-2">
    <Label htmlFor={label}>{label}</Label>
    <Textarea
      id={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="transition-all duration-150 focus:ring-2 focus:ring-offset-1"
    />
  </div>
));

MemoizedTextarea.displayName = "MemoizedTextarea";

// Memoized table row component
const StudentTableRow = memo(({ 
  student, 
  onView, 
  onEdit, 
  onDelete 
}: { 
  student: Student;
  onView: (student: Student) => void;
  onEdit: (student: Student) => void;
  onDelete: (id: string, name: string) => void;
}) => (
  <TableRow>
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
      <div className="space-y-1">
        <p className="text-sm">{student.phone}</p>
        <p className="text-xs text-gray-500 truncate max-w-[200px]">
          {student.address}
        </p>
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
          <DropdownMenuItem onClick={() => onView(student)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdit(student)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => onDelete(student._id, student.name)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
));

StudentTableRow.displayName = "StudentTableRow";

// Student Form Component
const StudentForm = memo(({ 
  mode = "add",
  formData,
  courses,
  onFieldChange,
  onImageChange,
  onCourseChange
}: { 
  mode?: "add" | "edit";
  formData: {
    name: string;
    fatherName: string;
    dob: string;
    phone: string;
    email: string;
    address: string;
    courseId: string;
    imagePreview: string;
  };
  courses: Course[];
  onFieldChange: (field: string, value: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCourseChange: (value: string) => void;
}) => {
  // Memoize event handlers
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("name", e.target.value);
  }, [onFieldChange]);

  const handleFatherNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("fatherName", e.target.value);
  }, [onFieldChange]);

  const handleDobChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("dob", e.target.value);
  }, [onFieldChange]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("phone", e.target.value);
  }, [onFieldChange]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange("email", e.target.value);
  }, [onFieldChange]);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFieldChange("address", e.target.value);
  }, [onFieldChange]);

  // Memoize course options
  const courseOptions = useMemo(() => 
    courses.map((course) => (
      <SelectItem key={course._id} value={course._id}>
        {course.name} ({course.duration})
      </SelectItem>
    )),
    [courses]
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <MemoizedInput
            label="Full Name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="John Doe"
            required
          />

          <MemoizedInput
            label="Father's Name"
            value={formData.fatherName}
            onChange={handleFatherNameChange}
            placeholder="Father's Name"
          />

          <MemoizedInput
            label="Date of Birth"
            type="date"
            value={formData.dob}
            onChange={handleDobChange}
            required
          />

          <MemoizedInput
            label="Phone Number"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="+1 234 567 8900"
          />
        </div>

        <div className="space-y-4">
          <MemoizedInput
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            placeholder="john@example.com"
          />

          <MemoizedTextarea
            label="Address"
            value={formData.address}
            onChange={handleAddressChange}
            placeholder="Full address"
          />

          <div className="space-y-2">
            <Label htmlFor="course">Course *</Label>
            <Select value={formData.courseId} onValueChange={onCourseChange}>
              <SelectTrigger className="transition-all duration-150 focus:ring-2 focus:ring-offset-1">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courseOptions}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>
            <div className="flex items-center gap-4">
              {formData.imagePreview && (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={formData.imagePreview} />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
              )}
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="flex-1 transition-all duration-150 focus:ring-2 focus:ring-offset-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

StudentForm.displayName = "StudentForm";

export default function EnhancedStudentsSection() {
  const { loading } = useAuth("admin");
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    courseId: "",
    imagePreview: "",
  });
  const [image, setImage] = useState<File | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  // Memoized fetchData with useCallback
  const fetchData = useCallback(async () => {
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading, fetchData]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Memoize filtered students with pagination
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           student.phone.includes(debouncedSearchTerm);
      const matchesCourse = selectedCourse === "all" || student.course?._id === selectedCourse;
      return matchesSearch && matchesCourse;
    });
  }, [students, debouncedSearchTerm, selectedCourse]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage]);

  // Memoize stats
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const monthlyEnrollments = students.filter(
      s => new Date(s.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length;
    
    return { totalStudents, monthlyEnrollments };
  }, [students]);

  // Optimized event handlers
  const handleAddStudent = useCallback(async () => {
    if (!formData.name || !formData.dob || !formData.courseId) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("fatherName", formData.fatherName);
      submitFormData.append("dob", formData.dob);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("email", formData.email);
      submitFormData.append("address", formData.address);
      submitFormData.append("courseId", formData.courseId);
      if (image) submitFormData.append("image", image);

      await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/add-student`, submitFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        courseId: "",
        imagePreview: "",
      });
      setImage(null);
      setIsAddDialogOpen(false);
      
      // Refresh data
      fetchData();
    } catch (err) {
      console.error("Error adding student:", err);
      alert("Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, image, token, fetchData]);

  const handleDeleteStudent = useCallback(async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return;
    
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student");
    }
  }, [token, fetchData]);

  const handleViewStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsViewDialogOpen(true);
  }, []);

  const handleEditStudent = useCallback((student: Student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      fatherName: student.fatherName,
      dob: student.dob.split('T')[0],
      phone: student.phone,
      email: student.email,
      address: student.address,
      courseId: student.course?._id || "",
      imagePreview: student.image || "",
    });
    setImage(null);
    setIsEditDialogOpen(true);
  }, []);

  const handleUpdateStudent = useCallback(async () => {
    if (!selectedStudent) return;
    
    if (!formData.name || !formData.dob || !formData.courseId) {
      alert("Please fill in all required fields (Name, DOB, and Course)");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("fatherName", formData.fatherName);
      submitFormData.append("dob", formData.dob);
      submitFormData.append("phone", formData.phone);
      submitFormData.append("email", formData.email);
      submitFormData.append("address", formData.address);
      submitFormData.append("courseId", formData.courseId);
      if (image) {
        submitFormData.append("image", image);
      }

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/students/${selectedStudent._id}`,
        submitFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset form
      setFormData({
        name: "",
        fatherName: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        courseId: "",
        imagePreview: "",
      });
      setImage(null);
      setSelectedStudent(null);
      setIsEditDialogOpen(false);
      
      alert("Student updated successfully!");
      fetchData();
    } catch (err: any) {
      console.error("Error updating student:", err);
      alert(err.response?.data?.message || "Failed to update student");
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedStudent, formData, image, token, fetchData]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleCourseChange = useCallback((value: string) => {
    setFormData(prev => ({
      ...prev,
      courseId: value
    }));
  }, []);

  const exportStudents = useCallback(() => {
    const dataStr = JSON.stringify(filteredStudents, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `students-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const link = document.createElement('a');
    link.setAttribute('href', dataUri);
    link.setAttribute('download', exportFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredStudents]);

  // Student Details View Component
  const StudentDetailsView = memo(({ student }: { student: Student }) => (
    <div className="space-y-6">
      <div className="flex items-start gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 ring-4 ring-gray-100">
            <AvatarImage 
              src={student.image} 
              alt={student.name}
              className="object-cover"
            />
            <AvatarFallback className="text-lg bg-gradient-to-br from-blue-100 to-purple-100">
              {student.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {!student.image && (
            <div className="absolute -bottom-2 -right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              No image
            </div>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{student.name}</h3>
          <p className="text-gray-500">{student.email}</p>
          <Badge variant="outline" className="mt-2">
            {student.course?.name || "No Course"}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>Father's Name</span>
            </div>
            <p className="font-medium">{student.fatherName}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Phone className="h-4 w-4" />
              <span>Phone</span>
            </div>
            <p className="font-medium">{student.phone}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </div>
            <p className="font-medium">{student.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="h-4 w-4" />
              <span>Address</span>
            </div>
            <p className="font-medium">{student.address}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Date of Birth</span>
            </div>
            <p className="font-medium">{new Date(student.dob).toLocaleDateString()}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Enrolled On</span>
            </div>
            <p className="font-medium">{new Date(student.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-semibold">Course Information</h4>
            {student.course ? (
              <div className="text-sm text-gray-500">
                {student.course.name} • {student.course.duration}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No course assigned</div>
            )}
          </div>
        </div>
      </div>
    </div>
  ));

  StudentDetailsView.displayName = "StudentDetailsView";

  // Pagination Controls Component
  const PaginationControls = memo(({ 
    totalItems, 
    currentPage, 
    onPageChange 
  }: { 
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    return (
      <div className="flex items-center justify-between px-4 py-3 border-t">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    );
  });

  PaginationControls.displayName = "PaginationControls";

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-gray-500 mt-2">
            Manage student enrollments and information
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="transition-all duration-200 hover:scale-105">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Fill in the student details below. Fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              
              <StudentForm
                mode="add"
                formData={formData}
                courses={courses}
                onFieldChange={handleFieldChange}
                onImageChange={handleImageChange}
                onCourseChange={handleCourseChange}
              />
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddStudent} disabled={isSubmitting} className="transition-all duration-200">
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : "Add Student"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalStudents}</div>
            <div className="text-xs text-green-600 mt-2">
              +{stats.monthlyEnrollments} this month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length}</div>
            <div className="text-xs text-gray-500 mt-2">
              Active courses available
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search students by name, email, or phone..."
                  className="pl-10 transition-all duration-150 focus:ring-2 focus:ring-offset-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px] transition-all duration-150 focus:ring-2 focus:ring-offset-1">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course._id} value={course._id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={fetchData} className="transition-all duration-200 hover:scale-105">
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" onClick={exportStudents} className="transition-all duration-200 hover:scale-105">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <User className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedCourse !== "all" 
                  ? "Try changing your search criteria"
                  : "Add your first student to get started"
                }
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Enrolled</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student) => (
                    <StudentTableRow
                      key={student._id}
                      student={student}
                      onView={handleViewStudent}
                      onEdit={handleEditStudent}
                      onDelete={handleDeleteStudent}
                    />
                  ))}
                </TableBody>
              </Table>
              <PaginationControls
                totalItems={filteredStudents.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
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
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)} className="transition-all duration-200">
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              handleEditStudent(selectedStudent!);
            }} className="transition-all duration-200">
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student Details</DialogTitle>
            <DialogDescription>
              Update the student information below
            </DialogDescription>
          </DialogHeader>
          
          <StudentForm
            mode="edit"
            formData={formData}
            courses={courses}
            onFieldChange={handleFieldChange}
            onImageChange={handleImageChange}
            onCourseChange={handleCourseChange}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="transition-all duration-200">
              Cancel
            </Button>
            <Button onClick={handleUpdateStudent} disabled={isSubmitting} className="transition-all duration-200">
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : "Update Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}