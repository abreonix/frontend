import Image from "next/image";
import Link from "next/link";
import { Clock, BarChart } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: string;
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  duration,
  level
}: CourseCardProps) {
  return (
    <article
      className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
      itemScope
      itemType="https://schema.org/Course "
    >
      <Image
        src={image}
        alt={title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 text-left">
        <h2
          itemProp="name"
          className="text-xl font-semibold text-gray-900 mb-2"
        >
          {title}
        </h2>
        <p
          itemProp="description"
          className="text-gray-600 text-sm mb-4 line-clamp-3"
        >
          {description}
        </p>

        <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
          <span className="flex items-center gap-1">
            <Clock size={16} /> {duration}
          </span>
          <span className="flex items-center gap-1">
            <BarChart size={16} /> {level}
          </span>
        </div>

        <Link
          href={`/courses/${id}`}
          className="block text-center w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
