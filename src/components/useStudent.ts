"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  image?: string; // 👈 profile image URL
  role: "student";
}

export function useStudent() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("studentToken");

      if (!token) {
        setLoading(false);
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

        setStudent({
          ...res.data,
          role: "student",
        });
      } catch (err: any) {
        if (err.response?.status === 401) {
          localStorage.removeItem("studentToken");
          router.push("/student/login");
        }
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  return { student, loading, error };
}
