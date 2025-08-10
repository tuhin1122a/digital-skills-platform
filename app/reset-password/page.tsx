"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Use NEXT_PUBLIC_API_URL from env variables
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/verify-reset-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTokenValid(data.valid)
          if (!data.valid) {
            setError(data.error || "Invalid or expired reset token")
          }
        })
        .catch(() => {
          setTokenValid(false)
          setError("Failed to verify reset token")
        })
    } else {
      setTokenValid(false)
      setError("No reset token provided")
    }
  }, [token, API_BASE])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    if (!formData.password) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }
  
    const payload = {
      token,
      newPassword: formData.password,
    };
  
    console.log("Sending reset password payload:", payload);
  
    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      console.log("Response from reset-password:", data);
  
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Network error while resetting password:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  if (tokenValid === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying reset token...</p>
        </div>
      </div>
    )
  }

  if (tokenValid === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 to-pink-700 items-center justify-center p-12">
          <div className="max-w-md text-center text-white space-y-6">
            <XCircle className="h-16 w-16 mx-auto text-red-200" />
            <h2 className="text-3xl font-bold">Invalid Link</h2>
            <p className="text-red-100 text-lg">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DigitalCert</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Link Expired</h1>
              <p className="text-gray-600 mt-2">This reset link is no longer valid</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <p className="text-gray-600">{error}</p>
                  <div className="space-y-2">
                    <Link href="/forgot-password">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Request New Reset Link</Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" className="w-full bg-transparent">
                        Back to Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center p-12">
          <div className="max-w-md text-center text-white space-y-6">
            <CheckCircle className="h-16 w-16 mx-auto text-green-200" />
            <h2 className="text-3xl font-bold">Password Reset!</h2>
            <p className="text-green-100 text-lg">
              Your password has been successfully reset. You can now login with your new password.
            </p>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DigitalCert</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Success!</h1>
              <p className="text-gray-600 mt-2">Your password has been reset</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Password Successfully Reset</h3>
                  <p className="text-gray-600 text-sm">You can now login to your account using your new password.</p>
                  <Link href="/login">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue to Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-center text-white space-y-6">
          <Award className="h-16 w-16 mx-auto text-purple-200" />
          <h2 className="text-3xl font-bold">Create New Password</h2>
          <p className="text-purple-100 text-lg">
            Choose a strong password to secure your account and continue your certification journey.
          </p>
          <Image
            src="/reset-password-illustration.png"
            alt="Reset Password Illustration"
            width={400}
            height={300}
            className="rounded-lg opacity-90"
          />
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DigitalCert</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">Enter your new password</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
