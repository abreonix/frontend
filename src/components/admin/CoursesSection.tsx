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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  PlusCircle, 
  Trash2, 
  Edit, 
  BookOpen, 
  Clock, 
  Image as ImageIcon,
  Upload,
  AlertCircle,
  Download,
  Search,
  Filter
} from "lucide-react";

interface Course {
  _id: string;
  name: string;
  courseCode: string;
  duration: string;
  posterUrl: string;
  creditsRequired?: number;
  createdAt: string;
  updatedAt: string;
}


// Memoized Course Card Component
const CourseCard = memo(({ 
  course, 
  onDelete 
}: { 
  course: Course; 
  onDelete: (id: string, name: string) => void;
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group">
        <div className="relative h-48 overflow-hidden">
          {course.posterUrl ? (
            <img
              src={course.posterUrl}
              alt={course.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-gray-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 hover:bg-white">
            {course.duration}
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1 line-clamp-1">{course.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Created {new Date(course.createdAt).toLocaleDateString()}
            </span>
            <span className="text-gray-400">
              {course.creditsRequired ? `${course.creditsRequired} credits` : 'No credits'}
            </span>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Course</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{course.name}</strong>? 
              This action cannot be undone and will remove the course from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(course._id, course.name)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

CourseCard.displayName = "CourseCard";

// Memoized Form Input
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

export default function CoursesSection() {
  const { loading } = useAuth("admin");
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<{ id: string; name: string } | null>(null);
  
  // Form states
 const [formData, setFormData] = useState({
  name: "",
  courseCode: "",
  duration: "",
  creditsRequired: "",
});

  const [poster, setPoster] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string>("");

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : "";

  // Memoized fetchData
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/courses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (!loading) fetchData();
  }, [loading, fetchData]);

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!searchTerm) return courses;
    return courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.duration.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  // Handle form field changes
  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePosterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPoster(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAddCourse = useCallback(async () => {
    if (!formData.name || !formData.duration || !poster) {
      alert("Please fill in all required fields: Name, Duration, and Poster");
      return;
    }

    setIsSubmitting(true);
    try {
      const submitFormData = new FormData();
      submitFormData.append("name", formData.name);
      submitFormData.append("duration", formData.duration);
      if (formData.creditsRequired) {
        submitFormData.append("creditsRequired", formData.creditsRequired);
      }
      submitFormData.append("poster", poster);
      submitFormData.append("courseCode", formData.courseCode);


      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/create-course`,
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
        duration: "",
        creditsRequired: "",
        courseCode: "",
      });
      setPoster(null);
      setPosterPreview("");
      setIsAddDialogOpen(false);
      
      // Refresh data
      fetchData();
      alert("Course added successfully!");
    } catch (err: any) {
      console.error("Error adding course:", err);
      alert(err.response?.data?.message || "Failed to add course");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, poster, token, fetchData]);

  const handleDeleteCourse = useCallback(async (id: string, name: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/courses/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchData();
      setCourseToDelete(null);
    } catch (err: any) {
      console.error("Error deleting course:", err);
      alert(err.response?.data?.message || "Failed to delete course");
    }
  }, [token, fetchData]);

  const openDeleteDialog = useCallback((id: string, name: string) => {
    setCourseToDelete({ id, name });
    setShowDeleteDialog(true);
  }, []);

  // Calculate stats
  const stats = useMemo(() => ({
    totalCourses: courses.length,
    hasPoster: courses.filter(c => c.posterUrl).length,
    recentCourses: courses.filter(c => 
      new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length,
  }), [courses]);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-gray-500 mt-2">
            Create and manage educational courses
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="transition-all duration-200 hover:scale-105">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the course details below. Fields marked with * are required.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <MemoizedInput
                    label="Course Name"
                    value={formData.name}
                    onChange={(e: { target: { value: string; }; }) => handleFieldChange("name", e.target.value)}
                    placeholder="e.g., Web Development Fundamentals"
                    required
                  />
                  
                  <MemoizedInput
                    label="Duration"
                    value={formData.duration}
                    onChange={(e: { target: { value: string; }; }) => handleFieldChange("duration", e.target.value)}
                    placeholder="e.g., 12 weeks, 6 months"
                    required
                  />
                  
                  <MemoizedInput
                    label="Credits Required"
                    value={formData.creditsRequired}
                    onChange={(e: { target: { value: string; }; }) => handleFieldChange("creditsRequired", e.target.value)}
                    placeholder="Optional credits"
                    type="number"
                  />

                  <MemoizedInput
  label="Course Code"
  value={formData.courseCode}
  onChange={(e: any) =>
    handleFieldChange("courseCode", e.target.value.toUpperCase())
  }
  placeholder="e.g., CYBER-1Y"
  required
/>

                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="poster" className="text-sm font-medium">
                      Course Poster *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      {posterPreview ? (
                        <div className="space-y-4">
                          <img
                            src={posterPreview}
                            alt="Poster preview"
                            className="mx-auto h-40 object-cover rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setPoster(null);
                              setPosterPreview("");
                            }}
                          >
                            Change Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="h-12 w-12 mx-auto text-gray-400" />
                          <div className="text-sm text-gray-600">
                            <Label htmlFor="poster-upload" className="cursor-pointer text-blue-600 hover:text-blue-700">
                              Click to upload
                            </Label>
                            <span className="text-gray-400 mx-2">or drag and drop</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </div>
                      )}
                      <Input
                        id="poster-upload"
                        type="file"
                        accept="image/*"
                        onChange={handlePosterChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {!poster && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Course poster is required for display</span>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCourse} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Course
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCourses}</div>
            <div className="text-xs text-green-600 mt-2">
              +{stats.recentCourses} this week
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Search and Filter */}
      <Card className="transition-all duration-300 hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses by name or duration..."
                  className="pl-10 transition-all duration-150 focus:ring-2 focus:ring-offset-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
              </Badge>
              
              <Button
                variant="outline"
                size="icon"
                onClick={fetchData}
                className="transition-all duration-200 hover:scale-105"
              >
                <div className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <BookOpen className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? "No courses found" : "No courses yet"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? "Try adjusting your search criteria"
                  : "Create your first course to get started"
                }
              </p>
              {!searchTerm && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create First Course
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onDelete={openDeleteDialog}
                  />
                ))}
              </div>
              
              {searchTerm && filteredCourses.length > 0 && (
                <div className="mt-6 text-center text-sm text-gray-500">
                  Showing {filteredCourses.length} of {courses.length} courses
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Global Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>"{courseToDelete?.name}"</strong>?
              This action will permanently remove the course and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCourseToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (courseToDelete) {
                  handleDeleteCourse(courseToDelete.id, courseToDelete.name);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Course
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}