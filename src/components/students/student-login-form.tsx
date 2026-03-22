"use client"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

type ViewState = "login" | "forgot" | "reset"

export default function StudentLoginForm({
  className,
}: {
  className?: string
}) {
  const router = useRouter()
  const [view, setView] = useState<ViewState>("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/student-login`,
        { email: form.email, password: form.password }
      )

      localStorage.setItem("studentToken", res.data.token)
      localStorage.setItem("studentEmail", form.email)

      router.push("/student/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- FORGOT ---------------- */
  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgot-password`,
        { email: form.email }
      )
      setSuccess("OTP sent to your email")
      setView("reset")
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- RESET ---------------- */
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.newPassword !== form.confirmPassword) {
      return setError("Passwords do not match")
    }

    setLoading(true)
    setError("")

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/reset-password`,
        {
          email: form.email,
          otp: form.otp,
          newPassword: form.newPassword,
        }
      )
      setSuccess("Password reset successful")
      setView("login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={
        view === "login"
          ? handleLogin
          : view === "forgot"
          ? handleForgot
          : handleReset
      }
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          {view === "login" && "Student Login"}
          {view === "forgot" && "Forgot Password"}
          {view === "reset" && "Reset Password"}
        </h1>
        <p className="text-muted-foreground text-sm">
          {view === "login" && "Access your student dashboard"}
          {view === "forgot" && "Receive OTP on your email"}
          {view === "reset" && "Set a new password"}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {view === "login" && (
          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
       
          </div>
        )}

        {view === "reset" && (
          <>
            <Input
              name="otp"
              placeholder="OTP"
              value={form.otp}
              onChange={handleChange}
              required
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Continue"}
        </Button>

        {view !== "login" && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setView("login")}
          >
            Back to login
          </Button>
        )}
      </div>
    </form>
  )
}
