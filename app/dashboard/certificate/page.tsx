"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Share2,
  ArrowLeft,
  Award,
  Calendar,
  User,
  FileText,
} from "lucide-react"
import Link from "next/link"

interface Competency {
  competency: string
  level: string
}

interface Certificate {
  id: string
  level: string
  issuedAt: string
  certificateId: string
  issuer: string
  validUntil: string // এখন null বাদ দিয়ে শুধু string (N/A বা valid date string)
  competencies: Competency[]
}

export default function CertificatePage() {
  const { data: session, status } = useSession()
  const [certificateData, setCertificateData] = useState<Certificate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const accessToken = (session?.user as any)?.accessToken as string | undefined

  // Calculate validUntil as 2 years after issuedAt if not present
  const calculateValidUntil = (issuedAt: string): string => {
    const issueDate = new Date(issuedAt)
    issueDate.setFullYear(issueDate.getFullYear() + 2)
    return issueDate.toISOString() // ISO string safer for date parsing later
  }

  useEffect(() => {
    async function fetchCertificates() {
      if (!accessToken) {
        setError("User is not authenticated.")
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/certificates/my-certificates`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        if (!res.ok) throw new Error("Failed to fetch certificates")

        const json = await res.json()

        if (json.success && json.data.certificates.length > 0) {
          const cert = json.data.certificates[0]

          let competencies: Competency[] = []
          try {
            competencies = JSON.parse(cert.certificateData || "[]")
          } catch {
            competencies = []
          }

          // validUntil যদি না থাকে তাহলে 2 বছর পরের তারিখ হিসেব করো
          const validUntilDate =
            cert.validUntil && cert.validUntil !== ""
              ? cert.validUntil
              : calculateValidUntil(cert.issuedAt)

          setCertificateData({
            id: cert.id,
            level: cert.level || "N/A",
            issuedAt: cert.issuedAt,
            certificateId: cert.id || "N/A",
            issuer: "DigitalCert Certification Authority",
            validUntil: validUntilDate,
            competencies,
          })
        } else {
          setError("No certificates found.")
        }
      } catch (err) {
        setError((err as Error).message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    if (status === "authenticated") {
      fetchCertificates()
    } else if (status === "unauthenticated") {
      setError("You must be logged in to view certificates.")
      setLoading(false)
    }
  }, [accessToken, status])

  const handleDownload = () => {
    console.log("Downloading certificate...")
  }

  const handleShare = () => {
    console.log("Sharing certificate...")
  }

  if (loading) return <p className="text-center py-8">Loading certificate...</p>
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>
  if (!certificateData) return null

  const formattedIssuedAt = new Date(certificateData.issuedAt).toLocaleDateString(
    undefined,
    { year: "numeric", month: "long", day: "numeric" }
  )

  // validUntil অবশ্যই string, তাই new Date() দিব পারবে safely
  const formattedValidUntil = certificateData.validUntil
    ? new Date(certificateData.validUntil).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A"

  const userName = session?.user?.name || "User Name"
  const userEmail = session?.user?.email || "user@example.com"

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Digital Skills Certificate
              </h1>
              <p className="text-gray-600">Level {certificateData.level} Certification</p>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Certificate Preview */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Certificate Design */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-12 border-8 border-blue-200">
                <div className="bg-white p-12 rounded-lg shadow-lg border-2 border-gray-200">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <Award className="h-16 w-16 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                      Certificate of Achievement
                    </h1>
                    <p className="text-xl text-gray-600">Digital Skills Certification</p>
                  </div>

                  {/* Decorative Border */}
                  <div className="border-t-4 border-b-4 border-blue-600 py-8 mb-8">
                    <div className="text-center space-y-6">
                      <p className="text-lg text-gray-700">This is to certify that</p>

                      <h2 className="text-5xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 inline-block">
                        {userName}
                      </h2>

                      <p className="text-lg text-gray-700">({userEmail})</p>

                      <p className="text-lg text-gray-700">
                        has successfully completed the assessment and demonstrated competency at
                      </p>

                      <div className="flex items-center justify-center">
                        <Badge className="text-2xl px-6 py-3 bg-blue-600 text-white">
                          Level {certificateData.level}
                        </Badge>
                      </div>

                      <p className="text-lg text-gray-700">
                        in Digital Skills as defined by the European Digital Competence Framework
                      </p>
                    </div>
                  </div>

                  {/* Competencies List */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-center">Competencies</h3>
                    <ul className="list-disc list-inside max-w-md mx-auto text-gray-700">
                      {certificateData.competencies.length > 0 ? (
                        certificateData.competencies.map((comp, i) => (
                          <li key={i}>
                            <strong>{comp.competency}:</strong> Level {comp.level}
                          </li>
                        ))
                      ) : (
                        <li>No competencies data available</li>
                      )}
                    </ul>
                  </div>

                  {/* Certificate Details */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Date of Completion</p>
                          <p className="font-semibold">{formattedIssuedAt}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Certificate ID</p>
                          <p className="font-semibold font-mono">{certificateData.certificateId}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Issued By</p>
                          <p className="font-semibold">{certificateData.issuer}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Valid Until</p>
                          <p className="font-semibold">{formattedValidUntil}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Signature Area */}
                  <div className="border-t border-gray-200 pt-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="border-b-2 border-gray-400 mb-2 pb-1">
                          <div className="h-12 flex items-end justify-center">
                            <span className="text-2xl font-bold text-blue-600">
                              DigitalCert
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Certification Authority</p>
                      </div>

                      <div className="text-center">
                        <div className="border-b-2 border-gray-400 mb-2 pb-1">
                          <div className="h-12 flex items-end justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                              {formattedIssuedAt}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Date of Issue</p>
                      </div>
                    </div>
                  </div>

                  {/* Verification Note */}
                  <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                      This certificate can be verified at digitalcert.com/verify using certificate ID:{" "}
                      {certificateData.certificateId}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certificate Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">About This Certificate</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Level {certificateData.level}</strong> certification demonstrates intermediate digital competency across five key areas:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Information and data literacy</li>
                    <li>Communication and collaboration</li>
                    <li>Digital content creation</li>
                    <li>Safety and security</li>
                    <li>Problem solving</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Verification & Validity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Certificate ID:</span>
                    <span className="font-mono">{certificateData.certificateId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issue Date:</span>
                    <span>{formattedIssuedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span>{formattedValidUntil}</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800 text-xs">
                      ✓ This certificate is valid and can be verified online
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleDownload}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Certificate (PDF)
            </Button>
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="h-5 w-5 mr-2" />
              Share Certificate
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
