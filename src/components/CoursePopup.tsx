"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CoursePopupProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    level: string;
    features?: string[];
  } | null;
}

export default function CoursePopup({ isOpen, onClose, course }: CoursePopupProps) {
  if (!course) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
          aria-labelledby="course-title"
        >
          <motion.div
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl max-w-lg w-[90%] relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            itemScope
            itemType="https://schema.org/Course"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <X size={18} />
            </button>

            {/* Course Image */}
            <Image
              src={course.image}
              alt={course.title}
              width={800}
              height={400}
              className="w-full h-48 object-cover"
              itemProp="image"
            />

            {/* Course Content */}
            <div className="p-6 text-left">
              <h2 id="course-title" itemProp="name" className="text-2xl font-semibold mb-3">
                {course.title}
              </h2>

              <p itemProp="description" className="text-gray-600 dark:text-gray-300 mb-4">
                {course.description}
              </p>

              {course.features && (
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {course.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                <span>
                  <strong>Duration:</strong> {course.duration}
                </span>
                <span>
                  <strong>Level:</strong> {course.level}
                </span>
              </div>

              <Link
                href={`/courses/${course.id}`}
                className="block text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                View Full Course
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
