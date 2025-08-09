"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, ArrowLeft, Award, Calendar, User, FileText } from "lucide-react"
import Link from "next/link"

const certificateData = {
  recipientName: "John Doe",
  level: "B1",
  completionDate: "December 15, 2024",
  certificateId: "DC-B1-2024-001234",
  issuer: "DigitalCert Certification Authority",
  validUntil: "December 15, 2027",
}

export default function CertificatePage() {
  const handleDownload = () => {
    // Simulate PDF download
    console.log("Downloading certificate...")
  }

  const handleShare = () => {
    // Simulate sharing functionality
    console.log("Sharing certificate...")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Digital Skills Certificate</h1>
              <p className="text-gray-600">Level {certificateData.level} Certification</p>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Certificate of Achievement</h1>
                    <p className="text-xl text-gray-600">Digital Skills Certification</p>
                  </div>

                  {/* Decorative Border */}
                  <div className="border-t-4 border-b-4 border-blue-600 py-8 mb-8">
                    <div className="text-center space-y-6">
                      <p className="text-lg text-gray-700">This is to certify that</p>

                      <h2 className="text-5xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 inline-block">
                        {certificateData.recipientName}
                      </h2>

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

                  {/* Certificate Details */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Date of Completion</p>
                          <p className="font-semibold">{certificateData.completionDate}</p>
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
                          <p className="font-semibold">{certificateData.validUntil}</p>
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
                            <span className="text-2xl font-bold text-blue-600">DigitalCert</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">Certification Authority</p>
                      </div>

                      <div className="text-center">
                        <div className="border-b-2 border-gray-400 mb-2 pb-1">
                          <div className="h-12 flex items-end justify-center">
                            <span className="text-lg font-semibold text-gray-700">
                              {certificateData.completionDate}
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
                    <strong>Level {certificateData.level}</strong> certification demonstrates intermediate digital
                    competency across five key areas:
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
                    <span>{certificateData.completionDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span>{certificateData.validUntil}</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-green-800 text-xs">✓ This certificate is valid and can be verified online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleDownload} size="lg" className="bg-blue-600 hover:bg-blue-700">
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
