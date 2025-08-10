"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!email.trim()) {
      setError("Email is required")
      setLoading(false)
      return
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.message || "Something went wrong")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 items-center justify-center p-12">
          <div className="max-w-md text-center text-white space-y-6">
            <Mail className="h-16 w-16 mx-auto text-green-200" />
            <h2 className="text-3xl font-bold">Check Your Email</h2>
            <p className="text-green-100 text-lg">
              We've sent you a password reset link. Check your inbox and follow the instructions.
            </p>
            <Image
              src="/email-sent.png"
              alt="Email Sent Illustration"
              width={400}
              height={300}
              className="rounded-lg opacity-90"
            />
          </div>
        </div>

        {/* Right Side - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Award className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">DigitalCert</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Email Sent!</h1>
              <p className="text-gray-600 mt-2">Check your inbox for reset instructions</p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Reset link sent to {email}</h3>
                  <p className="text-gray-600 text-sm">
                    We've sent a password reset link to your email address. Click the link in the email to reset your password.
                  </p>
                  <div className="pt-4">
                    <Link href="/login">
                      <Button variant="outline" className="w-full bg-transparent">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Login
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn't receive the email?{" "}
                <button onClick={() => setSuccess(false)} className="text-blue-600 hover:underline font-medium">
                  Try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="max-w-md text-center text-white space-y-6">
          <Mail className="h-16 w-16 mx-auto text-blue-200" />
          <h2 className="text-3xl font-bold">Reset Your Password</h2>
          <p className="text-blue-100 text-lg">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <Image
            src="/forgot-password-illustration.png"
            alt="Forgot Password Illustration"
            width={400}
            height={300}
            className="rounded-lg opacity-90"
          />
        </div>
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">DigitalCert</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-gray-600 mt-2">No worries, we'll send you reset instructions</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reset Your Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "border-red-500" : ""}
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/login" className="inline-flex items-center text-blue-600 hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
