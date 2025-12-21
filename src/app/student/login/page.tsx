"use client"

import { GalleryVerticalEnd } from "lucide-react"
import StudentLoginForm from "@/components/students/student-login-form"
import Image from "next/image"
import Link from "next/link"
export default function StudentLoginPage() {
  return (
    <>
    <nav>
          <div className="flex items-center gap-2 p-4 bg-gray-900 text-white">
              <div className="flex items-center gap-2 font-medium">
                 <Link href="/">
                  <Image
                      src="/logo2.png"
                      alt="Abreonix Logo"
                      width={24}
                      height={24}
                      className="object-contain" />
                </Link>                
                       </div>
                       <Link href="/">
                  Abreonix Student Portal
    </Link>  
             
          </div>
      </nav>
      <center>

           <div className="grid min-h-svh lg:grid-cols-1 mt-40">
              {/* Left */}
              <div className="flex flex-col gap-4 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-6">

                      <div className="flex flex-1 items-center justify-center">

                          <div className="w-full max-w-md border border-gray-200 rounded-lg p-8 shadow-lg bg-white">
                              <StudentLoginForm />
                          </div>
                      </div>
                  </div>



                  {/* Background pattern */}
              </div>
          </div>
          </center>
 
      </>
  );
}