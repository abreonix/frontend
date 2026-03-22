"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Download, Mail, Phone, MapPin, Calendar, User as UserIcon } from "lucide-react";

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
  };
  credits?: number;
  enrollmentDate: string;
  createdAt: string;
}

interface StudentProfileProps {
  student: StudentData;
}

export default function StudentProfile({ student }: StudentProfileProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generateStudentID = (id: string) => {
    return `STU${id.substring(0, 8).toUpperCase()}`;
  };

  const handleDownloadProfile = () => {
    // Create a printable profile
    const printContent = document.getElementById('student-profile-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Student Profile - ${student.name}</title>
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 20px; }
                .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
                .info-item { margin-bottom: 10px; }
                .label { font-weight: bold; color: #666; }
                .value { margin-top: 5px; }
                .badge { background: #f3f4f6; padding: 4px 8px; border-radius: 4px; display: inline-block; }
              </style>
            </head>
            <body>
              ${printContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <div className="space-y-6" id="student-profile-content">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-gray-500 mt-2">
            Complete information and personal details
          </p>
        </div>
        <Button onClick={handleDownloadProfile} className="gap-2">
          <Download className="h-4 w-4" />
          Download Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Personal details and identification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-gray-100">
                  <AvatarImage src={student.image} alt={student.name} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Badge className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600">
                  Active
                </Badge>
              </div>
              
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-gray-500">{student.course.name}</p>
                <Badge variant="outline" className="mt-2">
                  {generateStudentID(student._id)}
                </Badge>
              </div>

              <div className="w-full space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium truncate">{student.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{student.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(student.dob)} ({calculateAge(student.dob)} years)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Complete Details</CardTitle>
            <CardDescription>All registered information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.name}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Father's Name</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.fatherName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{generateStudentID(student._id)}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Academic Email</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.usermail}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Primary Email</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.phone}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Complete Address</p>
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Course Enrolled</p>
                    <Badge className="text-base px-4 py-2">{student.course.name}</Badge>
                  </div>
         
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Enrollment Date</p>
                    <p className="font-medium p-3 bg-gray-50 rounded-lg">{formatDate(student.enrollmentDate)}</p>
                  </div>
               
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <p className="text-sm text-gray-500 mb-1">Course Duration</p>
                    <p className="font-medium p-3 bg-gray-50 rounded-lg">{student.course.duration}</p>
                  </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Account Created</p>
                  <p className="font-medium p-3 bg-gray-50 rounded-lg">{formatDate(student.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}