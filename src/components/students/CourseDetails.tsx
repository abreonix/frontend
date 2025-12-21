"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Mail, Bell } from "lucide-react";
import Link from "next/link";

export default function CourseDetailsComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
            <Calendar className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Course Details</h1>
          <p className="text-xl text-gray-600">
            We're working hard to bring you an enhanced course experience
          </p>
        </div>

        {/* Main Card */}
        <Card className="border-2 border-dashed border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Coming Soon</CardTitle>
            <CardDescription>
              The new course dashboard is under development
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Features List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 space-y-2">
                <div className="inline-flex p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold">Progress Tracking</h3>
                <p className="text-sm text-gray-500">Monitor your learning journey</p>
              </div>
              
              <div className="p-4 space-y-2">
                <div className="inline-flex p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Interactive Modules</h3>
                <p className="text-sm text-gray-500">Engaging course content</p>
              </div>
              
              <div className="p-4 space-y-2">
                <div className="inline-flex p-2 bg-orange-100 rounded-lg">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-500">Stay updated on deadlines</p>
              </div>
            </div>

            {/* Countdown or Progress */}
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Development in Progress
                </div>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    We're building an improved interface with better features for tracking your course progress.
                  </p>
                  <p className="text-sm text-gray-500">
                    Expected launch: Q1 2024
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/education/courses">
              <Button variant="outline">
                View Current Syllabus
              </Button>
                </Link>
            </div>

            {/* Contact Info */}
            <div className="text-center text-sm text-gray-500 pt-4 border-t">
              <p>For immediate course access, please contact your instructor or visit the learning portal.</p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Need help with your current course?
          </p>
          <Button variant="link" className="text-blue-600">
            Contact Support →
          </Button>
        </div>
      </div>
    </div>
  );
}