import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, FileText, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const levels = [
  {
    level: "A1",
    title: "Beginner",
    description: "Basic digital literacy skills",
    color: "bg-green-100 text-green-800",
  },
  {
    level: "A2",
    title: "Elementary",
    description: "Essential digital competencies",
    color: "bg-blue-100 text-blue-800",
  },
  { level: "B1", title: "Intermediate", description: "Confident digital user", color: "bg-purple-100 text-purple-800" },
  {
    level: "B2",
    title: "Upper Intermediate",
    description: "Advanced digital skills",
    color: "bg-orange-100 text-orange-800",
  },
  { level: "C1", title: "Advanced", description: "Expert digital competencies", color: "bg-red-100 text-red-800" },
  { level: "C2", title: "Proficient", description: "Master level digital skills", color: "bg-gray-100 text-gray-800" },
]

const steps = [
  {
    icon: Users,
    title: "Register & Verify",
    description: "Create your account and verify your email to get started",
  },
  {
    icon: FileText,
    title: "Take Assessment",
    description: "Complete progressive tests from A1 to C2 levels",
  },
  {
    icon: Award,
    title: "Get Certified",
    description: "Receive your digital certificate upon successful completion",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">DigitalCert</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                  Test & Certify Your <span className="text-blue-600">Digital Skills</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Validate your digital competencies with our comprehensive assessment platform. Progress through
                  standardized levels from A1 to C2 and earn recognized certificates.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1521312639858-5b042542f2a5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Digital Skills Certification"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple 3-step process makes it easy to assess and certify your digital skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center p-8 border-2 hover:border-blue-200 transition-colors">
                <CardContent className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Levels */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certification Levels</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Progress through standardized digital competency levels based on international frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={`text-lg font-bold px-3 py-1 ${level.color}`}>{level.level}</Badge>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{level.title}</h3>
                    <p className="text-gray-600">{level.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">Ready to Certify Your Digital Skills?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of professionals who have validated their digital competencies with our platform
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">DigitalCert</span>
              </div>
              <p className="text-gray-400">Professional digital skills certification platform</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/levels" className="hover:text-white">
                    Certification Levels
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DigitalCert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
