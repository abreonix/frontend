"use client";

import { useEffect, useState, useCallback, useMemo, memo } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Shield,
  UserCog,
  Key,
  UserPlus,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Users,
  Lock,
  Mail,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2
} from "lucide-react";

interface Admin {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  usermail: string;
  phone: string;
  course: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

// Memoized Input Component
const MemoizedInput = memo(({ label, type = "text", value, onChange, placeholder, required = false, ...props }: any) => (
  <div className="space-y-2">
    <Label htmlFor={label} className="text-sm font-medium">
      {label}{required && " *"}
    </Label>
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

export default function SettingsPage() {
  const { loading, user: currentAdmin } = useAuth("admin") as { loading: boolean; user: Admin | null };
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Admin creation form
  const [adminForm, setAdminForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  // Password reset form
  const [resetForm, setResetForm] = useState({
    studentId: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  // Fetch data
  const fetchData = useCallback(async () => {
    try {
      const [adminsRes, studentsRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/admins`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/students`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setAdmins(adminsRes.data);
      setStudents(studentsRes.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading, fetchData]);

  // Filter students for search
  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.usermail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // Handle admin form changes
  const handleAdminFieldChange = useCallback((field: string, value: string) => {
    setAdminForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Handle reset form changes
  const handleResetFieldChange = useCallback((field: string, value: string) => {
    setResetForm(prev => ({ ...prev, [field]: value }));
  }, []);

  // Create new admin
  const handleCreateAdmin = useCallback(async () => {
    // Validate form
    if (!adminForm.name || !adminForm.email || !adminForm.password || !adminForm.confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (adminForm.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (adminForm.password !== adminForm.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminForm.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/create-admin`,
        {
          name: adminForm.name,
          email: adminForm.email,
          password: adminForm.password
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset form
      setAdminForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      
      // Refresh data
      fetchData();
      
      alert("Admin created successfully!");
    } catch (err: any) {
      console.error("Error creating admin:", err);
      alert(err.response?.data?.message || "Failed to create admin");
    } finally {
      setIsSubmitting(false);
    }
  }, [adminForm, token, fetchData]);

  // Reset student password
  const handleResetPassword = useCallback(async () => {
    if (!resetForm.studentId || !resetForm.newPassword || !resetForm.confirmNewPassword) {
      alert("Please select a student and enter new password");
      return;
    }

    if (resetForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (resetForm.newPassword !== resetForm.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!confirm("Are you sure you want to reset this student's password?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/reset-student-password`,
        {
          studentId: resetForm.studentId,
          newPassword: resetForm.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reset form
      setResetForm({
        studentId: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      
      alert("Student password reset successfully!");
    } catch (err: any) {
      console.error("Error resetting password:", err);
      alert(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  }, [resetForm, token]);

  // Generate random password
  const generatePassword = useCallback(() => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }, []);

  // Auto-fill generated password for admin
  const handleGenerateAdminPassword = useCallback(() => {
    const newPassword = generatePassword();
    setAdminForm(prev => ({
      ...prev,
      password: newPassword,
      confirmPassword: newPassword
    }));
  }, [generatePassword]);

  // Auto-fill generated password for student
  const handleGenerateStudentPassword = useCallback(() => {
    const newPassword = generatePassword();
    setResetForm(prev => ({
      ...prev,
      newPassword: newPassword,
      confirmNewPassword: newPassword
    }));
  }, [generatePassword]);

  // Stats
  const stats = useMemo(() => ({
    totalAdmins: admins.length + 1, // +1 for current admin
    totalStudents: students.length,
    recentAdmins: admins.filter(a => 
      new Date(a.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    ).length,
  }), [admins, students]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings & Administration</h1>
          <p className="text-gray-500 mt-2">
            Manage administrators and student accounts
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Shield className="h-4 w-4" />
          <span>Logged in as: {currentAdmin?.email || "Admin"}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Administrators</CardTitle>
            <UserCog className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalAdmins}</div>
            <div className="text-xs text-green-600 mt-2">
              +{stats.recentAdmins} this month
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalStudents}</div>
            <div className="text-xs text-gray-500 mt-2">
              Registered students
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="admins" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Admin Management
          </TabsTrigger>
          <TabsTrigger value="password-reset" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Password Reset
          </TabsTrigger>
        </TabsList>

        {/* Admin Management Tab */}
        <TabsContent value="admins" className="space-y-6">
          {/* Create Admin Card */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Create New Administrator
              </CardTitle>
              <CardDescription>
                Add a new administrator to manage the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MemoizedInput
                  label="Full Name"
                  value={adminForm.name}
                  onChange={(e: { target: { value: string; }; }) => handleAdminFieldChange("name", e.target.value)}
                  placeholder="Enter full name"
                  required
                />
                
                <MemoizedInput
                  label="Email Address"
                  type="email"
                  value={adminForm.email}
                  onChange={(e: { target: { value: string; }; }) => handleAdminFieldChange("email", e.target.value)}
                  placeholder="admin@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password" className="text-sm font-medium">
                      Password *
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleGenerateAdminPassword}
                      className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700"
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      value={adminForm.password}
                      onChange={(e) => handleAdminFieldChange("password", e.target.value)}
                      placeholder="Enter password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={adminForm.confirmPassword}
                      onChange={(e) => handleAdminFieldChange("confirmPassword", e.target.value)}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-gray-600">
                  Password must be at least 6 characters long
                </span>
              </div>

              <Button 
                onClick={handleCreateAdmin} 
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Administrator
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Admin List */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Administrator Accounts
              </CardTitle>
              <CardDescription>
                List of all system administrators (excluding current user)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {admins.length === 0 ? (
                <div className="text-center py-12">
                  <UserCog className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No other administrators</h3>
                  <p className="text-gray-500">
                    You are the only administrator. Create additional administrators above.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Administrator</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="font-medium">{admin.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{admin.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {new Date(admin.updatedAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Reset Tab */}
        <TabsContent value="password-reset" className="space-y-6">
          {/* Password Reset Form */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Reset Student Password
              </CardTitle>
              <CardDescription>
                Select a student and set a new password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Search */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search students by name or email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="student-select" className="text-sm font-medium">
                    Select Student *
                  </Label>
                  <Select value={resetForm.studentId} onValueChange={(value) => handleResetFieldChange("studentId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a student to reset password" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {filteredStudents.map((student) => (
                        <SelectItem key={student._id} value={student._id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-xs text-gray-500">{student.email}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Selected Student Info */}
              {resetForm.studentId && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Selected Student</h4>
                    <Badge variant="outline">
                      Student
                    </Badge>
                  </div>
                  {(() => {
                    const student = students.find(s => s._id === resetForm.studentId);
                    return student ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">Name: <span className="font-medium">{student.name}</span></p>
                          <p className="text-sm text-gray-600">Email: <span className="font-medium">{student.email}</span></p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">System Email: <span className="font-medium">{student.usermail}</span></p>
                          <p className="text-sm text-gray-600">Course: <span className="font-medium">{student.course?.name || "No course"}</span></p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}

              <Separator />

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-password" className="text-sm font-medium">
                      New Password *
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleGenerateStudentPassword}
                      className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700"
                    >
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={resetForm.newPassword}
                      onChange={(e) => handleResetFieldChange("newPassword", e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-new-password" className="text-sm font-medium">
                    Confirm New Password *
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-new-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={resetForm.confirmNewPassword}
                      onChange={(e) => handleResetFieldChange("confirmNewPassword", e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-gray-600">
                  Student will need to use this new password to login
                </span>
              </div>

              <Button 
                onClick={handleResetPassword} 
                disabled={isSubmitting || !resetForm.studentId}
                className="w-full md:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    Reset Password
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Password Guidelines */}
          <Card className="transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Password Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Strong Password</h4>
                      <p className="text-sm text-gray-500">At least 8 characters with mix of letters, numbers, and symbols</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Avoid Common Words</h4>
                      <p className="text-sm text-gray-500">Don't use dictionary words or personal information</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Unique Passwords</h4>
                      <p className="text-sm text-gray-500">Use different passwords for different accounts</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Regular Updates</h4>
                      <p className="text-sm text-gray-500">Consider changing passwords every 90 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}